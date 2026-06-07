"use client";

import React, { useEffect, useState } from 'react';

// Extend the JSX IntrinsicElements to include model-viewer
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src: string;
        iosSrc?: string;
        alt?: string;
        autoRotate?: boolean;
        cameraControls?: boolean;
        ar?: boolean;
        arModes?: string;
        shadowIntensity?: string;
        exposure?: string;
        environmentImage?: string;
        style?: React.CSSProperties;
      };
    }
  }
}

export interface ARHotspot {
  id: string;
  position: string;
  normal: string;
  title: string;
  description: string;
}

interface MedicalARViewerProps {
  modelSrc: string;
  title: string;
  description: string;
  hotspots?: ARHotspot[];
}

export default function MedicalARViewer({ modelSrc, title, description, hotspots }: MedicalARViewerProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
    // Import model-viewer only on the client side
    import('@google/model-viewer');
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-gray-900/50 rounded-xl border border-gray-700">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Loading AR Engine...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel overflow-hidden flex flex-col h-full border-blue-900/30">
      <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 p-5 border-b border-blue-800/30">
        <h3 className="font-bold text-blue-300 text-xl flex items-center">
          <span className="mr-3 text-2xl">🥽</span> {title}
        </h3>
        <p className="text-sm text-blue-200/70 mt-2">{description}</p>
      </div>
      
      <div className="p-6 flex-grow flex flex-col items-center justify-center relative bg-black/20">
        {/* AR Model Viewer */}
        <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-2xl relative border border-gray-800">
          {/* @ts-ignore - model-viewer is a custom element */}
          <model-viewer
            src={modelSrc}
            alt={`3D Model of ${title}`}
            auto-rotate
            camera-controls
            ar
            ar-modes="webxr scene-viewer quick-look"
            shadow-intensity="1"
            exposure="1"
            style={{ width: '100%', height: '100%', backgroundColor: '#0f111a' }}
          >
            {/* Interactive Hotspots */}
            {hotspots?.map((spot) => (
              <button
                key={spot.id}
                slot={`hotspot-${spot.id}`}
                data-position={spot.position}
                data-normal={spot.normal}
                className="absolute w-5 h-5 bg-red-500 rounded-full border-2 border-white shadow-[0_0_15px_rgba(239,68,68,0.9)] cursor-pointer group flex items-center justify-center transition-transform hover:scale-125 z-10"
                onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
              >
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                {/* Popover */}
                <div className={`absolute bottom-full mb-3 left-1/2 transform -translate-x-1/2 w-56 bg-gray-900/95 backdrop-blur-md border border-red-500/50 p-3 rounded-lg shadow-2xl transition-opacity pointer-events-none ${activeHotspot === spot.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                  <h5 className="text-red-400 text-xs font-bold mb-1 uppercase tracking-wider">{spot.title}</h5>
                  <p className="text-gray-200 text-[11px] leading-relaxed">{spot.description}</p>
                </div>
              </button>
            ))}

            {/* Custom AR Button */}
            <button
              slot="ar-button"
              className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)] transition-all transform hover:scale-105 flex items-center gap-2 z-20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              View in AR
            </button>
          </model-viewer>
        </div>

        <div className="mt-6 w-full max-w-2xl bg-gray-800/40 p-4 rounded-lg border border-gray-700/50">
          <h4 className="text-gray-300 font-semibold mb-2 flex items-center">
            <span className="mr-2">💡</span> AR Instructions
          </h4>
          <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
            <li><strong>Interaction:</strong> Hover or tap the glowing red hotspots to see the neurological drug effects.</li>
            <li><strong>Desktop:</strong> Click and drag to rotate. Scroll to zoom.</li>
            <li><strong>Mobile:</strong> Tap the "View in AR" button to place the model in your physical environment.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
