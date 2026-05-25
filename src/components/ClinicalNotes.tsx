"use client";

import React, { useState, useEffect } from 'react';
import { Patient, ClinicalNote, SafetyCheckResult } from '@/lib/types';

interface ClinicalNotesProps {
  patient: Patient;
  safetyResult: SafetyCheckResult | null;
  proposedDrug: string;
}

export default function ClinicalNotes({ patient, safetyResult, proposedDrug }: ClinicalNotesProps) {
  const [notes, setNotes] = useState<ClinicalNote[]>([]);
  const [noteText, setNoteText] = useState('');
  const [category, setCategory] = useState<'SOAP' | 'Prescription' | 'Progress' | 'Discharge'>('SOAP');
  const [author, setAuthor] = useState('Dr. Radhi, MD');

  // Load sample initial notes to make it look active on first render
  useEffect(() => {
    const initialNotes: ClinicalNote[] = [
      {
        id: '1',
        patientId: '1',
        timestamp: new Date(Date.now() - 24 * 3600 * 1000).toLocaleString(),
        author: 'Dr. Radhi, MD',
        category: 'SOAP',
        noteText: `[SUBJECTIVE]\nPatient Arthur Pendelton presents for routine follow-up of Type-2 Diabetes Mellitus. Complains of mild non-productive cough over last 2 days. No dyspnea.\n\n[OBJECTIVE]\nBP: 128/80 mmHg, HR: 74 bpm. Creatinine: 2.1 mg/dL, calculated eGFR: 31.2 mL/min.\n\n[ASSESSMENT]\n1. Diabetes Mellitus Type 2 - controlled.\n2. Chronic Kidney Disease (Stage 3b) - stable creatinine baseline.\n3. Suspected mild respiratory track irritation.\n\n[PLAN]\n- Metformin 500mg BD continued (caution - monitor eGFR closely).\n- Atorvastatin 20mg HS continued.\n- Recommend chest X-ray if cough persists. Avoid NSAIDs for pain control due to Stage 3b CKD.`
      },
      {
        id: '2',
        patientId: '7',
        timestamp: new Date(Date.now() - 4 * 3600 * 1000).toLocaleString(),
        author: 'Dr. Sarah Jenkins (ICU)',
        category: 'Progress',
        noteText: `[PROGRESS NOTE - ICU]\nElena Rostova is monitored under severe sepsis. High-dose vasopressor support active.\nRenal function is severely compromised. Serum Creatinine 3.2 mg/dL, eGFR 18 mL/min. Urine output < 0.5 mL/kg/h.\nActive antibiotics: Meropenem. Monitor lactic acid clearances.`
      }
    ];
    setNotes(initialNotes);
  }, []);

  const getSOAPTemplate = () => {
    return `[SUBJECTIVE]
Patient reports: 

[OBJECTIVE]
Vitals: HR ${patient.vitals?.HR || 'N/A'}, BP ${patient.vitals?.BP || 'N/A'}, SpO2 ${patient.vitals?.SpO2 || 'N/A'}
Labs: Creatinine ${patient.creatinine} mg/dL, eGFR ${patient.labs?.eGFR || 'N/A'}

[ASSESSMENT]
Active Diagnoses: ${patient.conditions.length > 0 ? patient.conditions.join(', ') : 'None documented'}
Safety Review: 

[PLAN]
Proposed Rx: 
Follow Up: `;
  };

  const getPrescriptionTemplate = () => {
    return `Rx:
1. 
2. 

Dispense Qty: 
Sig: `;
  };

  const getProgressTemplate = () => {
    return `[CLINICAL PROGRESS UPDATE]
Status: Stable / Improving / Guarded
Key Changes: 
Lab Trends: `;
  };

  const getDischargeTemplate = () => {
    return `[DISCHARGE SUMMARY]
Principal Diagnosis: 
Hospital Course Summary: 
Discharge Medications: 
Follow-up Instructions: `;
  };

  const applyTemplate = (selectedCategory: typeof category) => {
    setCategory(selectedCategory);
    let template = '';
    if (selectedCategory === 'SOAP') template = getSOAPTemplate();
    else if (selectedCategory === 'Prescription') template = getPrescriptionTemplate();
    else if (selectedCategory === 'Progress') template = getProgressTemplate();
    else if (selectedCategory === 'Discharge') template = getDischargeTemplate();
    setNoteText(template);
  };

  // Capture active safety engine logs and write directly into SOAP/Clinical note assessment!
  const captureSafetyConsole = () => {
    let captureText = `\n\n[🛡️ BRAHMO SAFETY AUTO-INTEGRATION - ${new Date().toLocaleTimeString()}]\n`;
    captureText += `- Tested Medication: ${proposedDrug || 'None proposed'}\n`;
    
    if (safetyResult) {
      if (safetyResult.eGFR !== undefined) captureText += `- Renal Index: eGFR = ${safetyResult.eGFR} mL/min\n`;
      if (safetyResult.cha2ds2Vasc !== undefined) captureText += `- Stroke Risk Score: CHA₂DS₂-VASc = ${safetyResult.cha2ds2Vasc}\n`;
      
      const alerts = safetyResult.alerts;
      if (alerts.length === 0) {
        captureText += `- Safety Status: ✅ 100% Passed. No interactions or renal constraints found.\n`;
      } else {
        captureText += `- Safety Warnings Captured:\n`;
        alerts.forEach((alert) => {
          captureText += `  * [${alert.level}] ${alert.message}\n`;
        });
      }
    } else {
      captureText += `- Safety Status: No safety validation executed in active session.\n`;
    }

    setNoteText(prev => prev + captureText);
  };

  const handleSave = () => {
    if (!noteText.trim()) return;

    const newNote: ClinicalNote = {
      id: `note-${Date.now()}`,
      patientId: patient.id,
      timestamp: new Date().toLocaleString(),
      author,
      category,
      noteText
    };

    setNotes(prev => [newNote, ...prev]);
    setNoteText('');
  };

  // Filter notes to only show the ones matching the active patient
  const activePatientNotes = notes.filter(n => n.patientId === patient.id);

  return (
    <div className="glass-panel p-6 border-indigo-500/20">
      <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5">
        <div>
          <h3 className="font-bold text-gray-200 uppercase tracking-wide text-xs flex items-center gap-2">
            <span>📝 Clinical EMR Note-Making Station</span>
          </h3>
          <p className="text-[10px] text-gray-400 mt-1">Compose and archive formatted consultation records & SOAP notes</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Sign-off As:</label>
          <select
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="bg-black/40 border border-gray-700 rounded px-2.5 py-1 text-xs text-indigo-300 font-semibold outline-none focus:border-indigo-500 transition-colors"
          >
            <option value="Dr. Radhi, MD" className="bg-gray-900">Dr. Radhi, MD (Resident)</option>
            <option value="Dr. Radhi, MD (Attending)" className="bg-gray-900">Dr. Radhi, MD (Attending)</option>
            <option value="Manaswi Prasad (Med Student)" className="bg-gray-900">Manaswi Prasad (Med Student)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Editor (Left 7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          
          {/* Note Type Selector Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-black/30 rounded-lg border border-white/5">
            {(['SOAP', 'Prescription', 'Progress', 'Discharge'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => applyTemplate(tab)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  category === tab
                    ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/30'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent'
                }`}
              >
                {tab === 'SOAP' ? '📋 SOAP Note' : tab === 'Prescription' ? '💊 Rx/Prescription' : tab === 'Progress' ? '📈 Progress Note' : '📤 Discharge'}
              </button>
            ))}
          </div>

          {/* Text Editor Area */}
          <div className="relative">
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Select a note template above or start drafting your clinical consultation notes..."
              className="w-full bg-black/40 border border-gray-700 rounded-lg p-4 text-xs font-mono text-gray-200 outline-none focus:border-indigo-500 transition-colors h-[320px] resize-none leading-relaxed"
            />
            
            {/* Quick Actions overlay */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <button
                onClick={captureSafetyConsole}
                className="px-2.5 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                title="Automatically capture and insert latest safety engine checking results into your note"
              >
                <span>🛡️</span> Capture Safety Engine
              </button>
            </div>
          </div>

          {/* Save Action */}
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-gray-500 italic">
              Note character count: {noteText.length}
            </span>
            <button
              onClick={handleSave}
              disabled={!noteText.trim()}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs font-bold rounded-lg transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-30 disabled:pointer-events-none"
            >
              💾 Save & Sign Clinical Note
            </button>
          </div>

        </div>

        {/* Saved Note Archives for Active Patient (Right 5 cols) */}
        <div className="lg:col-span-5 flex flex-col h-[420px]">
          <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center justify-between pb-1 border-b border-white/5">
            <span>📂 Case Records timeline</span>
            <span className="font-mono text-[10px] text-indigo-400 bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-900/30">
              {activePatientNotes.length} Saved Note{activePatientNotes.length !== 1 ? 's' : ''}
            </span>
          </h4>

          <div className="flex-grow overflow-y-auto space-y-4 pr-1 custom-scrollbar">
            {activePatientNotes.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center border border-dashed border-white/5 rounded-lg p-6 text-center">
                <span className="text-2xl opacity-30 mb-2">📂</span>
                <span className="text-[11px] text-gray-500">No clinical notes recorded for this patient case in active session.</span>
                <button
                  onClick={() => applyTemplate('SOAP')}
                  className="mt-3 text-[10px] text-indigo-400 font-bold hover:underline"
                >
                  Generate First SOAP template
                </button>
              </div>
            ) : (
              activePatientNotes.map((note) => (
                <div key={note.id} className="bg-black/20 border border-white/5 hover:border-white/10 rounded-lg p-4 transition-all">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase ${
                        note.category === 'SOAP' ? 'bg-indigo-500/20 text-indigo-300' :
                        note.category === 'Prescription' ? 'bg-emerald-500/20 text-emerald-300' :
                        note.category === 'Progress' ? 'bg-amber-500/20 text-amber-300' : 'bg-gray-800 text-gray-400'
                      }`}>
                        {note.category}
                      </span>
                      <span className="text-[10px] font-bold text-gray-300 truncate max-w-[120px]" title={note.author}>
                        {note.author}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-gray-500">{note.timestamp}</span>
                  </div>
                  <pre className="text-[10px] font-mono text-gray-400 whitespace-pre-wrap leading-relaxed max-h-[140px] overflow-y-auto custom-scrollbar">
                    {note.noteText}
                  </pre>
                  <div className="flex justify-end gap-3 border-t border-white/5 pt-2 mt-2">
                    <button
                      onClick={() => {
                        setNoteText(note.noteText);
                        setCategory(note.category);
                      }}
                      className="text-[9px] text-indigo-400 font-bold hover:underline"
                      title="Load this saved note back into the editor to edit or sign-off"
                    >
                      ✏️ Edit note
                    </button>
                    <button
                      onClick={() => setNotes(prev => prev.filter(n => n.id !== note.id))}
                      className="text-[9px] text-red-500 hover:text-red-400 font-bold"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
