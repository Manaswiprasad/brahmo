-- Seed Data for Drug Safety Engine

-- 1. Insert 50 Drugs
INSERT INTO drugs (generic_name, generic_name_normalized, drug_class, renal_dosing) VALUES
('Metformin', 'metformin', 'biguanide', '{"rules": [{"eGFR_less_than": 30, "action": "contraindicated"}]}'),
('Glimepiride', 'glimepiride', 'sulfonylurea', '{"rules": [{"eGFR_less_than": 30, "action": "avoid"}]}'),
('Empagliflozin', 'empagliflozin', 'sglt2i', '{"rules": [{"eGFR_less_than": 20, "action": "avoid"}]}'),
('Insulin Glargine', 'insulin glargine', 'insulin', '{"rules": [{"eGFR_less_than": 100, "action": "reduce as eGFR declines"}]}'),
('Atorvastatin', 'atorvastatin', 'statin', '{}'),
('Rosuvastatin', 'rosuvastatin', 'statin', '{"rules": [{"eGFR_less_than": 30, "action": "start low"}]}'),
('Amlodipine', 'amlodipine', 'ccb', '{}'),
('Telmisartan', 'telmisartan', 'arb', '{"rules": [{"action": "monitor K+ in CKD"}]}'),
('Ramipril', 'ramipril', 'ace_inhibitor', '{"rules": [{"eGFR_less_than": 30, "action": "reduce"}]}'),
('Lisinopril', 'lisinopril', 'ace_inhibitor', '{"rules": [{"eGFR_less_than": 30, "action": "reduce"}]}'),
('Furosemide', 'furosemide', 'loop_diuretic', '{"rules": [{"action": "higher doses in CKD"}]}'),
('Spironolactone', 'spironolactone', 'k_sparing_diuretic', '{"rules": [{"eGFR_less_than": 30, "action": "avoid"}]}'),
('Bisoprolol', 'bisoprolol', 'beta_blocker', '{}'),
('Carvedilol', 'carvedilol', 'beta_blocker', '{}'),
('Aspirin', 'aspirin', 'antiplatelet', '{}'),
('Clopidogrel', 'clopidogrel', 'antiplatelet', '{}'),
('Ticagrelor', 'ticagrelor', 'antiplatelet', '{}'),
('Warfarin', 'warfarin', 'vka', '{"rules": [{"action": "monitor INR"}]}'),
('Rivaroxaban', 'rivaroxaban', 'doac', '{"rules": [{"eGFR_less_than": 15, "action": "avoid"}, {"eGFR_less_than": 50, "action": "reduce"}]}'),
('Apixaban', 'apixaban', 'doac', '{"rules": [{"eGFR_less_than": 25, "action": "reduce"}]}'),
('Enoxaparin', 'enoxaparin', 'lmwh', '{"rules": [{"eGFR_less_than": 30, "action": "once daily"}]}'),
('Amoxicillin', 'amoxicillin', 'penicillin', '{"rules": [{"eGFR_less_than": 30, "action": "reduce frequency"}]}'),
('Amoxicillin-Clavulanate', 'amoxicillin-clavulanate', 'penicillin', '{"rules": [{"eGFR_less_than": 30, "action": "reduce frequency"}]}'),
('Ampicillin', 'ampicillin', 'penicillin', '{"rules": [{"eGFR_less_than": 30, "action": "reduce frequency"}]}'),
('Clarithromycin', 'clarithromycin', 'macrolide', '{"rules": [{"eGFR_less_than": 30, "action": "reduce 50%"}]}'),
('Azithromycin', 'azithromycin', 'macrolide', '{}'),
('Levofloxacin', 'levofloxacin', 'fluoroquinolone', '{"rules": [{"eGFR_less_than": 50, "action": "adjust"}]}'),
('Ciprofloxacin', 'ciprofloxacin', 'fluoroquinolone', '{"rules": [{"eGFR_less_than": 30, "action": "reduce 50%"}]}'),
('Meropenem', 'meropenem', 'carbapenem', '{"rules": [{"eGFR_less_than": 26, "action": "reduce"}]}'),
('Ceftriaxone', 'ceftriaxone', 'cephalosporin_3rd', '{}'),
('Cefazolin', 'cefazolin', 'cephalosporin_1st', '{"rules": [{"eGFR_less_than": 35, "action": "reduce"}]}'),
('Nitrofurantoin', 'nitrofurantoin', 'nitrofuran', '{"rules": [{"eGFR_less_than": 30, "action": "avoid"}]}'),
('Co-trimoxazole', 'co-trimoxazole', 'sulfonamide', '{"rules": [{"eGFR_less_than": 15, "action": "avoid"}]}'),
('Gabapentin', 'gabapentin', 'gabapentinoid', '{"rules": [{"eGFR_less_than": 30, "action": "100mg OD"}, {"eGFR_less_than": 60, "action": "50%"}]}'),
('Pregabalin', 'pregabalin', 'gabapentinoid', '{"rules": [{"eGFR_less_than": 30, "action": "75% less"}, {"eGFR_less_than": 60, "action": "reduce"}]}'),
('Escitalopram', 'escitalopram', 'ssri', '{}'),
('Fluoxetine', 'fluoxetine', 'ssri', '{}'),
('Duloxetine', 'duloxetine', 'snri', '{"rules": [{"eGFR_less_than": 30, "action": "avoid"}]}'),
('Tramadol', 'tramadol', 'opioid', '{"rules": [{"eGFR_less_than": 30, "action": "reduce"}]}'),
('Morphine', 'morphine', 'opioid', '{"rules": [{"eGFR_less_than": 30, "action": "reduce (metabolites)"}]}'),
('Fentanyl', 'fentanyl', 'opioid', '{"rules": [{"action": "Preferred in CKD"}]}'),
('Paracetamol', 'paracetamol', 'analgesic', '{}'),
('Diclofenac', 'diclofenac', 'nsaid', '{"rules": [{"action": "Avoid in CKD"}]}'),
('Ibuprofen', 'ibuprofen', 'nsaid', '{"rules": [{"action": "Avoid in CKD"}]}'),
('Pantoprazole', 'pantoprazole', 'ppi', '{}'),
('Omeprazole', 'omeprazole', 'ppi', '{}'),
('Tamsulosin', 'tamsulosin', 'alpha_blocker', '{}'),
('Digoxin', 'digoxin', 'cardiac_glycoside', '{"rules": [{"eGFR_less_than": 30, "action": "reduce, monitor levels"}]}'),
('Phenytoin', 'phenytoin', 'anticonvulsant', '{"rules": [{"action": "Complex in CKD"}]}'),
('Sodium Valproate', 'sodium valproate', 'anticonvulsant', '{}')
ON CONFLICT (generic_name_normalized) DO NOTHING;

