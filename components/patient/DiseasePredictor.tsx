
import React, { useState } from 'react';
import { SYMPTOMS_LIST, DISEASES } from '../../constants';
import { Prediction } from '../../types';
import { GoogleGenAI } from "@google/genai";

interface DiseasePredictorProps {
  patientId: string;
  patientName: string;
  onBack?: () => void;
  onTriage?: () => void;
}

const DiseasePredictor: React.FC<DiseasePredictorProps> = ({ patientId, patientName, onBack, onTriage }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [isGettingRationale, setIsGettingRationale] = useState(false);

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
    );
  };

  const handlePredict = () => {
    if (selectedSymptoms.length === 0) return;
    
    setIsPredicting(true);
    setTimeout(() => {
      const scores = DISEASES.map(d => {
        const matches = d.symptoms.filter(s => selectedSymptoms.includes(s.toLowerCase())).length;
        const confidence = d.symptoms.length > 0 ? (matches / d.symptoms.length) * 100 : 0;
        return { disease: d, confidence };
      }).sort((a, b) => b.confidence - a.confidence);

      const bestMatch = scores[0].confidence > 20 ? scores[0] : { disease: DISEASES[0], confidence: 15 };

      const result: Prediction = {
        id: Math.random().toString(36).substr(2, 9),
        patientId,
        patientName,
        diseaseName: bestMatch.disease.name,
        confidence: Math.round(bestMatch.confidence),
        symptoms: selectedSymptoms,
        location: 'Hyderabad, Telangana',
        timestamp: Date.now(),
        status: 'Pending',
        severity: bestMatch.disease.severity,
        specialty: bestMatch.disease.specialty
      };

      const existing = JSON.parse(localStorage.getItem('docai_predictions') || '[]');
      localStorage.setItem('docai_predictions', JSON.stringify([result, ...existing]));

      setPrediction(result);
      setIsPredicting(false);
    }, 2000);
  };

  const getClinicalRationale = async () => {
    if (!prediction) return;
    setIsGettingRationale(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `As a high-level clinical assistant, provide a concise clinical rationale for a patient diagnosed by a preliminary AI with ${prediction.diseaseName} based on symptoms: ${prediction.symptoms.join(', ')}. 
      Include:
      1. Pathophysiology (how the symptoms relate to the disease).
      2. 3 Differential Diagnoses to rule out.
      3. 2 critical questions the patient should ask their doctor.
      Keep it professional, formatted for a mobile screen, and use Markdown bullet points.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      const updated = { ...prediction, clinicalRationale: response.text || "Diagnostic rationale generated successfully." };
      setPrediction(updated);
    } catch (e) {
      console.error("Gemini API Error:", e);
      alert("Clinical Reasoning Engine is temporarily unavailable. Check your network or API connection.");
    } finally {
      setIsGettingRationale(false);
    }
  };

  const getSeverityBadge = (sev: string) => {
    switch(sev) {
      case 'Critical': return 'bg-red-500 text-white';
      case 'High': return 'bg-orange-500 text-white';
      case 'Medium': return 'bg-yellow-500 text-gray-900';
      default: return 'bg-green-500 text-white';
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-12 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center text-center w-full min-h-[500px]">
      {!prediction ? (
        <div className="space-y-10 w-full flex flex-col items-center">
          <div className="flex flex-col items-center mb-4">
             <div className="text-ios-blue mb-4">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
             </div>
             <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">Initiate Scan</h2>
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-2">AI Diagnostic Node Active</p>
          </div>

          <div className="w-full">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500 mb-8">Manifested Indicators</p>
            <div className="flex flex-wrap gap-2.5 justify-center max-w-2xl mx-auto">
              {SYMPTOMS_LIST.map(symptom => (
                <button
                  key={symptom}
                  onClick={() => toggleSymptom(symptom)}
                  className={`px-5 py-3 rounded-2xl text-[9px] font-black uppercase tracking-relative transition-all flex items-center justify-center border ${
                    selectedSymptoms.includes(symptom)
                      ? 'bg-gray-900 dark:bg-ios-blue text-white border-transparent shadow-lg scale-105'
                      : 'bg-transparent text-gray-400 dark:text-gray-500 border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}
                >
                  {symptom}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handlePredict}
            disabled={selectedSymptoms.length === 0 || isPredicting}
            className={`w-full max-w-md py-6 rounded-3xl font-black uppercase tracking-[0.3em] text-[10px] transition-all flex items-center justify-center ${
              selectedSymptoms.length > 0 && !isPredicting
                ? 'bg-ios-blue text-white shadow-xl active:scale-95'
                : 'bg-gray-100 dark:bg-white/5 text-gray-300 dark:text-gray-600 cursor-not-allowed'
            }`}
          >
            {isPredicting ? (
              <div className="flex items-center gap-3">
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing Network...
              </div>
            ) : 'Synchronize Analysis'}
          </button>
        </div>
      ) : (
        <div className="animate-in slide-in-from-bottom duration-500 w-full max-w-2xl flex flex-col items-center">
          <div className="mb-10 p-12 bg-gray-50 dark:bg-white/5 rounded-[3.5rem] border border-black/5 dark:border-white/5 w-full flex flex-col items-center justify-center text-center">
            <div className="flex justify-between items-center w-full mb-10">
              <span className="text-ios-blue text-[9px] font-black uppercase tracking-[0.4em]">Prediction Result</span>
              <span className={`text-[9px] px-3 py-1 rounded-full font-black uppercase tracking-widest ${getSeverityBadge(prediction.severity)}`}>{prediction.severity} RISK</span>
            </div>
            <h3 className="text-5xl font-black text-gray-900 dark:text-white mb-8 tracking-tighter leading-none">{prediction.diseaseName}</h3>
            
            <div className="w-full flex flex-col items-center gap-4">
              <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden max-w-md">
                <div className="h-full bg-ios-blue rounded-full transition-all duration-1000" style={{ width: `${prediction.confidence}%` }}></div>
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">{prediction.confidence}% Confidence Match</p>
            </div>
          </div>

          {prediction.clinicalRationale ? (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 w-full bg-blue-50/50 dark:bg-blue-900/10 p-10 rounded-[2.5rem] border border-blue-100 dark:border-blue-900/30 text-left mb-8">
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-8 h-8 bg-ios-blue rounded-lg flex items-center justify-center text-white text-xs font-black">AI</div>
                 <h4 className="text-xs font-black text-ios-blue uppercase tracking-widest">Clinical Rationale Briefing</h4>
               </div>
               <div className="text-[13px] text-gray-700 dark:text-gray-300 leading-relaxed space-y-4 prose dark:prose-invert">
                 {prediction.clinicalRationale.split('\n').map((line, i) => (
                   <p key={i} className={line.startsWith('*') ? 'pl-4 font-semibold' : ''}>{line}</p>
                 ))}
               </div>
            </div>
          ) : (
            <button 
              onClick={getClinicalRationale}
              disabled={isGettingRationale}
              className="w-full mb-8 py-5 bg-white dark:bg-gray-800 border-2 border-ios-blue text-ios-blue rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
            >
              {isGettingRationale ? (
                <svg className="animate-spin h-4 w-4 text-ios-blue" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : <span className="text-xl">🔬</span>}
              Deep-Dive Clinical Reasoning
            </button>
          )}

          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="p-8 bg-white dark:bg-gray-900 rounded-ios-xl border border-black/5 flex flex-col items-center justify-center">
              <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-4">Recommended Domain</p>
              <p className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{prediction.specialty}</p>
            </div>
            <div className="p-8 bg-white dark:bg-gray-900 rounded-ios-xl border border-ios-orange/10 flex flex-col items-center justify-center">
              <p className="text-[9px] font-black uppercase tracking-widest text-ios-orange mb-4">Protocol Step</p>
              <p className="text-[10px] font-black text-ios-orange uppercase tracking-widest leading-relaxed">Book Specialist Consultation</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-12 w-full">
            <button 
              onClick={() => { setPrediction(null); setSelectedSymptoms([]); }}
              className="py-5 bg-gray-50 dark:bg-white/5 text-gray-400 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all active:scale-95"
            >
              Re-Scan Indicators
            </button>
            <button 
              onClick={onTriage}
              className="py-5 bg-gray-900 dark:bg-ios-blue text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg active:scale-95 transition-all"
            >
              Initiate Triage
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiseasePredictor;
