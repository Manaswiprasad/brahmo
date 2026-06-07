"use client";

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { PATIENTS } from '@/lib/patients';
import { Patient, SafetyCheckResult } from '@/lib/types';
import SafetyAlerts from '@/components/SafetyAlerts';
import ResponseComparison from '@/components/ResponseComparison';
import MedicalARViewer from '@/components/MedicalARViewer';

function ConsultationContent() {
  const searchParams = useSearchParams();
  const patientId = searchParams.get('patientId') || '1';

  // Load patient from reference case archive
  const patient = PATIENTS.find(p => p.id === patientId) || PATIENTS[0];

  const [showAR, setShowAR] = useState(false);
  const [question, setQuestion] = useState<string>('');
  const [proposedDrug, setProposedDrug] = useState<string>('');

  const [safetyResult, setSafetyResult] = useState<SafetyCheckResult | null>(null);
  const [isCheckingSafety, setIsCheckingSafety] = useState(false);

  const [genericResponse, setGenericResponse] = useState('');
  const [enhancedResponse, setEnhancedResponse] = useState('');
  const [isLoadingGeneric, setIsLoadingGeneric] = useState(false);
  const [isLoadingEnhanced, setIsLoadingEnhanced] = useState(false);

  // Helper to retrieve recommended clinical scenarios
  const getSuggestedScenario = (id: string) => {
    switch (id) {
      case "1":
        return {
          title: "Macrolide Interaction & Renal Clearance",
          drug: "Clarithromycin",
          question: "Can I add Clarithromycin 500mg for pneumonia?",
          explanation: "Tests macrolide drug-drug interactions with existing statin/sulfonylurea and renal dosing limitations under moderate renal impairment (eGFR 31.2)."
        };
      case "3":
        return {
          title: "Sulfonamide Class Cross-Reactivity & Polypharmacy UTI",
          drug: "Amoxicillin-Clavulanate",
          question: "UTI treatment — can I use Amoxicillin-Clavulanate?",
          explanation: "Tests antibiotic choice in a highly complex multimorbid patient under severe polypharmacy, cross-checking allergy sensitivities."
        };
      case "7":
        return {
          title: "Gabapentinoids under Acute Kidney Injury (AKI)",
          drug: "Gabapentin",
          question: "Adding Gabapentin 300mg TDS for neuropathic pain",
          explanation: "Tests severe renal dosing restrictions under ICU-level acute renal failure (eGFR 18) where standard dosing is highly toxic."
        };
      case "8":
        return {
          title: "CHA₂DS₂-VASc Anticoagulation Mandate",
          drug: "Warfarin",
          question: "Does this patient still need anticoagulation?",
          explanation: "Tests clinical calculation-driven AI guardrails. Automatically computes an elevated CHA₂DS₂-VASc stroke score and prompts the AI accordingly."
        };
      default:
        return null;
    }
  };

  const activeScenario = getSuggestedScenario(patient.id);

  const applyScenario = () => {
    if (activeScenario) {
      setProposedDrug(activeScenario.drug);
      setQuestion(activeScenario.question);
      setGenericResponse('');
      setEnhancedResponse('');
      setSafetyResult(null);
    }
  };

  const handleAskGeneric = async () => {
    if (!question) return;
    setIsLoadingGeneric(true);
    setGenericResponse('');

    try {
      const systemPrompt = `You are a helpful clinical AI assistant. You are consulting on the following patient:\n${patient.summary}\n\nProposed Medication to evaluate: ${proposedDrug}\n\nPlease answer the doctor's question.`;
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ systemPrompt, messages: [{ role: 'user', content: question }] })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setGenericResponse(data.text);
    } catch (err: any) {
      setGenericResponse(`Error: ${err.message}`);
    } finally {
      setIsLoadingGeneric(false);
    }
  };

  const handleAskEnhanced = async () => {
    if (!question) return;
    setIsLoadingEnhanced(true);
    setIsCheckingSafety(true);
    setEnhancedResponse('');
    setSafetyResult(null);

    try {
      const safetyRes = await fetch('/api/safety-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newDrugName: proposedDrug || 'Unknown', patient })
      });

      const safetyData: SafetyCheckResult = await safetyRes.json();
      if ((safetyData as any).error) throw new Error((safetyData as any).error);

      setSafetyResult(safetyData);
      setIsCheckingSafety(false);

      const systemPrompt = `${safetyData.constraintText}\n\nYou are a helpful clinical AI assistant. Patient info:\n${patient.summary}\n\nProposed Medication to evaluate: ${proposedDrug}\n\nAdhere strictly to safety constraints above.`;

      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ systemPrompt, messages: [{ role: 'user', content: question }] })
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setEnhancedResponse(data.text);
    } catch (err: any) {
      setEnhancedResponse(`Error: ${err.message}`);
      setIsCheckingSafety(false);
    } finally {
      setIsLoadingEnhanced(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto flex flex-col gap-6">
      
      {/* Header Back Bar */}
      <header className="flex items-center justify-between border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <Link 
            href="/"
            className="px-3.5 py-1.5 bg-gray-800 hover:bg-gray-700/80 active:scale-95 text-gray-300 font-bold border border-gray-700 rounded-lg text-xs tracking-wider uppercase transition-all flex items-center gap-1.5 shadow-md"
          >
            <span>⬅</span> Patient Hub
          </Link>
          <div className="h-6 w-px bg-white/10 hidden sm:block"></div>
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 tracking-tight leading-none">
              Consultation Console
            </h1>
            <p className="text-[10px] text-gray-500 mt-1 hidden sm:block">
              Interactive drug safety validation & medical query engine
            </p>
          </div>
        </div>

        {/* Selected Patient Banner Badge */}
        <div className="flex items-center gap-2.5">
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono hidden md:block">Active Case:</span>
          <span className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded-full text-xs font-bold shadow-md truncate max-w-[200px]">
            👤 {patient.name}
          </span>
        </div>
      </header>

      {/* Main Core Consultation Section */}
      <div className="flex flex-col gap-6 mt-2">
        
        {/* Core Consultation Panel */}
        <div className="glass-panel p-6">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/5">
            <h3 className="font-bold text-gray-200 uppercase tracking-wide text-xs flex items-center gap-1.5">
              <span>💬 Drug Safety & Query Hub</span>
            </h3>
            <span className="text-[10px] text-indigo-400 font-semibold uppercase tracking-wider bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-500/10">
              CDSS Active Session
            </span>
          </div>

          {/* Preset Clinical Scenario Helper Card */}
          {activeScenario && (
            <div className="bg-indigo-600/5 border border-indigo-500/10 rounded-lg p-4 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-indigo-300">💡 Suggested Test Scenario:</span>
                  <span className="text-xs text-indigo-400 font-semibold">{activeScenario.title}</span>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed max-w-[500px]">
                  {activeScenario.explanation}
                </p>
              </div>
              <button
                onClick={applyScenario}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs font-bold rounded-lg transition-all shrink-0 shadow-lg shadow-indigo-950/20"
              >
                🧪 Load Scenario
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-5">
            
            {/* Proposed Drug */}
            <div className="md:col-span-4">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                Proposed Medication
              </label>
              <input
                type="text"
                className="w-full bg-black/40 border border-gray-700 rounded-lg p-3 text-sm text-gray-200 outline-none focus:border-blue-500 transition-colors placeholder:text-gray-600 font-medium"
                value={proposedDrug}
                onChange={(e) => setProposedDrug(e.target.value)}
                placeholder="e.g. Clarithromycin"
              />
            </div>

            {/* Inquiry Details */}
            <div className="md:col-span-8">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                Clinical Query / Inquiry
              </label>
              <textarea
                className="w-full bg-black/40 border border-gray-700 rounded-lg p-3 text-sm text-gray-200 outline-none focus:border-blue-500 transition-colors h-11 resize-none placeholder:text-gray-600 font-medium"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="e.g. Can I co-prescribe this antibiotic for pulmonary infection?"
              />
            </div>

          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={handleAskGeneric}
              disabled={isLoadingGeneric || !question}
              className="py-3 px-4 bg-gray-800 hover:bg-gray-700/80 active:scale-98 text-gray-300 font-semibold rounded-lg transition-all border border-gray-700 disabled:opacity-30 disabled:pointer-events-none text-xs tracking-wider uppercase flex items-center justify-center gap-2"
            >
              {isLoadingGeneric ? '⏳ Processing Request...' : '🤖 Execute Standard Query'}
            </button>

            <button
              onClick={handleAskEnhanced}
              disabled={isLoadingEnhanced || !question}
              className="py-3 px-4 bg-blue-600 hover:bg-blue-500 active:scale-98 text-white font-bold rounded-lg transition-all shadow-lg shadow-blue-500/25 disabled:opacity-30 disabled:pointer-events-none text-xs tracking-wider uppercase flex items-center justify-center gap-2"
            >
              {isLoadingEnhanced ? '⏳ Running Safety Validation...' : '🛡️ Execute Clinically-Guarded Query'}
            </button>
          </div>

        </div>

        {/* eGFR & Clinical Score Badges */}
        {safetyResult && (
          <div className="flex flex-wrap gap-4">
            {safetyResult.eGFR !== undefined && (
              <div className="glass-panel px-5 py-3.5 flex items-center gap-3 border-white/5">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-400"></div>
                <div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest">Calculated eGFR</div>
                  <div className={`font-mono font-bold text-base mt-0.5 ${safetyResult.eGFR < 30 ? 'text-red-400' : safetyResult.eGFR < 60 ? 'text-yellow-400' : 'text-green-400'}`}>
                    {safetyResult.eGFR} mL/min/1.73m²
                  </div>
                </div>
              </div>
            )}
            
            {safetyResult.cha2ds2Vasc !== undefined && (
              <div className="glass-panel px-5 py-3.5 flex items-center gap-3 border-white/5">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-400"></div>
                <div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest">CHA₂DS₂-VASc Score</div>
                  <div className={`font-mono font-bold text-base mt-0.5 ${safetyResult.cha2ds2Vasc >= 4 ? 'text-red-400' : safetyResult.cha2ds2Vasc >= 2 ? 'text-yellow-400' : 'text-green-400'}`}>
                    {safetyResult.cha2ds2Vasc}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Deterministic Guardrail Alert Box */}
        {(safetyResult || isCheckingSafety) && (
          <SafetyAlerts alerts={safetyResult?.alerts || []} isLoading={isCheckingSafety} />
        )}

        {/* Side-by-Side Response Displays */}
        <ResponseComparison
          genericResponse={genericResponse}
          enhancedResponse={enhancedResponse}
          isLoadingGeneric={isLoadingGeneric}
          isLoadingEnhanced={isLoadingEnhanced}
        />

        {/* AR Integration for Nervous System Reactions */}
        {(enhancedResponse || genericResponse) && (
          <div className="mt-8 border-t border-white/10 pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>🥽</span> AR Neurological Reactions
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  Visualize immediate systemic drug effects on the central nervous system in Augmented Reality.
                </p>
              </div>
              <button 
                onClick={() => setShowAR(!showAR)}
                className={`px-6 py-2.5 rounded-full font-bold transition-all shadow-lg ${showAR ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30' : 'bg-purple-600 text-white hover:bg-purple-500 shadow-purple-500/25'}`}
              >
                {showAR ? 'Hide AR Visualization' : 'Launch AR Visualization'}
              </button>
            </div>

            {showAR && (
              <div className="animate-fade-in-up">
                <MedicalARViewer 
                  modelSrc="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BrainStem/glTF-Binary/BrainStem.glb"
                  title="Serotonin Syndrome Reactions"
                  description="Interactive mapping of severe neurological symptoms across the brain stem and spinal pathways."
                  hotspots={[
                    {
                      id: "midbrain",
                      position: "0 0.05 0.02",
                      normal: "0 1 0",
                      title: "Midbrain & Thalamus",
                      description: "Cognitive Effects: Rapid onset of confusion, severe agitation, and delirium due to serotonin toxicity."
                    },
                    {
                      id: "medulla",
                      position: "0 -0.05 -0.03",
                      normal: "0 0 -1",
                      title: "Medulla Oblongata",
                      description: "Autonomic Instability: Tachycardia, dangerous blood pressure spikes, and hyperthermia."
                    },
                    {
                      id: "spinal",
                      position: "0 -0.15 -0.02",
                      normal: "0 -1 0",
                      title: "Spinal Cord Tracts",
                      description: "Neuromuscular Hyperactivity: Myoclonus (muscle twitching), hyperreflexia, and dangerous muscle rigidity."
                    }
                  ]}
                />
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default function ConsultationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-400">Loading Clinical Consultation Console...</div>}>
      <ConsultationContent />
    </Suspense>
  );
}