-- 2. Insert 30 Drug Interactions
WITH pairs AS (
    SELECT 'clarithromycin' as drug_a, 'atorvastatin' as drug_b, 'SEVERE' as severity, 'CYP3A4 → 4-5x statin' as mechanism, 'rhabdomyolysis' as clinical_effect, 'Avoid combination' as management UNION ALL
    SELECT 'clarithromycin', 'rosuvastatin', 'MODERATE', 'Weak CYP3A4', 'monitor myopathy', 'Monitor CK' UNION ALL
    SELECT 'clarithromycin', 'amlodipine', 'MODERATE', 'CYP3A4', 'hypotension', 'Monitor BP' UNION ALL
    SELECT 'clarithromycin', 'warfarin', 'SEVERE', 'CYP', 'increased INR → bleeding', 'Monitor INR, consider alternative' UNION ALL
    SELECT 'ciprofloxacin', 'warfarin', 'MODERATE', 'CYP1A2', 'increased INR', 'Monitor INR' UNION ALL
    SELECT 'fluoxetine', 'tramadol', 'SEVERE', 'Serotonin syndrome', 'death risk', 'Avoid combination' UNION ALL
    SELECT 'escitalopram', 'tramadol', 'MODERATE', 'Serotonin risk', 'monitor', 'Monitor for serotonin syndrome' UNION ALL
    SELECT 'diclofenac', 'telmisartan', 'SEVERE', 'Nephrotoxicity "triple whammy"', 'renal failure', 'Avoid NSAIDs' UNION ALL
    SELECT 'diclofenac', 'ramipril', 'SEVERE', 'Nephrotoxicity "triple whammy"', 'renal failure', 'Avoid NSAIDs' UNION ALL
    SELECT 'ibuprofen', 'aspirin', 'MODERATE', 'Reduced antiplatelet effect', 'reduced efficacy', 'Space dosing' UNION ALL
    SELECT 'warfarin', 'aspirin', 'SEVERE', 'Additive', 'major hemorrhage', 'Avoid unless strictly indicated' UNION ALL
    SELECT 'spironolactone', 'ramipril', 'MODERATE', 'Hyperkalemia', 'cardiac arrest risk', 'Monitor K+' UNION ALL
    SELECT 'spironolactone', 'telmisartan', 'MODERATE', 'Hyperkalemia', 'hyperkalemia', 'Monitor K+' UNION ALL
    SELECT 'digoxin', 'amiodarone', 'SEVERE', 'Reduced clearance', 'toxicity', 'Reduce digoxin dose by 50%' UNION ALL
    SELECT 'metformin', 'contrast dye', 'MODERATE', 'Lactic acidosis risk', 'lactic acidosis', 'Hold metformin' UNION ALL
    SELECT 'phenytoin', 'sodium valproate', 'MODERATE', 'Altered metabolism', 'altered levels', 'Monitor levels' UNION ALL
    SELECT 'duloxetine', 'tramadol', 'SEVERE', 'Serotonin syndrome', 'serotonin syndrome', 'Avoid combination' UNION ALL
    SELECT 'clopidogrel', 'omeprazole', 'MODERATE', 'CYP2C19', 'reduced antiplatelet', 'Use alternative PPI (e.g. pantoprazole)' UNION ALL
    SELECT 'clopidogrel', 'pantoprazole', 'MINOR', 'Weak CYP2C19', 'pantoprazole preferred', 'Generally safe' UNION ALL
    SELECT 'rivaroxaban', 'clarithromycin', 'SEVERE', 'P-gp+CYP3A4', 'bleeding', 'Avoid combination' UNION ALL
    SELECT 'apixaban', 'clarithromycin', 'MODERATE', 'P-gp+CYP3A4', 'increased levels', 'Consider dose reduction' UNION ALL
    SELECT 'simvastatin', 'amlodipine', 'MODERATE', 'CYP3A4', 'limit simvastatin 20mg', 'Limit simvastatin dose' UNION ALL
    SELECT 'methotrexate', 'co-trimoxazole', 'SEVERE', 'Antifolate', 'pancytopenia', 'Avoid combination' UNION ALL
    SELECT 'carbamazepine', 'clarithromycin', 'SEVERE', 'CYP3A4', 'carbamazepine toxicity', 'Avoid combination' UNION ALL
    SELECT 'theophylline', 'ciprofloxacin', 'SEVERE', 'CYP1A2', 'seizures', 'Monitor theophylline levels' UNION ALL
    SELECT 'escitalopram', 'ondansetron', 'MODERATE', 'Additive QT', 'Torsades', 'Monitor ECG' UNION ALL
    SELECT 'metformin', 'furosemide', 'MINOR', 'Lactic acidosis risk in CKD', 'lactic acidosis', 'Monitor renal function' UNION ALL
    SELECT 'morphine', 'escitalopram', 'MINOR', 'CNS depression', 'sedation', 'Monitor' UNION ALL
    SELECT 'pregabalin', 'morphine', 'MODERATE', 'CNS+respiratory depression', 'respiratory depression', 'Reduce doses' UNION ALL
    SELECT 'lithium', 'diclofenac', 'SEVERE', 'Reduced clearance', 'toxicity', 'Avoid NSAIDs'
)
INSERT INTO drug_interactions (drug_a_id, drug_b_id, severity, mechanism, clinical_effect, management)
SELECT d1.id, d2.id, CAST(p.severity AS TEXT), p.mechanism, p.clinical_effect, p.management
FROM pairs p
JOIN drugs d1 ON d1.generic_name_normalized = p.drug_a
JOIN drugs d2 ON d2.generic_name_normalized = p.drug_b
ON CONFLICT (drug_a_id, drug_b_id) DO NOTHING;

