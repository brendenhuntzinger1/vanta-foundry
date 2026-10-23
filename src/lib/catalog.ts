/**
 * THE CATALOG: what a wholesale customer can get from us.
 *
 * Products and sizes were read from the live Vanta Labs store on 2026-10-23
 * (active, published, enabled products and sizes only). Update this list when
 * the store's catalog changes.
 *
 * No prices on purpose (owner, 2026-10-23): each product has an Inquire
 * button that opens WhatsApp (or email) with the product filled in, and we
 * reply with pricing.
 */

export type CatalogProduct = { slug: string; name: string; category: string; sizes: string[]; image: string };

/**
 * Product photos are served straight from the Vanta Labs store's public image
 * storage (each product's primary image, read 2026-10-23), so the catalog
 * shows exactly what Vanta Labs shows.
 */
export const VANTA_IMAGE_BASE = "https://mlpimwgkwuqpsvsrlpqv.supabase.co/storage/v1/object/public/product-images/";
const img = (path: string) => VANTA_IMAGE_BASE + path;

export const CATALOG_READ_ON = "2026-10-23";

export const CATALOG: CatalogProduct[] = [
  { slug: "glow", name: "GLOW", category: "Blends", sizes: ["70mg"], image: img("b628b4ee-7ec7-4e10-9728-900717a41537/1792687222157-ad7851c4-eb77-4596-bef2-9843dce66da3.webp") },
  { slug: "klow", name: "KLOW", category: "Blends", sizes: ["80mg"], image: img("f041f14c-7519-459b-a548-82b55a065e2d/1792687254506-7f0cfb9c-da68-4044-b001-fd425136e829.webp") },
  { slug: "bpc-157-tb-500", name: "BPC-157 + TB-500", category: "Blends", sizes: ["20mg"], image: img("d9532383-5f2b-4b63-886d-a29f4a63dff4/1792687179448-8bd89ff9-c7b4-4f12-8c41-c8a3075cefdc.webp") },
  { slug: "cjc-1295-no-dac", name: "CJC-1295 no DAC", category: "GHRH & GH Secretagogues", sizes: ["10mg"], image: img("63639299-05a3-4789-9492-1760d17a11e4/1792687211619-5c534990-1d70-4b74-87d3-e0573a52f7ff.webp") },
  { slug: "ghrp-2", name: "GHRP-2", category: "GHRH & GH Secretagogues", sizes: ["5mg"], image: img("eda353f1-2906-49a0-873f-b6593ca088eb/1792687220330-c0bfe8cd-5a57-469a-bd1b-ea5ff9e35c01.webp") },
  { slug: "tesamorelin", name: "Tesamorelin", category: "GHRH & GH Secretagogues", sizes: ["5mg", "10mg"], image: img("a9fd55d3-68b4-4120-99bd-b85ddff5ca69/1792687287155-69ef2490-94ef-445b-aaf4-d47d6dc08e7a.webp") },
  { slug: "cjc-1295-ipamorelin", name: "CJC-1295 + Ipamorelin", category: "GHRH & GH Secretagogues", sizes: ["10mg"], image: img("0b36d44d-f65e-4856-8ca9-82b7be847576/1792687209587-e9a9b2bf-abda-4f4a-bdff-f877708db435.webp") },
  { slug: "cagrilintide", name: "Cagrilintide", category: "GLP Research", sizes: ["10mg"], image: img("8951a558-3670-43aa-9481-71dc673a93ba/1792687181549-53b3f1d0-fe28-46f0-bc38-9ce588b8a3cd.webp") },
  { slug: "glp-1", name: "VLP-1 (SM)", category: "GLP Research", sizes: ["5mg", "10mg", "20mg", "30mg"], image: img("661a4337-b39e-49ec-a6e7-8be73f4497d3/1792687229589-1b2565aa-7bef-4c1e-b9bc-b07aa0921aa6.webp") },
  { slug: "glp-2", name: "VLP-2 (TR)", category: "GLP Research", sizes: ["5mg", "10mg", "20mg", "30mg"], image: img("8c58d979-8b1b-4bc9-8910-5805ddfa9f6e/1792687238239-37014d51-966a-4e4f-a0a3-85587c706b25.webp") },
  { slug: "glp-3", name: "VLP-3 (RT)", category: "GLP Research", sizes: ["5mg", "10mg", "20mg", "30mg"], image: img("da904e97-1afb-4ca4-97c0-08235791a0e4/1792687246146-d901b07c-d3e3-4929-a79d-c3b908852dd3.webp") },
  { slug: "bpc-157", name: "BPC-157", category: "Peptides", sizes: ["5mg", "10mg"], image: img("2e220afa-472a-4c87-bf3d-595a1a731791/1792687177651-e6051dbd-74c5-4754-a19e-64a613c13fc1.webp") },
  { slug: "dsip", name: "DSIP", category: "Peptides", sizes: ["10mg"], image: img("94215c69-442d-4d92-bf2b-e54e2b99699c/1792687213559-05a446e3-d66a-4d7a-8065-9f62a0346dbe.webp") },
  { slug: "ghk-cu", name: "GHK-Cu", category: "Peptides", sizes: ["50mg"], image: img("5855d9a2-5acc-48ef-8c8d-252c1afda70b/1792687218294-92c4ec29-676c-456b-8747-2a58dd4835c3.webp") },
  { slug: "igf-1-lr3", name: "IGF-1 LR3", category: "Peptides", sizes: ["1mg"], image: img("86ab4884-56f6-4a52-91b5-a9b1f02b68fb/1792687250728-9dc52150-508e-4444-ba93-4adf9a2284ad.webp") },
  { slug: "kpv", name: "KPV", category: "Peptides", sizes: ["10mg"], image: img("42944703-1e7f-4273-954f-3f65382119c9/1792687256336-e0123f2e-1fdc-442c-ac79-93fdfd7c5a98.webp") },
  { slug: "mots-c", name: "MOTS-C", category: "Peptides", sizes: ["10mg"], image: img("bd9c7436-3890-42ee-b6eb-4eb0798b917e/1792687263129-5aef431b-c99b-48a0-a5de-ff1ecc890767.webp") },
  { slug: "ss-31", name: "SS-31", category: "Peptides", sizes: ["10mg"], image: img("33ef1620-1dde-486a-a5e3-162e22e89f0e/1792687283430-dc528546-9ecd-4057-8a56-bf50ad32de62.webp") },
  { slug: "thymosin-alpha-1", name: "Thymosin Alpha-1", category: "Peptides", sizes: ["5mg"], image: img("c064a13f-b431-4592-b24b-d1a85c517cdc/1792687289007-75b32ace-1793-49ab-96b9-bf5d45d5e79f.webp") },
  { slug: "epithalon", name: "Epithalon", category: "Peptides", sizes: ["10mg"], image: img("9c6f03fd-a8bd-406b-8efe-bda40818ae11/1792687215854-c4968088-57a8-4205-93de-f578042d707c.webp") },
  { slug: "semax", name: "Semax", category: "Peptides", sizes: ["10mg"], image: img("65306ca9-31d6-4f65-83b2-92246b76c5af/1792687279378-b2d03ba8-a8a8-450d-a0c8-2600c7a4cb9c.webp") },
  { slug: "selank", name: "Selank", category: "Peptides", sizes: ["10mg"], image: img("8cdd7435-d630-4d54-88f5-cc0dc5dac230/1792687277349-b83b6124-2b55-421d-9db1-6318716c2964.webp") },
  { slug: "l-carnitine", name: "L-Carnitine", category: "Small Molecules & Cofactors", sizes: ["6000mg"], image: img("504b7504-5d97-4fbc-9715-57908538fa2c/1792687258089-093a2d38-a14b-4f6f-9917-12e72368b7b0.webp") },
  { slug: "lipo-c", name: "LIPO-C", category: "Small Molecules & Cofactors", sizes: ["10mL"], image: img("31b007b8-b78e-4a1b-a8ff-3216ae0db52c/1792687260271-83895a72-090a-4480-9a6d-a874cd62f472.webp") },
  { slug: "nad", name: "NAD+", category: "Small Molecules & Cofactors", sizes: ["500mg", "1000mg"], image: img("9da4e2fb-fb2f-4c82-b4b4-d590ce5ce345/1792687269557-230403b1-c23a-4edf-903f-112208035dd5.webp") },
  { slug: "b12", name: "B12", category: "Small Molecules & Cofactors", sizes: ["10mL"], image: img("9de6fc19-97f8-4186-a87a-4e11c1bb1def/1792686917100-a4d50d01-4417-4602-8cdd-60453b51b441.png") },
  { slug: "recon-water", name: "Recon water (0.9% Benzyl Alcohol)", category: "Solvents & Solutions", sizes: ["10mL"], image: img("b123e67e-a02f-4958-9a34-f2c535c45991/1792687275452-5352dbd5-4d58-40b3-accb-4b03f80e1a62.webp") },
  { slug: "hcg", name: "HCG", category: "Specialty", sizes: ["5000iu"], image: img("1844f3d7-2591-4201-ba4d-81cf5c88c443/1792687248654-bd10ddaf-1eb1-411d-b4cd-2d80bf4364a5.webp") },
  { slug: "pt-141", name: "PT-141", category: "Specialty", sizes: ["10mg"], image: img("c3a9b398-fb25-4eb9-94a3-c1e4bed51138/1792687273576-5c5059ba-c5b7-4d6e-8c76-03e973025390.webp") },
  { slug: "mt-2-melanotan-ii", name: "MT-II", category: "Specialty", sizes: ["10mg"], image: img("cb9a1859-404e-441e-9af4-95c01a2e6bae/1792687265579-40952ab3-4fa4-48b9-ba6d-2461ad758778.webp") },
  { slug: "kisspeptin", name: "Kisspeptin", category: "Specialty", sizes: ["10mg"], image: img("82206dca-7c33-4442-87b1-cfcabfbf01ce/1792687252638-440f6683-bcec-453c-9c90-1e58b195797d.webp") },
  { slug: "snap-8", name: "SNAP-8", category: "Specialty", sizes: ["10mg"], image: img("f8d2e1a6-1259-4796-a5c7-88aacdcd8f02/1792687281440-91652444-0dbe-4472-b38c-1744f12812d5.webp") },
];
