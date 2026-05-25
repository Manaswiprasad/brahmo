-- Supabase Schema for Drug Safety Engine

-- 1. Drugs Table
CREATE TABLE IF NOT EXISTS drugs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  generic_name TEXT NOT NULL,
  generic_name_normalized TEXT NOT NULL UNIQUE,
  drug_class TEXT NOT NULL,
  renal_dosing JSONB NOT NULL DEFAULT '{}'::jsonb
);

-- 2. Drug Interactions Table
CREATE TABLE IF NOT EXISTS drug_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  drug_a_id UUID REFERENCES drugs(id) ON DELETE CASCADE,
  drug_b_id UUID REFERENCES drugs(id) ON DELETE CASCADE,
  severity TEXT NOT NULL CHECK (severity IN ('CONTRAINDICATED', 'SEVERE', 'MODERATE', 'MINOR')),
  mechanism TEXT NOT NULL,
  clinical_effect TEXT NOT NULL,
  management TEXT NOT NULL,
  UNIQUE(drug_a_id, drug_b_id)
);

-- 3. Allergy Cross-Reactivity Table
CREATE TABLE IF NOT EXISTS allergy_cross_reactivity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  drug_class_a TEXT NOT NULL,
  drug_class_b TEXT NOT NULL,
  cross_reactivity_pct DECIMAL NOT NULL,
  clinical_guidance TEXT NOT NULL,
  UNIQUE(drug_class_a, drug_class_b)
);