-- Insert reverse directions for interactions to make querying easier (since A+B = B+A)
WITH pairs AS (
    SELECT 'clarithromycin' as drug_a, 'atorvastatin' as drug_b, 'SEVERE' as severity, 'CYP3A4 → 4-5x statin' as mechanism, 'rhabdomyolysis' as clinical_effect, 'Avoid combination' as management UNION ALL
    SELECT 'clarithromycin', 'rosuvastatin', 'MODERATE', 'Weak CYP3A4', 'monitor myopathy', 'Monitor CK' UNION ALL
    SELECT 'clarithromycin', 'amlodipine', 'MODERATE', 'CYP3A4', 'hypotension', 'Monitor BP' UNION ALL
    SELECT 'clarithromycin', 'warfarin', 'SEVERE', 'CYP', 'increased INR → bleeding', 'Monitor INR, consider alternative' UNION ALL
    SELECT 'ciprofloxacin', 'warfarin', 'MODERATE', 'CYP1A2', 'increased INR', 'Monitor INR' UNION ALL
    SELECT 'fluoxetine', 'tramadol', 'SEVERE', 'Serotonin syndrome', 'death risk', 'Avoid combination' UNION ALL
    SELECT 'escitalopram', 'tramadol', 'MODERATE', 'Serotonin risk', 'monitor', 'Monitor for serotonin syndrome' UNION ALL
    SELECT 'diclofenac', 'telmisartan', 'SEVERE', 'Nephrotoxicity "triple whammy"', 'renal failure', 'Avoid NSAIDs' UNION ALL
    SELECT 'diclofenac', 'ramipril', 'SEVERE', 'Nephrotoxicity "triple whammy"', 'renal failure', 'Avoid NSAIDs' UNION ALL
    SELECT 'ibuprofen', 'aspirin', 'MODERATE', 'Reduced antiplatelet effect', 'reduced efficacy', 'Space dosing' UNION ALL
    SELECT 'warfarin', 'aspirin', 'SEVERE', 'Additive', 'major hemorrhage', 'Avoid unless strictly indicated' UNION ALL
    SELECT 'spironolactone', 'ramipril', 'MODERATE', 'Hyperkalemia', 'cardiac arrest risk', 'Monitor K+' UNION ALL
    SELECT 'spironolactone', 'telmisartan', 'MODERATE', 'Hyperkalemia', 'hyperkalemia', 'Monitor K+' UNION ALL
    SELECT 'digoxin', 'amiodarone', 'SEVERE', 'Reduced clearance', 'toxicity', 'Reduce digoxin dose by 50%' UNION ALL
    SELECT 'metformin', 'contrast dye', 'MODERATE', 'Lactic acidosis risk', 'lactic acidosis', 'Hold metformin' UNION ALL
    SELECT 'phenytoin', 'sodium valproate', 'MODERATE', 'Altered metabolism', 'altered levels', 'Monitor levels' UNION ALL
    SELECT 'duloxetine', 'tramadol', 'SEVERE', 'Serotonin syndrome', 'serotonin syndrome', 'Avoid combination' UNION ALL
    SELECT 'clopidogrel', 'omeprazole', 'MODERATE', 'CYP2C19', 'reduced antiplatelet', 'Use alternative PPI (e.g. pantoprazole)' UNION ALL
    SELECT 'clopidogrel', 'pantoprazole', 'MINOR', 'Weak CYP2C19', 'pantoprazole preferred', 'Generally safe' UNION ALL
    SELECT 'rivaroxaban', 'clarithromycin', 'SEVERE', 'P-gp+CYP3A4', 'bleeding', 'Avoid combination' UNION ALL
    SELECT 'apixaban', 'clarithromycin', 'MODERATE', 'P-gp+CYP3A4', 'increased levels', 'Consider dose reduction' UNION ALL
    SELECT 'simvastatin', 'amlodipine', 'MODERATE', 'CYP3A4', 'limit simvastatin 20mg', 'Limit simvastatin dose' UNION ALL
    SELECT 'methotrexate', 'co-trimoxazole', 'SEVERE', 'Antifolate', 'pancytopenia', 'Avoid combination' UNION ALL
    SELECT 'carbamazepine', 'clarithromycin', 'SEVERE', 'CYP3A4', 'carbamazepine toxicity', 'Avoid combination' UNION ALL
    SELECT 'theophylline', 'ciprofloxacin', 'SEVERE', 'CYP1A2', 'seizures', 'Monitor theophylline levels' UNION ALL
    SELECT 'escitalopram', 'ondansetron', 'MODERATE', 'Additive QT', 'Torsades', 'Monitor ECG' UNION ALL
    SELECT 'metformin', 'furosemide', 'MINOR', 'Lactic acidosis risk in CKD', 'lactic acidosis', 'Monitor renal function' UNION ALL
    SELECT 'morphine', 'escitalopram', 'MINOR', 'CNS depression', 'sedation', 'Monitor' UNION ALL
    SELECT 'pregabalin', 'morphine', 'MODERATE', 'CNS+respiratory depression', 'respiratory depression', 'Reduce doses' UNION ALL
    SELECT 'lithium', 'diclofenac', 'SEVERE', 'Reduced clearance', 'toxicity', 'Avoid NSAIDs'
)
INSERT INTO drug_interactions (drug_a_id, drug_b_id, severity, mechanism, clinical_effect, management)
SELECT d2.id, d1.id, CAST(p.severity AS TEXT), p.mechanism, p.clinical_effect, p.management
FROM pairs p
JOIN drugs d1 ON d1.generic_name_normalized = p.drug_a
JOIN drugs d2 ON d2.generic_name_normalized = p.drug_b
ON CONFLICT (drug_a_id, drug_b_id) DO NOTHING;

-- 3. Insert Allergy Cross Reactivity
INSERT INTO allergy_cross_reactivity (drug_class_a, drug_class_b, cross_reactivity_pct, clinical_guidance) VALUES
('penicillin', 'penicillin', 100, 'Same class — DIRECT MATCH'),
('penicillin', 'cephalosporin_1st', 2, 'Avoid if anaphylaxis'),
('penicillin', 'cephalosporin_3rd', 0.5, 'Use with caution'),
('penicillin', 'carbapenem', 1, 'Generally safe'),
('sulfonamide', 'sulfonamide', 100, 'Same class'),
('ace_inhibitor', 'ace_inhibitor', 100, 'Angioedema risk'),
('ace_inhibitor', 'arb', 0, 'ARBs are SAFE'),
('nsaid', 'nsaid', 100, 'Avoid ALL in aspirin-exacerbated'),
('aspirin', 'nsaid', 100, 'Avoid ALL in aspirin-exacerbated')
ON CONFLICT (drug_class_a, drug_class_b) DO NOTHING;
