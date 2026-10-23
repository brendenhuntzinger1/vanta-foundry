/**
 * Product facts for the catalog pages, read from the Vanta Labs store's public
 * product pages and COA library on 2026-10-23 (generated, then checked by hand).
 * Identity data cites the store's own sources (PubChem, FDA GSRS). Reports are
 * the laboratory documents the store publishes for the batch it currently
 * supplies; a wholesale quote names the lot a buyer will receive.
 *
 * Refresh when the store's catalog or reports change.
 */

export type ProductReport = { id: string; size?: string; result: string; date: string; lab: string; url: string };

export type ProductFacts = {
  specs: [string, string][];
  composition?: [string, string][];
  notes?: string[];
  sources?: [string, string][];
  reports: ProductReport[];
  status?: string[];
};

export const STORE_FACTS_READ_ON = "2026-10-23";

export const PRODUCT_FACTS: Record<string, ProductFacts> = {
  "b12": {
    specs: [["Name", "B12"], ["Synonyms and codes", "Vitamin B12, Cobalamin"], ["Description", "Cobalamin (vitamin B12) solution, 10 mL"], ["Available sizes", "10 mL"]],
    reports: [
      { id: "KVR-2026-2E9BD6", result: "Identity screen (HPLC-UV with LC-MS/MS identity confirmation): lists the compounds detected in the vial, not their amounts", date: "Aug 24, 2026", lab: "Kovera Labs", url: "https://www.vantalabsresearch.com/coa/KVR-2026-2E9BD6.pdf" },
    ],
  },
  "bpc-157-tb-500": {
    specs: [["Name", "BPC-157 + TB-500"], ["Description", "Two-peptide blend in one lyophilized vial, 20 mg total"], ["Available sizes", "20 mg"], ["Supplied form", "Lyophilized powder"]],
    composition: [["BPC-157", "10 mg"], ["TB-500 (TB-4)", "10 mg"]],
    notes: ["The report labels one component \"TB-500 (TB-4)\". That name is used for more than one peptide related to thymosin beta-4, so no sequence is asserted for it here."],
    reports: [
      { id: "KVR-2026-47D7CA", size: "20 mg", result: "Purity 99.163%", date: "Aug 24, 2026", lab: "Kovera Labs", url: "https://www.vantalabsresearch.com/coa/KVR-2026-47D7CA.pdf" },
    ],
    status: ["Neither BPC-157 nor TB-500 is listed as an approved drug in the FDA's Drugs@FDA database (searched 24 September 2026)."],
  },
  "bpc-157": {
    specs: [["Name", "BPC-157"], ["Synonyms and codes", "Body Protection Compound-157, PL 14736, PL-10, PLD-116"], ["Description", "Synthetic pentadecapeptide (15 amino acids)"], ["Available sizes", "5 mg, 10 mg"], ["Supplied form", "Lyophilized powder"], ["CAS number", "137525-51-0"], ["Molecular formula", "C62H98N16O22"], ["Molecular weight", "1419.5 g/mol"], ["Sequence", "GEPPPGKPADDAGLV (Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val)"]],
    sources: [["FDA GSRS UNII 8ED8NXK95P", "https://gsrs.ncats.nih.gov/ginas/app/beta/substances/8ED8NXK95P"], ["PubChem CID 9941957", "https://pubchem.ncbi.nlm.nih.gov/compound/9941957"]],
    reports: [
      { id: "KVR-2026-6B1171", size: "5 mg", result: "Purity 99.736% (RP-HPLC, C18 column, DAD detection at 214 nm) · Identity by LC-MS", date: "Aug 24, 2026", lab: "Kovera Labs", url: "https://www.vantalabsresearch.com/coa/KVR-2026-6B1171.pdf" },
      { id: "KVR-2026-C2D666", size: "10 mg", result: "Purity 99.759% (RP-HPLC, C18 column, DAD detection at 214 nm) · Identity by LC-MS", date: "Aug 24, 2026", lab: "Kovera Labs", url: "https://www.vantalabsresearch.com/coa/KVR-2026-C2D666.pdf" },
    ],
    status: ["Not approved by the U.S. Food and Drug Administration."],
  },
  "cagrilintide": {
    specs: [["Name", "Cagrilintide"], ["Description", "Acylated (lipidated) amylin analogue peptide"], ["Available sizes", "10 mg"], ["Supplied form", "Lyophilized powder"], ["CAS number", "1415456-99-3"], ["Molecular formula", "C194H312N54O59S2"], ["Molecular weight", "4409 g/mol"]],
    sources: [["PubChem CID 171397054", "https://pubchem.ncbi.nlm.nih.gov/compound/171397054"]],
    reports: [
      { id: "KVR-2026-05B493", size: "10 mg", result: "Purity 99.718%", date: "Aug 24, 2026", lab: "Kovera Labs", url: "https://www.vantalabsresearch.com/coa/KVR-2026-05B493.pdf" },
    ],
    status: ["Cagrilintide is not listed as an approved drug in the FDA's Drugs@FDA database (searched 24 September 2026)."],
  },
  "cjc-1295-ipamorelin": {
    specs: [["Name", "CJC-1295 + Ipamorelin"], ["Description", "Two-peptide blend in one lyophilized vial, 10 mg total"], ["Available sizes", "10 mg"], ["Supplied form", "Lyophilized powder"], ["Ipamorelin CAS number", "170851-70-4"]],
    composition: [["Ipamorelin", "5 mg"], ["CJC-1295 (No DAC)", "5 mg"]],
    sources: [["PubChem CID 9831659", "https://pubchem.ncbi.nlm.nih.gov/compound/9831659"]],
    reports: [
      { id: "KVR-2026-6AA733", size: "10 mg", result: "Blend average purity 99.459% (RP-HPLC, C18 column, DAD detection at 214 nm) · Identity by LC-MS", date: "Aug 24, 2026", lab: "Kovera Labs", url: "https://www.vantalabsresearch.com/coa/KVR-2026-6AA733.pdf" },
    ],
    status: ["Neither CJC-1295 nor ipamorelin is listed as an approved drug in the FDA's Drugs@FDA database (searched 24 September 2026)."],
  },
  "cjc-1295-no-dac": {
    specs: [["Name", "CJC-1295 no DAC"], ["Description", "Modified analogue of growth hormone-releasing hormone (GHRH), without the drug affinity complex (DAC)"], ["Available sizes", "10 mg"]],
    reports: [
      { id: "Lot GB-5583809-P", size: "5 mg", result: "Identity by UPLC/MS", date: "Jul 3, 2026", lab: "Horizon Analytical", url: "https://www.vantalabsresearch.com/products/cjc-1295-no-dac" },
    ],
  },
  "dsip": {
    specs: [["Name", "DSIP"], ["Synonyms and codes", "Delta sleep-inducing peptide, Emideltide"], ["Description", "Nonapeptide (9 amino acids)"], ["Available sizes", "10 mg"], ["Supplied form", "Lyophilized powder"], ["CAS number", "62568-57-4"], ["Molecular formula", "C35H48N10O15"], ["Molecular weight", "848.8 g/mol"], ["Sequence", "WAGGDASGE (Trp-Ala-Gly-Gly-Asp-Ala-Ser-Gly-Glu)"]],
    sources: [["PubChem CID 68816", "https://pubchem.ncbi.nlm.nih.gov/compound/68816"]],
    reports: [
      { id: "KVR-2026-FC43D5", size: "10 mg", result: "Purity 99.678% (RP-HPLC, C18 column, DAD detection at 214 nm) · Identity by LC-MS", date: "Aug 24, 2026", lab: "Kovera Labs", url: "https://www.vantalabsresearch.com/coa/KVR-2026-FC43D5.pdf" },
    ],
    status: ["DSIP (emideltide) is not listed as an approved drug in the FDA's Drugs@FDA database (searched 24 September 2026)."],
  },
  "epithalon": {
    specs: [["Name", "Epithalon"], ["Synonyms and codes", "Epitalon, Epithalone, AEDG peptide"], ["Description", "Synthetic tetrapeptide (4 amino acids)"], ["Available sizes", "10 mg"], ["Supplied form", "Lyophilized powder"], ["CAS number", "307297-39-8"], ["Molecular formula", "C14H22N4O9"], ["Molecular weight", "390.35 g/mol"], ["Sequence", "AEDG (Ala-Glu-Asp-Gly)"]],
    sources: [["PubChem CID 219042", "https://pubchem.ncbi.nlm.nih.gov/compound/219042"]],
    reports: [
      { id: "KVR-2026-CC3A66", size: "10 mg", result: "Purity 99.816% (RP-HPLC, C18 column, DAD detection at 214 nm) · Identity by LC-MS", date: "Aug 24, 2026", lab: "Kovera Labs", url: "https://www.vantalabsresearch.com/coa/KVR-2026-CC3A66.pdf" },
    ],
    status: ["Epithalon is not listed as an approved drug in the FDA's Drugs@FDA database (searched 24 September 2026)."],
  },
  "ghk-cu": {
    specs: [["Name", "GHK-Cu"], ["Synonyms and codes", "Prezatide copper, Copper tripeptide-1, GHK copper"], ["Description", "Copper(II) complex of the tripeptide glycyl-L-histidyl-L-lysine"], ["Available sizes", "50 mg"], ["Supplied form", "Lyophilized powder"], ["CAS number", "89030-95-5"], ["Molecular formula", "C14H23CuN6O4+"], ["Molecular weight", "402.92 g/mol"], ["Sequence", "Gly-His-Lys, as the copper(II) complex"]],
    notes: ["PubChem lists the formula and weight of the copper complex as a cation."],
    sources: [["PubChem CID 71587328", "https://pubchem.ncbi.nlm.nih.gov/compound/71587328"]],
    reports: [
      { id: "KVR-2026-9039A3", size: "50 mg", result: "Purity 99.581% (RP-HPLC, C18 column, DAD detection at 214 nm) · Identity by LC-MS", date: "Aug 24, 2026", lab: "Kovera Labs", url: "https://www.vantalabsresearch.com/coa/KVR-2026-9039A3.pdf" },
    ],
    status: ["GHK-Cu (prezatide copper) is not listed as an approved drug in the FDA's Drugs@FDA database (searched 24 September 2026)."],
  },
  "ghrp-2": {
    specs: [["Name", "GHRP-2"], ["Synonyms and codes", "Pralmorelin, KP-102"], ["Description", "Synthetic hexapeptide containing D-amino acids, C-terminal amide"], ["Available sizes", "5 mg"], ["Supplied form", "Lyophilized powder"], ["CAS number", "158861-67-7"], ["Molecular formula", "C45H55N9O6"], ["Molecular weight", "818.0 g/mol"], ["Sequence", "D-Ala-D-2-Nal-Ala-Trp-D-Phe-Lys-NH2"]],
    notes: ["2-Nal is 3-(2-naphthyl)alanine, a non-standard amino acid."],
    sources: [["PubChem CID 6918245", "https://pubchem.ncbi.nlm.nih.gov/compound/6918245"]],
    reports: [
      { id: "KVR-2026-94AEDA", size: "5 mg", result: "Purity 99.412% (RP-HPLC, C18 column, DAD detection at 214 nm) · Identity by LC-MS", date: "Aug 24, 2026", lab: "Kovera Labs", url: "https://www.vantalabsresearch.com/coa/KVR-2026-94AEDA.pdf" },
    ],
    status: ["GHRP-2 (pralmorelin) is not listed as an approved drug in the FDA's Drugs@FDA database (searched 24 September 2026)."],
  },
  "glow": {
    specs: [["Name", "GLOW"], ["Description", "Three-peptide blend in one lyophilized vial, 70 mg total"], ["Available sizes", "70 mg"], ["Supplied form", "Lyophilized powder"]],
    composition: [["BPC-157", "10 mg"], ["TB-500 (TB-4)", "10 mg"], ["GHK-Cu", "50 mg"]],
    notes: ["The report labels one component \"TB-500 (TB-4)\". That name is used for more than one peptide related to thymosin beta-4, so no sequence is asserted for it here."],
    reports: [
      { id: "KVR-2026-153C34", size: "70 mg", result: "Purity 99.163%", date: "Aug 24, 2026", lab: "Kovera Labs", url: "https://www.vantalabsresearch.com/coa/KVR-2026-153C34.pdf" },
    ],
    status: ["None of BPC-157, TB-500 or GHK-Cu is listed as an approved drug in the FDA's Drugs@FDA database (searched 24 September 2026)."],
  },
  "glp-1": {
    specs: [["Name", "VLP-1 (SM)"], ["Description", "GLP-1 receptor agonist peptide"], ["Available sizes", "5 mg, 10 mg, 20 mg, 30 mg"], ["Supplied form", "Lyophilized powder"]],
    reports: [
      { id: "KVR-2026-17DA9D", size: "5 mg", result: "Purity 99.419% (RP-HPLC, C18 column, DAD detection at 214 nm) · Identity by LC-MS", date: "Aug 24, 2026", lab: "Kovera Labs", url: "https://www.vantalabsresearch.com/coa/KVR-2026-17DA9D.pdf" },
      { id: "KVR-2026-6BEBFB", size: "10 mg", result: "Purity 99.687% (RP-HPLC, C18 column, DAD detection at 214 nm) · Identity by LC-MS", date: "Aug 24, 2026", lab: "Kovera Labs", url: "https://www.vantalabsresearch.com/coa/KVR-2026-6BEBFB.pdf" },
      { id: "KVR-2026-39F703", size: "20 mg", result: "Purity 99.423% (RP-HPLC, C18 column, DAD detection at 214 nm) · Identity by LC-MS", date: "Aug 24, 2026", lab: "Kovera Labs", url: "https://www.vantalabsresearch.com/coa/KVR-2026-39F703.pdf" },
      { id: "KVR-2026-EAC2B7", size: "30 mg", result: "Purity 99.781% (RP-HPLC, C18 column, DAD detection at 214 nm) · Identity by LC-MS", date: "Aug 24, 2026", lab: "Kovera Labs", url: "https://www.vantalabsresearch.com/coa/KVR-2026-EAC2B7.pdf" },
    ],
  },
  "glp-2": {
    specs: [["Name", "VLP-2 (TR)"], ["Description", "Dual GIP and GLP-1 receptor agonist peptide"], ["Available sizes", "5 mg, 10 mg, 20 mg, 30 mg"], ["Supplied form", "Lyophilized powder"]],
    reports: [
      { id: "KVR-2026-877D23", size: "5 mg", result: "Purity 99.581% (RP-HPLC, C18 column, DAD detection at 214 nm) · Identity by LC-MS", date: "Aug 24, 2026", lab: "Kovera Labs", url: "https://www.vantalabsresearch.com/coa/KVR-2026-877D23.pdf" },
      { id: "KVR-2026-D52918", size: "10 mg", result: "Purity 99.708% (RP-HPLC, C18 column, DAD detection at 214 nm) · Identity by LC-MS", date: "Aug 24, 2026", lab: "Kovera Labs", url: "https://www.vantalabsresearch.com/coa/KVR-2026-D52918.pdf" },
      { id: "KVR-2026-FDA407", size: "20 mg", result: "Purity 99.439% (RP-HPLC, C18 column, DAD detection at 214 nm) · Identity by LC-MS", date: "Aug 24, 2026", lab: "Kovera Labs", url: "https://www.vantalabsresearch.com/coa/KVR-2026-FDA407.pdf" },
      { id: "KVR-2026-01E336", size: "30 mg", result: "Purity 99.874% (RP-HPLC, C18 column, DAD detection at 214 nm) · Identity by LC-MS", date: "Aug 24, 2026", lab: "Kovera Labs", url: "https://www.vantalabsresearch.com/coa/KVR-2026-01E336.pdf" },
    ],
  },
  "glp-3": {
    specs: [["Name", "VLP-3 (RT)"], ["Description", "GIP, GLP-1 and glucagon receptor triple agonist peptide"], ["Available sizes", "5 mg, 10 mg, 20 mg, 30 mg"], ["Supplied form", "Lyophilized powder"]],
    reports: [
      { id: "KVR-2026-9D098C", size: "5 mg", result: "Purity 99.512% (RP-HPLC, C18 column, DAD detection at 214 nm) · Identity by LC-MS", date: "Aug 24, 2026", lab: "Kovera Labs", url: "https://www.vantalabsresearch.com/coa/KVR-2026-9D098C.pdf" },
      { id: "KVR-2026-DEAE76", size: "10 mg", result: "Purity 99.778% (RP-HPLC, C18 column, DAD detection at 214 nm) · Identity by LC-MS", date: "Aug 24, 2026", lab: "Kovera Labs", url: "https://www.vantalabsresearch.com/coa/KVR-2026-DEAE76.pdf" },
      { id: "KVR-2026-D6A2FA", size: "20 mg", result: "Purity 99.556% (RP-HPLC, C18 column, DAD detection at 214 nm) · Identity by LC-MS", date: "Aug 24, 2026", lab: "Kovera Labs", url: "https://www.vantalabsresearch.com/coa/KVR-2026-D6A2FA.pdf" },
      { id: "KVR-2026-2B2E1C", size: "30 mg", result: "Purity 99.753% (RP-HPLC, C18 column, DAD detection at 214 nm) · Identity by LC-MS", date: "Aug 24, 2026", lab: "Kovera Labs", url: "https://www.vantalabsresearch.com/coa/KVR-2026-2B2E1C.pdf" },
    ],
  },
  "hcg": {
    specs: [["Name", "HCG"], ["Synonyms and codes", "Human chorionic gonadotropin, Chorionic gonadotrophin"], ["Description", "Glycoprotein hormone of two subunits: alpha (92 amino acids) and beta (145 amino acids)"], ["Available sizes", "5,000 IU"], ["UNII", "20ED16GHEB"]],
    sources: [["FDA GSRS UNII 20ED16GHEB", "https://gsrs.ncats.nih.gov/ginas/app/beta/substances/20ED16GHEB"]],
    reports: [],
    status: ["The material supplied here is a research chemical. It is not a drug product and is not for human or veterinary use."],
  },
  "igf-1-lr3": {
    specs: [["Name", "IGF-1 LR3"], ["Synonyms and codes", "Long R3 IGF-I, Long-(Arg3) insulin-like growth factor-I"], ["Description", "Analogue of human insulin-like growth factor I: arginine at position 3 and a 13-residue N-terminal extension, 83 amino acids"], ["Available sizes", "1 mg"], ["Supplied form", "Lyophilized powder"], ["CAS number", "143045-27-6"], ["UNII", "M9L22Y19H9"]],
    sources: [["FDA GSRS UNII M9L22Y19H9", "https://gsrs.ncats.nih.gov/ginas/app/beta/substances/M9L22Y19H9"]],
    reports: [
      { id: "KVR-2026-5454E3", size: "1 mg", result: "Purity 99.793%", date: "Aug 24, 2026", lab: "Kovera Labs", url: "https://www.vantalabsresearch.com/coa/KVR-2026-5454E3.pdf" },
    ],
    status: ["IGF-1 LR3 is not listed as an approved drug in the FDA's Drugs@FDA database (searched 24 September 2026)."],
  },
  "kisspeptin": {
    specs: [["Name", "Kisspeptin-10"], ["Synonyms and codes", "KP-10, Metastin 45-54, Human kisspeptin-10"], ["Description", "Decapeptide corresponding to residues 45–54 of human metastin (kisspeptin)"], ["Available sizes", "10 mg"], ["Supplied form", "Lyophilized powder"], ["CAS number", "374675-21-5"], ["Molecular formula", "C63H83N17O14"], ["Molecular weight", "1302.4 g/mol"]],
    sources: [["PubChem CID 25240297", "https://pubchem.ncbi.nlm.nih.gov/compound/25240297"]],
    reports: [
      { id: "KVR-2026-667662", size: "10 mg", result: "Purity 99.791%", date: "Aug 24, 2026", lab: "Kovera Labs", url: "https://www.vantalabsresearch.com/coa/KVR-2026-667662.pdf" },
    ],
    status: ["Kisspeptin-10 is not listed as an approved drug in the FDA's Drugs@FDA database (searched 24 September 2026)."],
  },
  "klow": {
    specs: [["Name", "KLOW"], ["Description", "Four-peptide blend in one lyophilized vial, 80 mg total"], ["Available sizes", "80 mg"], ["Supplied form", "Lyophilized powder"]],
    composition: [["GHK-Cu", "50 mg"], ["KPV", "10 mg"], ["BPC-157", "10 mg"], ["TB-500 (TB-4)", "10 mg"]],
    notes: ["The report labels one component \"TB-500 (TB-4)\". That name is used for more than one peptide related to thymosin beta-4, so no sequence is asserted for it here."],
    reports: [
      { id: "KVR-2026-E355F5", size: "80 mg", result: "Blend average purity 99.271% (RP-HPLC, C18 column, DAD detection at 214 nm) · Identity by LC-MS", date: "Aug 24, 2026", lab: "Kovera Labs", url: "https://www.vantalabsresearch.com/coa/KVR-2026-E355F5.pdf" },
    ],
    status: ["None of GHK-Cu, KPV, BPC-157 or TB-500 is listed as an approved drug in the FDA's Drugs@FDA database (searched 24 September 2026)."],
  },
  "kpv": {
    specs: [["Name", "KPV"], ["Synonyms and codes", "Lys-Pro-Val, alpha-MSH (11-13)"], ["Description", "Tripeptide corresponding to residues 11–13 of alpha-melanocyte-stimulating hormone"], ["Available sizes", "10 mg"], ["Supplied form", "Lyophilized powder"], ["CAS number", "67727-97-3"], ["Molecular formula", "C16H30N4O4"], ["Molecular weight", "342.43 g/mol"], ["Sequence", "KPV (Lys-Pro-Val)"]],
    sources: [["PubChem CID 125672", "https://pubchem.ncbi.nlm.nih.gov/compound/125672"]],
    reports: [
      { id: "KVR-2026-FFA9DB", size: "10 mg", result: "Purity 99.896% (RP-HPLC, C18 column, DAD detection at 214 nm) · Identity by LC-MS", date: "Aug 24, 2026", lab: "Kovera Labs", url: "https://www.vantalabsresearch.com/coa/KVR-2026-FFA9DB.pdf" },
    ],
    status: ["KPV is not listed as an approved drug in the FDA's Drugs@FDA database (searched 24 September 2026)."],
  },
  "l-carnitine": {
    specs: [["Name", "L-Carnitine"], ["Synonyms and codes", "Levocarnitine, (-)-Carnitine"], ["Description", "Quaternary ammonium compound; the L-isomer of carnitine"], ["Available sizes", "6,000 mg"], ["Supplied form", "Liquid"], ["CAS number", "541-15-1"], ["Molecular formula", "C7H15NO3"], ["Molecular weight", "161.20 g/mol"]],
    sources: [["PubChem CID 10917", "https://pubchem.ncbi.nlm.nih.gov/compound/10917"]],
    reports: [
      { id: "KVR-2026-C2C983", result: "Purity 99.611%", date: "Aug 24, 2026", lab: "Kovera Labs", url: "https://www.vantalabsresearch.com/coa/KVR-2026-C2C983.pdf" },
    ],
    status: ["The material supplied here is a research chemical. It is not a drug product and is not for human or veterinary use."],
  },
  "lipo-c": {
    specs: [["Name", "LIPO-C"], ["Description", "Multi-component lipotropic solution, 10 mL"], ["Available sizes", "10 mL"]],
    reports: [
      { id: "KVR-2026-02287A", result: "Identity screen (HPLC-UV with LC-MS/MS identity confirmation): lists the compounds detected in the vial, not their amounts", date: "Aug 24, 2026", lab: "Kovera Labs", url: "https://www.vantalabsresearch.com/coa/KVR-2026-02287A.pdf" },
    ],
  },
  "mots-c": {
    specs: [["Name", "MOTS-c"], ["Synonyms and codes", "Mitochondrial open reading frame of the 12S rRNA-c"], ["Description", "Mitochondrial-derived peptide of 16 amino acids"], ["Available sizes", "10 mg"], ["CAS number", "1627580-64-6"], ["Molecular formula", "C101H152N28O22S2"], ["Molecular weight", "2174.6 g/mol"], ["Sequence", "MRWQEMGYIFYPRKLR (Met-Arg-Trp-Gln-Glu-Met-Gly-Tyr-Ile-Phe-Tyr-Pro-Arg-Lys-Leu-Arg)"]],
    sources: [["PubChem CID 146675088", "https://pubchem.ncbi.nlm.nih.gov/compound/146675088"]],
    reports: [
      { id: "Lot GB-7058391-P", size: "10 mg", result: "Purity 99.53% (UPLC/MS)", date: "May 25, 2026", lab: "Horizon Analytical", url: "https://www.vantalabsresearch.com/products/mots-c" },
    ],
    status: ["MOTS-c is not listed as an approved drug in the FDA's Drugs@FDA database (searched 24 September 2026)."],
  },
  "mt-2-melanotan-ii": {
    specs: [["Name", "MT-2"], ["Synonyms and codes", "Melanotan II, Melanotan-2"], ["Description", "Synthetic cyclic heptapeptide melanocortin analogue, N-acetylated and C-terminally amidated"], ["Available sizes", "10 mg"], ["Supplied form", "Lyophilized powder"], ["CAS number", "121062-08-6"], ["Molecular formula", "C50H69N15O9"], ["Molecular weight", "1024.2 g/mol"], ["Sequence", "Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-NH2"]],
    notes: ["Nle is norleucine. The ring is a lactam between Asp (position 2) and Lys (position 7)."],
    sources: [["PubChem CID 92432", "https://pubchem.ncbi.nlm.nih.gov/compound/92432"]],
    reports: [
      { id: "KVR-2026-286BFF", size: "10 mg", result: "Purity 99.714% (RP-HPLC, C18 column, DAD detection at 214 nm) · Identity by LC-MS", date: "Aug 24, 2026", lab: "Kovera Labs", url: "https://www.vantalabsresearch.com/coa/KVR-2026-286BFF.pdf" },
    ],
    status: ["Melanotan II is not listed as an approved drug in the FDA's Drugs@FDA database (searched 24 September 2026)."],
  },
  "nad": {
    specs: [["Name", "NAD+"], ["Synonyms and codes", "Nicotinamide adenine dinucleotide, Nadide, beta-NAD, Coenzyme I"], ["Description", "Dinucleotide coenzyme"], ["Available sizes", "500 mg, 1,000 mg"], ["Supplied form", "Lyophilized powder"], ["CAS number", "53-84-9"], ["Molecular formula", "C21H27N7O14P2"], ["Molecular weight", "663.4 g/mol"]],
    sources: [["PubChem CID 5892", "https://pubchem.ncbi.nlm.nih.gov/compound/5892"]],
    reports: [
      { id: "KVR-2026-1BA750", size: "500 mg", result: "Purity 99.659% (RP-HPLC, C18 column, DAD detection at 260 nm) · Identity by LC-MS", date: "Aug 24, 2026", lab: "Kovera Labs", url: "https://www.vantalabsresearch.com/coa/KVR-2026-1BA750.pdf" },
      { id: "KVR-2026-762363", size: "1000 mg", result: "Purity 99.718% (RP-HPLC, C18 column, DAD detection at 260 nm) · Identity by LC-MS", date: "Aug 24, 2026", lab: "Kovera Labs", url: "https://www.vantalabsresearch.com/coa/KVR-2026-762363.pdf" },
    ],
    status: ["NAD+ (nadide) is not listed as an approved drug in the FDA's Drugs@FDA database (searched 24 September 2026)."],
  },
  "pt-141": {
    specs: [["Name", "PT-141"], ["Synonyms and codes", "Bremelanotide"], ["Description", "Synthetic cyclic heptapeptide melanocortin analogue, N-acetylated, C-terminal free acid"], ["Available sizes", "10 mg"], ["Supplied form", "Lyophilized powder"], ["CAS number", "189691-06-3"], ["Molecular formula", "C50H68N14O10"], ["Molecular weight", "1025.2 g/mol"], ["Sequence", "Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-OH"]],
    notes: ["Nle is norleucine. The ring is a lactam between Asp (position 2) and Lys (position 7)."],
    sources: [["PubChem CID 9941379", "https://pubchem.ncbi.nlm.nih.gov/compound/9941379"]],
    reports: [
      { id: "KVR-2026-63018C", size: "10 mg", result: "Purity 99.422% (RP-HPLC, C18 column, DAD detection at 214 nm) · Identity by LC-MS", date: "Aug 24, 2026", lab: "Kovera Labs", url: "https://www.vantalabsresearch.com/coa/KVR-2026-63018C.pdf" },
    ],
    status: ["The material supplied here is a research chemical. It is not a drug product and is not for human or veterinary use."],
  },
  "recon-water": {
    specs: [["Name", "Recon water"], ["Description", "Water with 0.9% benzyl alcohol, in a 10 mL glass vial"], ["Available sizes", "10 mL"], ["Supplied form", "Liquid"]],
    reports: [],
  },
  "selank": {
    specs: [["Name", "Selank"], ["Description", "Synthetic heptapeptide: tuftsin (Thr-Lys-Pro-Arg) extended by Pro-Gly-Pro"], ["Available sizes", "10 mg"], ["Supplied form", "Lyophilized powder"], ["CAS number", "129954-34-3"], ["Molecular formula", "C33H57N11O9"], ["Molecular weight", "751.9 g/mol"], ["Sequence", "TKPRPGP (Thr-Lys-Pro-Arg-Pro-Gly-Pro)"]],
    sources: [["PubChem CID 11765600", "https://pubchem.ncbi.nlm.nih.gov/compound/11765600"], ["PubChem CID 156080", "https://pubchem.ncbi.nlm.nih.gov/compound/156080"]],
    reports: [
      { id: "KVR-2026-90183D", size: "10 mg", result: "Purity 99.254% (RP-HPLC, C18 column, DAD detection at 214 nm) · Identity by LC-MS", date: "Aug 24, 2026", lab: "Kovera Labs", url: "https://www.vantalabsresearch.com/coa/KVR-2026-90183D.pdf" },
    ],
    status: ["Selank is not listed as an approved drug in the FDA's Drugs@FDA database (searched 24 September 2026)."],
  },
  "semax": {
    specs: [["Name", "Semax"], ["Synonyms and codes", "ACTH(4-7)-Pro-Gly-Pro"], ["Description", "Synthetic heptapeptide: ACTH(4-7) extended by Pro-Gly-Pro"], ["Available sizes", "10 mg"], ["Supplied form", "Lyophilized powder"], ["CAS number", "80714-61-0"], ["Molecular formula", "C37H51N9O10S"], ["Molecular weight", "813.9 g/mol"], ["Sequence", "MEHFPGP (Met-Glu-His-Phe-Pro-Gly-Pro)"]],
    sources: [["PubChem CID 9811102", "https://pubchem.ncbi.nlm.nih.gov/compound/9811102"]],
    reports: [
      { id: "KVR-2026-C95705", size: "10 mg", result: "Purity 99.436% (RP-HPLC, C18 column, DAD detection at 214 nm) · Identity by LC-MS", date: "Aug 24, 2026", lab: "Kovera Labs", url: "https://www.vantalabsresearch.com/coa/KVR-2026-C95705.pdf" },
    ],
    status: ["Semax is not listed as an approved drug in the FDA's Drugs@FDA database (searched 24 September 2026)."],
  },
  "snap-8": {
    specs: [["Name", "SNAP-8"], ["Synonyms and codes", "Acetyl octapeptide-3"], ["Description", "Synthetic octapeptide, N-acetylated and C-terminally amidated"], ["Available sizes", "10 mg"], ["Supplied form", "Lyophilized powder"], ["Molecular formula", "C41H70N16O16S"], ["Molecular weight", "1075.2 g/mol"], ["Sequence", "Ac-Glu-Glu-Met-Gln-Arg-Arg-Ala-Asp-NH2"]],
    sources: [["PubChem CID 76283482", "https://pubchem.ncbi.nlm.nih.gov/compound/76283482"]],
    reports: [
      { id: "KVR-2026-AFA5BD", size: "10 mg", result: "Purity 99.402%", date: "Aug 24, 2026", lab: "Kovera Labs", url: "https://www.vantalabsresearch.com/coa/KVR-2026-AFA5BD.pdf" },
    ],
    status: ["SNAP-8 (acetyl octapeptide-3) is not listed as an approved drug in the FDA's Drugs@FDA database (searched 24 September 2026)."],
  },
  "ss-31": {
    specs: [["Name", "SS-31"], ["Synonyms and codes", "Elamipretide, MTP-131, Szeto-Schiller peptide 31"], ["Description", "Synthetic tetrapeptide, C-terminally amidated"], ["Available sizes", "10 mg"], ["Supplied form", "Lyophilized powder"], ["CAS number", "736992-21-5"], ["Molecular formula", "C32H49N9O5"], ["Molecular weight", "639.8 g/mol"], ["Sequence", "D-Arg-Dmt-Lys-Phe-NH2"]],
    notes: ["Dmt is 2′,6′-dimethyltyrosine, a non-standard amino acid."],
    sources: [["PubChem CID 11764719", "https://pubchem.ncbi.nlm.nih.gov/compound/11764719"]],
    reports: [
      { id: "KVR-2026-FD7ADC", size: "10 mg", result: "Purity 99.476% (RP-HPLC, C18 column, DAD detection at 214 nm) · Identity by LC-MS", date: "Aug 24, 2026", lab: "Kovera Labs", url: "https://www.vantalabsresearch.com/coa/KVR-2026-FD7ADC.pdf" },
    ],
    status: ["The material supplied here is a research chemical. It is not a drug product and is not for human or veterinary use."],
  },
  "tesamorelin": {
    specs: [["Name", "Tesamorelin"], ["Synonyms and codes", "TH9507"], ["Description", "Synthetic analogue of human growth hormone-releasing hormone, GHRH(1-44)"], ["Available sizes", "5 mg, 10 mg"], ["CAS number", "218949-48-5"], ["Molecular formula", "C221H366N72O67S"], ["Molecular weight", "5136 g/mol"]],
    sources: [["PubChem CID 16137828", "https://pubchem.ncbi.nlm.nih.gov/compound/16137828"]],
    reports: [
      { id: "Lot GB-1700427-P", size: "10 mg", result: "Purity 99.39% (UPLC/MS)", date: "Jul 3, 2026", lab: "Horizon Analytical", url: "https://www.vantalabsresearch.com/products/tesamorelin" },
    ],
    status: ["The material supplied here is a research chemical. It is not a drug product and is not for human or veterinary use."],
  },
  "thymosin-alpha-1": {
    specs: [["Name", "Thymosin Alpha-1"], ["Synonyms and codes", "Thymalfasin, Thymosin alpha 1"], ["Description", "Synthetic peptide of 28 amino acids"], ["Available sizes", "5 mg"], ["Supplied form", "Lyophilized powder"], ["CAS number", "62304-98-7"], ["Molecular formula", "C129H215N33O55"], ["Molecular weight", "3108.3 g/mol"]],
    sources: [["PubChem CID 16130571", "https://pubchem.ncbi.nlm.nih.gov/compound/16130571"]],
    reports: [
      { id: "KVR-2026-4D316E", size: "5 mg", result: "Purity 99.764%", date: "Aug 24, 2026", lab: "Kovera Labs", url: "https://www.vantalabsresearch.com/coa/KVR-2026-4D316E.pdf" },
    ],
    status: ["Thymosin alpha-1 (thymalfasin) is not listed as an approved drug in the FDA's Drugs@FDA database (searched 24 September 2026)."],
  },
};
