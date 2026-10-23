-- Vanta Foundry leads, stored in the Vanta Labs Supabase project
-- (mlpimwgkwuqpsvsrlpqv) in their own schema, applied 2026-10-23 as migration
-- "foundry_leads" (plus "foundry_leads_ref_not_unique"). Nothing here touches store tables, checkout or payments.
--
-- * foundry.leads is in a schema the API doesn't expose, with RLS on and no
--   policies: no visitor can read or list leads.
-- * The site writes only through two functions, callable with the project's
--   public (publishable) key:
--     public.foundry_save_lead(jsonb)   validate, rate-limit, insert once
--     public.foundry_lead_notified(...)  record whether the team email went out
-- * Saving is idempotent on the client-made id, so a retried brief is one row.
-- * status follows the sales workflow; the team updates it in the Supabase
--   dashboard (Table editor -> foundry.leads) or with SQL.

create schema if not exists foundry;
revoke all on schema foundry from public, anon, authenticated;

create table if not exists foundry.leads (
  id uuid primary key,
  ref text not null,
  kind text not null check (kind in ('website_brief', 'wholesale_handoff')),
  service text not null default '',
  name text not null default '',
  email text not null default '',
  phone text not null default '',
  business text not null default '',
  website text not null default '',
  details text not null default '',
  answers jsonb not null default '[]'::jsonb,
  source jsonb not null default '[]'::jsonb,
  status text not null default 'new'
    check (status in ('new', 'handoff', 'acknowledged', 'qualified', 'quoted', 'won', 'lost', 'spam')),
  lost_reason text,
  quote_value numeric,
  sale_value numeric,
  notified_at timestamptz,
  notify_attempts int not null default 0,
  notify_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table foundry.leads enable row level security;
create index if not exists leads_created_at_idx on foundry.leads (created_at desc);
create index if not exists leads_status_idx on foundry.leads (status);
-- ref is for people to quote; the id is the key. (Migration foundry_leads_ref_not_unique
-- dropped an earlier unique constraint so a short-ref collision can never lose a lead.)
create index if not exists leads_ref_idx on foundry.leads (ref);

create or replace function public.foundry_save_lead(p jsonb)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_id uuid;
  v_kind text := coalesce(p->>'kind', 'website_brief');
  v_ref text;
  v_row foundry.leads%rowtype;
  v_recent int;
begin
  begin
    v_id := (p->>'id')::uuid;
  exception when others then
    raise exception 'invalid id' using errcode = '22023';
  end;
  if v_kind not in ('website_brief', 'wholesale_handoff') then
    raise exception 'invalid kind' using errcode = '22023';
  end if;

  -- A retry returns the row already saved, notified or not.
  select * into v_row from foundry.leads where id = v_id;
  if found then
    return jsonb_build_object('ref', v_row.ref, 'created', false, 'notified', v_row.notified_at is not null);
  end if;

  if v_kind = 'website_brief' and (length(coalesce(p->>'name', '')) = 0 or coalesce(p->>'email', '') !~ '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$') then
    raise exception 'missing contact details' using errcode = '22023';
  end if;

  -- Global brake on floods: real traffic is far below this.
  select count(*) into v_recent from foundry.leads where created_at > now() - interval '10 minutes';
  if v_recent >= 60 then
    raise exception 'rate limited' using errcode = 'P0001';
  end if;

  v_ref := 'VF-' || upper(substr(replace(v_id::text, '-', ''), 1, 8));
  insert into foundry.leads (id, ref, kind, service, name, email, phone, business, website, details, answers, source, status)
  values (
    v_id, v_ref, v_kind,
    left(coalesce(p->>'service', ''), 80),
    left(coalesce(p->>'name', ''), 120),
    left(coalesce(p->>'email', ''), 200),
    left(coalesce(p->>'phone', ''), 40),
    left(coalesce(p->>'business', ''), 160),
    left(coalesce(p->>'website', ''), 200),
    left(coalesce(p->>'details', ''), 4000),
    case when jsonb_typeof(p->'answers') = 'array' then p->'answers' else '[]'::jsonb end,
    case when jsonb_typeof(p->'source') = 'array' then p->'source' else '[]'::jsonb end,
    case when v_kind = 'wholesale_handoff' then 'handoff' else 'new' end
  )
  on conflict (id) do nothing;
  return jsonb_build_object('ref', v_ref, 'created', true, 'notified', false);
end;
$$;

create or replace function public.foundry_lead_notified(p_id uuid, p_ok boolean, p_error text default null)
returns void
language sql
security definer
set search_path = ''
as $$
  update foundry.leads
     set notify_attempts = notify_attempts + 1,
         notified_at = case when p_ok then coalesce(notified_at, now()) else notified_at end,
         notify_error = case when p_ok then null else left(coalesce(p_error, 'unknown'), 300) end,
         updated_at = now()
   where id = p_id;
$$;

revoke all on function public.foundry_save_lead(jsonb) from public;
revoke all on function public.foundry_lead_notified(uuid, boolean, text) from public;
grant execute on function public.foundry_save_lead(jsonb) to anon, authenticated, service_role;
grant execute on function public.foundry_lead_notified(uuid, boolean, text) to anon, authenticated, service_role;
