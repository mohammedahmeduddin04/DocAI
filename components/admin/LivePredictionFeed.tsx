
import React, { useState, useEffect } from 'react';

interface LivePredictionFeedProps {
  onBack?: () => void;
}

const LivePredictionFeed: React.FC<LivePredictionFeedProps> = ({ onBack }) => {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    const mockData = [
      { id: 1, disease: 'Migraine', confidence: 92, location: 'Pune', time: 'Just now' },
      { id: 2, disease: 'Dengue Fever', confidence: 85, location: 'Mumbai', time: '2m ago' },
      { id: 3, disease: 'Common Cold', confidence: 98, location: 'Delhi', time: '5m ago' },
      { id: 4, disease: 'Hypertension', confidence: 89, location: 'Bangalore', time: '8m ago' },
      { id: 5, disease: 'Dengue Fever', confidence: 94, location: 'Mumbai', time: '12m ago' }
    ];
    setLogs(mockData);

    const interval = setInterval(() => {
      const diseases = ['Migraine', 'Flu', 'Cough', 'Dengue', 'Malaria'];
      const cities = ['Mumbai', 'Pune', 'Delhi', 'Kolkata'];
      const newLog = {
        id: Date.now(),
        disease: diseases[Math.floor(Math.random() * diseases.length)],
        confidence: 75 + Math.floor(Math.random() * 20),
        location: cities[Math.floor(Math.random() * cities.length)],
        time: 'Just now'
      };
      setLogs(prev => [newLog, ...prev.slice(0, 9)]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 h-full w-full flex flex-col">
      {onBack && (
        <div className="flex justify-start w-full mb-8">
          <button 
            onClick={onBack}
            className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-white dark:bg-gray-900 px-8 py-4 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center shadow-sm hover:text-gray-900 dark:hover:text-white transition-all active:scale-95"
          >
            ← Back To Dashboard
          </button>
        </div>
      )}
      
      <div className="mb-10 flex justify-between items-end">
        <div className="text-left">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Streaming</h2>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Live Prediction Feed</h1>
        </div>
        <div className="bg-gray-900 text-white px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest">
          {logs.length} Live Signals
        </div>
      </div>

      <div className="space-y-3">
        {logs.map((log, i) => (
          <div 
            key={log.id} 
            className={`p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center justify-between transition-all duration-1000 ${
              i === 0 ? 'animate-in slide-in-from-top-4 scale-[1.02] shadow-xl border-blue-200 dark:border-blue-800' : 'opacity-60 grayscale'
            }`}
          >
            <div className="flex items-center gap-5">
              <div className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-blue-500 animate-pulse' : 'bg-gray-300 dark:bg-gray-700'}`}></div>
              <div className="text-left">
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                  AI detected <span className="text-blue-600 dark:text-blue-400">{log.disease}</span>
                </h4>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Confidence: {log.confidence}% • Location: {log.location}</p>
              </div>
            </div>
            <span className="text-[10px] font-black text-gray-400">{log.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LivePredictionFeed;
