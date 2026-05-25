"use client";

import React, { useState } from 'react';
import { Patient } from '@/lib/types';

interface CustomPatientFormProps {
  onAddPatient: (patient: Patient) => void;
}

export default function CustomPatientForm({ onAddPatient }: CustomPatientFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    age: '',
    sex: 'M',
    medications: '',
    allergies: '',
    creatinine: '',
    conditions: '',
    egfr: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.age) return;

    const newPatient: Patient = {
      id: `custom-${Date.now()}`,
      name: form.name,
      age: parseInt(form.age),
      sex: form.sex as 'M' | 'F',
      medications: form.medications.split(',').map(m => m.trim().toLowerCase()).filter(Boolean),
      allergies: form.allergies.split(',').map(a => a.trim()).filter(Boolean) || ['NKDA'],
      creatinine: parseFloat(form.creatinine) || 1.0,
      conditions: form.conditions.split(',').map(c => c.trim()).filter(Boolean),
      labs: form.egfr ? { eGFR: parseFloat(form.egfr) } : {},
      summary: `${form.age}${form.sex} | Meds: ${form.medications} | Allergies: ${form.allergies || 'NKDA'} | Cr ${form.creatinine || 'N/A'}, eGFR ${form.egfr || 'N/A'}`
    };

    onAddPatient(newPatient);
    setIsOpen(false);
    setForm({ name: '', age: '', sex: 'M', medications: '', allergies: '', creatinine: '', conditions: '', egfr: '' });
  };

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-3 px-4 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 font-semibold rounded-lg transition-all border border-indigo-500/30 text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-950/20"
      >
        <span>{isOpen ? '❌' : '➕'}</span>
        <span>{isOpen ? 'Cancel Intake' : 'Intake New Patient Profile'}</span>
      </button>

      {isOpen && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4 glass-panel p-5 border-indigo-500/20">
          <h3 className="font-bold text-indigo-300 text-sm uppercase tracking-wide flex items-center gap-2 border-b border-indigo-500/10 pb-2">
            👤 New Intake Profile
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Patient Name *</label>
              <input
                required
                type="text"
                placeholder="e.g. Arthur Pendelton"
                className="w-full bg-black/40 border border-gray-700 rounded-lg p-2.5 text-sm text-gray-200 outline-none focus:border-indigo-500 transition-colors"
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Age *</label>
              <input
                required
                type="number"
                placeholder="e.g. 65"
                className="w-full bg-black/40 border border-gray-700 rounded-lg p-2.5 text-sm text-gray-200 outline-none focus:border-indigo-500 transition-colors"
                value={form.age}
                onChange={e => setForm({...form, age: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Sex</label>
              <select
                className="w-full bg-black/40 border border-gray-700 rounded-lg p-2.5 text-sm text-gray-200 outline-none focus:border-indigo-500 transition-colors"
                value={form.sex}
                onChange={e => setForm({...form, sex: e.target.value})}
              >
                <option value="M" className="bg-gray-900">Male</option>
                <option value="F" className="bg-gray-900">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Creatinine (mg/dL)</label>
              <input
                type="number"
                step="0.1"
                placeholder="e.g. 1.2"
                className="w-full bg-black/40 border border-gray-700 rounded-lg p-2.5 text-sm text-gray-200 outline-none focus:border-indigo-500 transition-colors"
                value={form.creatinine}
                onChange={e => setForm({...form, creatinine: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">eGFR (mL/min)</label>
            <input
              type="number"
              step="0.1"
              placeholder="Leave blank to auto-calculate via CKD-EPI"
              className="w-full bg-black/40 border border-gray-700 rounded-lg p-2.5 text-sm text-gray-200 outline-none focus:border-indigo-500 transition-colors"
              value={form.egfr}
              onChange={e => setForm({...form, egfr: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Current Medications (comma-separated)</label>
            <textarea
              placeholder="e.g. Metformin, Atorvastatin, Telmisartan"
              className="w-full bg-black/40 border border-gray-700 rounded-lg p-2.5 text-sm text-gray-200 outline-none focus:border-indigo-500 transition-colors h-16 resize-none"
              value={form.medications}
              onChange={e => setForm({...form, medications: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Allergies (comma-separated)</label>
            <input
              type="text"
              placeholder="e.g. Penicillin (anaphylaxis), Sulfonamide (rash)"
              className="w-full bg-black/40 border border-gray-700 rounded-lg p-2.5 text-sm text-gray-200 outline-none focus:border-indigo-500 transition-colors"
              value={form.allergies}
              onChange={e => setForm({...form, allergies: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Co-existing Conditions (comma-separated)</label>
            <input
              type="text"
              placeholder="e.g. AF, CHF, T2DM, HTN"
              className="w-full bg-black/40 border border-gray-700 rounded-lg p-2.5 text-sm text-gray-200 outline-none focus:border-indigo-500 transition-colors"
              value={form.conditions}
              onChange={e => setForm({...form, conditions: e.target.value})}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-all shadow-lg shadow-indigo-500/20 text-sm"
          >
            ✅ Initialize Intake Profile
          </button>
        </form>
      )}
    </div>
  );
}
