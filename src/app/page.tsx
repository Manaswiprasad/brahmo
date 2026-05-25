"use client";

import React, { useState, useEffect } from 'react';
import { PATIENTS } from '@/lib/patients';
import { Patient, SafetyCheckResult } from '@/lib/types';
import PatientCard from '@/components/PatientCard';
import SafetyAlerts from '@/components/SafetyAlerts';
import ResponseComparison from '@/components/ResponseComparison';
import CustomPatientForm from '@/components/CustomPatientForm';

export default function Home() {
  const [allPatients, setAllPatients] = useState<Patient[]>(PATIENTS);
  const [selectedPatientId, setSelectedPatientId] = useState<string>(PATIENTS[0].id);
  const [question, setQuestion] = useState<string>('');
  const [proposedDrug, setProposedDrug] = useState<string>('');

  const [safetyResult, setSafetyResult] = useState<SafetyCheckResult | null>(null);
  const [isCheckingSafety, setIsCheckingSafety] = useState(false);

  const [genericResponse, setGenericResponse] = useState('');
  const [enhancedResponse, setEnhancedResponse] = useState('');
  const [isLoadingGeneric, setIsLoadingGeneric] = useState(false);
  const [isLoadingEnhanced, setIsLoadingEnhanced] = useState(false);

  const patient = allPatients.find(p => p.id === selectedPatientId) || allPatients[0];

  useEffect(() => {
    setGenericResponse('');
    setEnhancedResponse('');
    setSafetyResult(null);
    setQuestion('');
    setProposedDrug('');

    if (patient.id === "1") {
      setQuestion("Can I add Clarithromycin 500mg for pneumonia?");
      setProposedDrug("Clarithromycin");
    } else if (patient.id === "3") {
      setQuestion("UTI treatment — can I use Amoxicillin-Clavulanate?");
      setProposedDrug("Amoxicillin-Clavulanate");
    } else if (patient.id === "7") {
      setQuestion("Adding Gabapentin 300mg TDS for neuropathic pain");
      setProposedDrug("Gabapentin");
    } else if (patient.id === "8") {
      setQuestion("Does this patient still need anticoagulation?");
      setProposedDrug("Warfarin");
    }
  }, [patient.id]);

  const handleAddCustomPatient = (newPatient: Patient) => {
    setAllPatients(prev => [...prev, newPatient]);
    setSelectedPatientId(newPatient.id);
  };

  const handleAskGeneric = async () => {
    if (!question) return;
    setIsLoadingGeneric(true);
    setGenericResponse('');

    try {
      const systemPrompt = `You are a helpful clinical AI assistant. You are consulting on the following patient:\n${patient.summary}\n\nPlease answer the doctor's question.`;
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

      const systemPrompt = `${safetyData.constraintText}\n\nYou are a helpful clinical AI assistant. Patient info:\n${patient.summary}\n\nAdhere strictly to safety constraints above.`;

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
    <main className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 tracking-tight">
            🛡️ BRAHMO
          </h1>
          <p className="text-gray-400 mt-1 text-sm">Deterministic Drug Safety Engine — Make AI Safe for Doctors</p>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-400 hidden md:block">Patient:</label>
          <select
            className="bg-gray-800/80 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-blue-500 transition-colors max-w-[200px]"
            value={selectedPatientId}
            onChange={(e) => setSelectedPatientId(e.target.value)}
          >
            {allPatients.map(p => (
              <option key={p.id} value={p.id}>{p.name} — {p.age}{p.sex}</option>
            ))}
          </select>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar */}
        <div className="lg:col-span-4">
          <PatientCard patient={patient} />

          <div className="glass-panel p-5 mt-4">
            <h3 className="font-bold mb-4 text-gray-200 uppercase tracking-wide text-xs">Consultation</h3>

            <div className="mb-3">
              <label className="block text-xs text-gray-400 mb-1">Doctor&apos;s Question</label>
              <textarea
                className="w-full bg-black/30 border border-gray-700 rounded-lg p-3 text-sm text-gray-200 outline-none focus:border-blue-500 transition-colors h-24 resize-none"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="e.g. Can I add Clarithromycin 500mg for pneumonia?"
              />
            </div>

            <div className="mb-5">
              <label className="block text-xs text-gray-400 mb-1">Proposed Drug (for Safety Engine)</label>
              <input
                type="text"
                className="w-full bg-black/30 border border-gray-700 rounded-lg p-3 text-sm text-gray-200 outline-none focus:border-blue-500 transition-colors"
                value={proposedDrug}
                onChange={(e) => setProposedDrug(e.target.value)}
                placeholder="e.g. Clarithromycin"
              />
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleAskGeneric}
                disabled={isLoadingGeneric || !question}
                className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium rounded-lg transition-colors border border-gray-600 disabled:opacity-50 text-sm"
              >
                {isLoadingGeneric ? '⏳ Processing...' : '🤖 Ask Generic AI'}
              </button>

              <button
                onClick={handleAskEnhanced}
                disabled={isLoadingEnhanced || !question}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-blue-500/25 disabled:opacity-50 text-sm flex items-center justify-center gap-2"
              >
                {isLoadingEnhanced ? '⏳ Running Safety Checks...' : '🛡️ Ask Safety-Enhanced AI'}
              </button>
            </div>

            {/* Custom Patient Form */}
            <CustomPatientForm onAddPatient={handleAddCustomPatient} />
          </div>
        </div>

        {/* Right Panel */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* eGFR + Score badges */}
          {safetyResult && (
            <div className="flex flex-wrap gap-3">
              {safetyResult.eGFR !== undefined && (
                <div className="glass-panel px-4 py-3 flex items-center gap-2">
                  <span className="text-xs text-gray-400 uppercase tracking-wide">Calculated eGFR</span>
                  <span className={`font-bold text-lg ${safetyResult.eGFR < 30 ? 'text-red-400' : safetyResult.eGFR < 60 ? 'text-yellow-400' : 'text-green-400'}`}>
                    {safetyResult.eGFR} mL/min
                  </span>
                </div>
              )}
              {safetyResult.cha2ds2Vasc !== undefined && (
                <div className="glass-panel px-4 py-3 flex items-center gap-2">
                  <span className="text-xs text-gray-400 uppercase tracking-wide">CHA₂DS₂-VASc</span>
                  <span className={`font-bold text-lg ${safetyResult.cha2ds2Vasc >= 4 ? 'text-red-400' : safetyResult.cha2ds2Vasc >= 2 ? 'text-yellow-400' : 'text-green-400'}`}>
                    {safetyResult.cha2ds2Vasc}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Safety Alerts */}
          {(safetyResult || isCheckingSafety) && (
            <SafetyAlerts alerts={safetyResult?.alerts || []} isLoading={isCheckingSafety} />
          )}

          {/* Side-by-side AI responses */}
          <ResponseComparison
            genericResponse={genericResponse}
            enhancedResponse={enhancedResponse}
            isLoadingGeneric={isLoadingGeneric}
            isLoadingEnhanced={isLoadingEnhanced}
          />
        </div>
      </div>
    </main>
  );
}
