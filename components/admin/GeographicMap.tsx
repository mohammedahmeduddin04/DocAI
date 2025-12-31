
import React, { useState } from 'react';
import { CITIES } from '../../constants';
import { CityData } from '../../types';

interface GeographicMapProps {
  onBack?: () => void;
}

interface DeploymentReport {
  situationSummary: string;
  manpower: { type: string; count: string }[];
  financialBudget: string;
  primaryExpense: string;
  tacticalSteps: string[];
  successProbability: number;
}

const GeographicMap: React.FC<GeographicMapProps> = ({ onBack }) => {
  const [selectedCity, setSelectedCity] = useState<CityData | null>(CITIES[0]);
  const [isDeploying, setIsDeploying] = useState(false);
  const [report, setReport] = useState<DeploymentReport | null>(null);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Critical': return 'bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.6)]';
      case 'High': return 'bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]';
      case 'Medium': return 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.4)]';
      default: return 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]';
    }
  };

  const generateLocalReport = (city: CityData): DeploymentReport => {
    const isCritical = city.risk === 'Critical';
    const isHigh = city.risk === 'High';
    
    // Calculate values based on city stats
    const baseBudget = isCritical ? 250 : isHigh ? 120 : 45;
    const successProb = Math.max(45, 100 - (city.healthcareLoad * 0.4) - (isCritical ? 15 : 5));
    
    return {
      situationSummary: `A strategic emergency has been declared in ${city.name} due to a ${city.risk.toLowerCase()} risk ${city.hazardType}. Population density in high-risk zones reaches ${city.popAtRisk}. Healthcare infrastructure is currently at ${city.healthcareLoad}% capacity.`,
      manpower: [
        { type: 'Critical Care Doctors', count: isCritical ? '45 Units' : '15 Units' },
        { type: 'Emergency Paramedics', count: isCritical ? '120 Units' : '40 Units' },
        { type: 'Bio-Containment Logistics', count: '200 personnel' },
        { type: 'Field Security & Cordoning', count: '15 Units' }
      ],
      financialBudget: `₹ ${baseBudget} Crores`,
      primaryExpense: isCritical ? 'Advanced Bio-Safe Modular Hospitals & Oxygen Logistics' : 'Mobile Testing Kits & Public Vaccination Drive',
      tacticalSteps: [
        'Establish Level 4 bio-containment perimeter around zero-point.',
        'Synchronize local private hospitals with the DocAI National Grid.',
        'Deploy mobile pharmaceutical dispensaries to high-density clusters.',
        'Initiate real-time symptom tracking for 100% of the at-risk population.'
      ],
      successProbability: Math.floor(successProb)
    };
  };

  const handleDeploy = () => {
    if (!selectedCity) return;
    setIsDeploying(true);
    setReport(null);

    // Simulate sophisticated calculation delay
    setTimeout(() => {
      const data = generateLocalReport(selectedCity);
      setReport(data);
      setIsDeploying(false);
    }, 1500);
  };

  return (
    <div className="animate-in fade-in duration-700 flex flex-col h-full gap-6 relative">
      {onBack && (
        <div className="flex justify-start w-full">
          <button 
            onClick={onBack}
            className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-white dark:bg-gray-900 px-8 py-4 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center shadow-sm hover:text-gray-900 dark:hover:text-white transition-all active:scale-95"
          >
            ← Back To Dashboard
          </button>
        </div>
      )}
      
      <div className="flex justify-between items-center bg-gray-900 text-white p-6 rounded-[2.5rem] border border-white/5 shadow-2xl">
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 bg-red-600/20 rounded-2xl flex items-center justify-center border border-red-500/30 shrink-0">
            <span className="animate-pulse text-2xl">📡</span>
          </div>
          <div className="flex flex-col items-start text-left">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 leading-none">Live Surveillance Node</h2>
            <h1 className="text-2xl font-black tracking-tighter mt-1">Geo-Hazard Command Center</h1>
          </div>
        </div>
        <div className="flex items-center gap-8 shrink-0">
          <div className="text-center">
            <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Active Alerts</p>
            <p className="text-xl font-black text-red-500">03</p>
          </div>
          <div className="h-8 w-[1px] bg-white/10"></div>
          <div className="text-center">
            <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">System Health</p>
            <p className="text-xl font-black text-green-500">98.2%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 flex-1 min-h-[600px]">
        {/* HIGH FIDELITY INDIA MAP */}
        <div className="col-span-8 bg-gray-950 rounded-[3.5rem] border border-white/10 shadow-inner relative overflow-hidden flex items-center justify-center group/map">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:50px_50px]"></div>
          </div>

          <div className="relative w-full h-full flex items-center justify-center p-12">
            {/* Highly Accurate India Map Outline SVG */}
            <svg viewBox="0 0 800 900" className="w-full h-full max-h-[550px] opacity-20 hover:opacity-30 transition-opacity fill-white/5 stroke-white/40 stroke-[1.5]">
               <path d="M380,50 L410,65 L430,60 L445,80 L470,75 L485,95 L510,88 L530,105 L528,135 L555,160 L548,190 L570,210 L563,240 L582,265 L575,295 L590,315 L578,340 L560,365 L530,360 L515,385 L485,378 L468,402 L440,395 L425,420 L395,413 L378,437 L350,430 L332,455 L305,448 L288,472 L260,465 L232,490 L215,472 L185,498 L168,478 L140,495 L132,465 L105,448 L118,420 L90,402 L105,375 L78,358 L95,330 L68,312 L85,285 L58,268 L75,240 L48,222 L65,195 L38,178 L55,150 L28,135 L45,108 L18,90 L35,65 L60,82 L88,65 L115,82 L142,65 L170,82 L198,65 L225,82 L252,65 L280,82 L308,65 L335,82 L362,65 L380,50 Z" transform="scale(1.1) translate(40, 50)" />
               <path d="M410,120 L450,150 L430,190 L480,220 L450,270 L500,320 L460,370 L520,420 L490,520 L440,620 L410,820 L370,920 L330,820 L280,620 L230,520 L180,420 L240,370 L200,270 L250,220 L210,190 L260,150 L310,190 L360,150 Z" className="fill-blue-500/5 stroke-blue-500/20 stroke-[1]" transform="scale(0.95) translate(40, 0)" />
            </svg>

            {CITIES.map((city) => (
              <button
                key={city.name}
                onClick={() => { setSelectedCity(city); setReport(null); }}
                className={`absolute group z-20 transition-all duration-700 flex items-center justify-center ${selectedCity?.name === city.name ? 'scale-150' : 'hover:scale-125'}`}
                style={{ 
                  left: `${((city.lng - 68) / (97 - 68)) * 100}%`, 
                  bottom: `${((city.lat - 8) / (37 - 8)) * 100}%` 
                }}
              >
                <div className="relative flex items-center justify-center w-8 h-8">
                  <div className={`w-12 h-12 rounded-full ${getRiskColor(city.risk)} opacity-30 animate-ping absolute`}></div>
                  <div className={`w-4 h-4 rounded-full ${getRiskColor(city.risk)} border-2 border-white relative z-30 shadow-[0_0_10px_white]`}></div>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/90 text-white text-[9px] font-black px-3 py-1 rounded border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-widest pointer-events-none">
                    {city.name}
                  </div>
                </div>
              </button>
            ))}

            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent h-40 w-full animate-[scan_8s_linear_infinite] pointer-events-none"></div>
          </div>

          <div className="absolute bottom-8 left-8 flex flex-col items-start bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Status Report</p>
            <p className="text-[10px] font-mono text-blue-400 uppercase tracking-tight">Geo-Ref: IND-GRID-V4</p>
          </div>
        </div>

        <div className="col-span-4 flex flex-col gap-6">
          <div className="bg-gray-900 p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden flex-1 border border-white/5 flex flex-col items-center justify-center">
            {selectedCity ? (
              <div className="animate-in slide-in-from-right duration-500 flex flex-col h-full w-full text-center items-center justify-between">
                <div className="mb-8 flex flex-col items-center">
                  <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em] mb-4 flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span> Threat Analysis
                  </p>
                  <h3 className="text-5xl font-black tracking-tighter leading-none">{selectedCity.name}</h3>
                  <div className="mt-6 px-6 py-2 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{selectedCity.hazardType}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full mb-10">
                  <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5 flex flex-col items-center justify-center">
                    <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest mb-2">Severity</p>
                    <p className={`text-xl font-black uppercase italic ${selectedCity.risk === 'Critical' ? 'text-red-500' : 'text-orange-500'}`}>
                      {selectedCity.risk}
                    </p>
                  </div>
                  <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5 flex flex-col items-center justify-center">
                    <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest mb-2">Trend</p>
                    <p className="text-xl font-black text-blue-400">{selectedCity.projectedGrowth}</p>
                  </div>
                </div>

                <div className="space-y-8 w-full">
                  <div className="w-full">
                    <div className="flex justify-between items-end mb-3">
                       <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Healthcare Load</p>
                       <p className="text-sm font-black">{selectedCity.healthcareLoad}%</p>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full transition-all duration-1000 ${selectedCity.healthcareLoad > 80 ? 'bg-red-600' : 'bg-blue-600'}`} style={{ width: `${selectedCity.healthcareLoad}%` }}></div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleDeploy}
                  disabled={isDeploying}
                  className="w-full mt-10 py-5 bg-white text-black font-black uppercase text-xs tracking-[0.3em] rounded-[1.5rem] shadow-2xl hover:bg-gray-100 transition-all active:scale-95 flex items-center justify-center gap-3"
                >
                  {isDeploying ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-black" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Synthesizing Assets...
                    </>
                  ) : "Deploy Assets"}
                </button>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 opacity-30">
                <p className="text-[11px] font-black uppercase tracking-[0.3em]">Satellite Link Active</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* STRATEGIC DEPLOYMENT REPORT OVERLAY (Now Local, No Gemini Error) */}
      {report && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 glass bg-black/60 animate-in fade-in duration-500">
           <div className="bg-white dark:bg-ios-grey-dark w-full max-w-2xl rounded-ios-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 border border-black/10 flex flex-col max-h-[90vh]">
              <div className="p-10 bg-ios-blue text-white flex justify-between items-center shrink-0">
                 <div className="text-left">
                    <h2 className="text-3xl font-black tracking-tighter uppercase">Deployment Report</h2>
                    <p className="text-[10px] font-black opacity-60 uppercase tracking-[0.3em] mt-1">Operational Node: {selectedCity?.name}</p>
                 </div>
                 <button onClick={() => setReport(null)} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-black">✕</button>
              </div>

              <div className="flex-1 overflow-y-auto p-10 space-y-10 text-left">
                 <div className="p-6 bg-ios-grey dark:bg-black/20 rounded-2xl border-l-8 border-ios-blue">
                    <p className="text-[10px] font-black text-ios-blue uppercase tracking-widest mb-2">Situation Summary</p>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-relaxed italic">"{report.situationSummary}"</p>
                 </div>

                 <div className="grid grid-cols-2 gap-8">
                    <div>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Required Manpower</p>
                       <div className="space-y-2">
                          {report.manpower.map((m, i) => (
                            <div key={i} className="flex justify-between items-center p-3 bg-ios-grey dark:bg-white/5 rounded-xl">
                               <span className="text-[11px] font-bold dark:text-white uppercase">{m.type}</span>
                               <span className="text-xs font-black text-ios-blue">{m.count}</span>
                            </div>
                          ))}
                       </div>
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Emergency Budgeting</p>
                       <div className="p-6 bg-green-50 dark:bg-green-900/10 rounded-2xl border border-green-100 dark:border-green-900/30">
                          <p className="text-[9px] font-black text-green-600 uppercase tracking-widest mb-2">Total Estimates</p>
                          <p className="text-2xl font-black text-green-600 tracking-tighter">{report.financialBudget}</p>
                          <p className="text-[10px] text-gray-500 mt-2 font-medium leading-tight">Primary: {report.primaryExpense}</p>
                       </div>
                    </div>
                 </div>

                 <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Operational Protocol</p>
                    <div className="space-y-3">
                       {report.tacticalSteps.map((step, i) => (
                         <div key={i} className="flex gap-4 items-start bg-gray-50 dark:bg-white/5 p-4 rounded-xl">
                            <span className="w-6 h-6 rounded-full bg-gray-900 dark:bg-white dark:text-black text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">{i+1}</span>
                            <p className="text-sm font-bold dark:text-white leading-snug">{step}</p>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="pt-10 border-t border-black/5 flex flex-col items-center">
                    <p className="text-[10px] font-black text-ios-orange uppercase tracking-[0.4em] mb-4">Tactical Success Index</p>
                    <div className="w-full h-5 bg-ios-grey dark:bg-black/40 rounded-full overflow-hidden relative shadow-inner">
                       <div 
                         className="h-full bg-gradient-to-r from-ios-blue via-ios-indigo to-ios-green transition-all duration-[2000ms] ease-out" 
                         style={{ width: `${report.successProbability}%` }}
                       ></div>
                       <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[10px] font-black text-white drop-shadow-md">{report.successProbability}% OPTIMAL</span>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="p-8 border-t border-black/5 shrink-0 bg-ios-grey/30">
                 <button onClick={() => setReport(null)} className="w-full py-5 bg-gray-900 dark:bg-white dark:text-black text-white rounded-xl font-black uppercase text-xs tracking-[0.3em] active:scale-95 transition-all shadow-xl">Confirm Deployment</button>
              </div>
           </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { transform: translateY(-200%); }
          100% { transform: translateY(500%); }
        }
      `}} />
    </div>
  );
};

export default GeographicMap;
