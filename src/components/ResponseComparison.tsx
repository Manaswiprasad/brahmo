"use client";

import ReactMarkdown from 'react-markdown';

interface ResponseComparisonProps {
  genericResponse: string;
  enhancedResponse: string;
  isLoadingGeneric: boolean;
  isLoadingEnhanced: boolean;
}

export default function ResponseComparison({ 
  genericResponse, 
  enhancedResponse, 
  isLoadingGeneric, 
  isLoadingEnhanced 
}: ResponseComparisonProps) {
  
  if (!genericResponse && !enhancedResponse && !isLoadingGeneric && !isLoadingEnhanced) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {/* Generic AI Column */}
      <div className="glass-panel overflow-hidden flex flex-col h-full border-gray-700">
        <div className="bg-gray-800/50 p-4 border-b border-gray-700">
          <h3 className="font-bold text-gray-300 flex items-center">
            <span className="mr-2 opacity-50">🤖</span> Standard LLM (No Safety Layer)
          </h3>
          <p className="text-xs text-gray-500 mt-1">Prompt: Patient Profile + Medical Query only</p>
        </div>
        <div className="p-6 flex-grow text-sm text-gray-300 leading-relaxed overflow-y-auto max-h-[600px] custom-markdown">
          {isLoadingGeneric ? (
            <div className="animate-pulse space-y-2">
              <div className="h-4 w-3/4 bg-gray-700 rounded"></div>
              <div className="h-4 w-full bg-gray-700 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-700 rounded"></div>
            </div>
          ) : genericResponse ? (
            <ReactMarkdown>{genericResponse}</ReactMarkdown>
          ) : (
            <span className="text-gray-600 italic">Console idle. Awaiting query execution...</span>
          )}
        </div>
      </div>

      {/* Enhanced AI Column */}
      <div className="glass-panel overflow-hidden flex flex-col h-full border-blue-900/30">
        <div className="bg-blue-900/20 p-4 border-b border-blue-800/30">
          <h3 className="font-bold text-blue-300 flex items-center">
            <span className="mr-2">🛡️</span> BRAHMO Enhanced AI (Clinically Guarded)
          </h3>
          <p className="text-xs text-blue-500/70 mt-1">Prompt: Deterministic Constraints + Patient Profile + Medical Query</p>
        </div>
        <div className="p-6 flex-grow text-sm text-blue-100 leading-relaxed overflow-y-auto max-h-[600px] custom-markdown">
          {isLoadingEnhanced ? (
            <div className="animate-pulse space-y-2">
              <div className="h-4 w-3/4 bg-blue-900/40 rounded"></div>
              <div className="h-4 w-full bg-blue-900/40 rounded"></div>
              <div className="h-4 w-5/6 bg-blue-900/40 rounded"></div>
            </div>
          ) : enhancedResponse ? (
            <ReactMarkdown>{enhancedResponse}</ReactMarkdown>
          ) : (
             <span className="text-blue-900/50 italic">Console idle. Awaiting safety-enhanced query...</span>
          )}
        </div>
      </div>
    </div>
  );
}
