import MedicalARViewer from '@/components/MedicalARViewer';
import Link from 'next/link';

export const metadata = {
  title: 'AR Medical Viewer - BRAHMO',
  description: 'Augmented Reality experience for anatomical visualization.',
};

export default function ARViewerPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-end border-b border-gray-700/50 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
            AR Anatomy Viewer
          </h1>
          <p className="text-gray-400 mt-2">
            Visualize anatomical structures in 3D and Augmented Reality to better understand clinical conditions.
          </p>
        </div>
        <Link 
          href="/"
          className="text-blue-400 hover:text-blue-300 font-medium transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Dashboard
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <MedicalARViewer 
          // Using a public medical sample model (BrainStem) from Khronos Group for demonstration
          modelSrc="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BrainStem/glTF-Binary/BrainStem.glb"
          title="Brain Stem & Nervous System"
          description="Interactive 3D model of the human brain stem. Use this to visualize neural pathways related to specific drug interactions."
        />
      </div>

      <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 mt-8">
        <h3 className="text-xl font-bold text-white mb-3">How to use your own 3D Models</h3>
        <p className="text-gray-400 mb-4">
          To display your own proprietary anatomical models (e.g., a human heart, kidney, or molecular drug structures):
        </p>
        <ol className="list-decimal list-inside text-gray-400 space-y-2 ml-4">
          <li>Export your 3D model as a <code className="bg-gray-900 px-2 py-1 rounded text-blue-300">.glb</code> file.</li>
          <li>Place the file in the <code className="bg-gray-900 px-2 py-1 rounded text-blue-300">public/models/</code> directory of this project.</li>
          <li>Update the <code className="bg-gray-900 px-2 py-1 rounded text-blue-300">modelSrc</code> prop in this page to point to your local file (e.g., <code className="bg-gray-900 px-2 py-1 rounded text-blue-300">/models/kidney.glb</code>).</li>
        </ol>
      </div>
    </div>
  );
}
