
import React, { useState } from 'react';
import { Prediction } from '../../types';

interface PredictionVerifierProps {
  prediction: Prediction;
  onComplete: (id: string, status: 'Verified' | 'Rejected', note: string) => void;
  onBack?: () => void;
}

const PredictionVerifier: React.FC<PredictionVerifierProps> = ({ prediction, onComplete, onBack }) => {
  const [note, setNote] = useState('');

  return (
    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-10 shadow-2xl border border-gray-100 dark:border-gray-800 w-full max-w-3xl flex flex-col items-center">
      {onBack && (
        <div className="w-full flex justify-start mb-8">
          <button 
            onClick={onBack}
            className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white flex items-center gap-2 bg-gray-100 dark:bg-gray-900 px-6 py-3 rounded-full transition-all border border-gray-200 dark:border-gray-800"
          >
            ← Back to Registry
          </button>
        </div>
      )}
      
      <div className="flex items-center gap-6 mb-10 w-full text-left">
        <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-4xl rounded-[2rem] flex items-center justify-center shrink-0">
          👤
        </div>
        <div className="flex flex-col items-start overflow-hidden">
          <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">Case Review</h2>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white truncate w-full">{prediction.patientName}</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">ID: #{prediction.id} • {prediction.location} • 28 years old</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-10 w-full">
        <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center">
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">AI Prediction</h3>
          <p className="text-2xl font-black text-gray-900 dark:text-white mb-2 leading-none">{prediction.diseaseName}</p>
          <div className="flex items-center gap-3 w-full">
            <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: `${prediction.confidence}%` }}></div>
            </div>
            <span className="text-xs font-bold text-blue-600">{prediction.confidence}%</span>
          </div>
        </div>

        <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border border-gray-100 dark:border-gray-800 flex flex-col items-center">
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Symptoms</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {prediction.symptoms.map(s => (
              <span key={s} className="px-3 py-1 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-[10px] font-black uppercase tracking-widest">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-10 w-full text-left">
        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">Clinical Notes & Assessment</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add final diagnosis notes..."
          className="w-full h-40 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-[2rem] border border-gray-100 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600/10 text-gray-700 dark:text-gray-200 leading-relaxed resize-none text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
        <button 
          onClick={() => onComplete(prediction.id, 'Rejected', note)}
          className="py-5 bg-white dark:bg-transparent border-2 border-red-100 dark:border-red-900/30 text-red-600 rounded-2xl font-black hover:bg-red-50 dark:hover:bg-red-900/10 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center"
        >
          Reject Case
        </button>
        <button 
          onClick={() => onComplete(prediction.id, 'Verified', note)}
          className="py-5 bg-gray-900 dark:bg-blue-600 text-white rounded-2xl font-black shadow-xl hover:scale-[1.01] transition-all uppercase tracking-widest text-[10px] flex items-center justify-center"
        >
          Verify & Save
        </button>
      </div>
    </div>
  );
};

export default PredictionVerifier;
