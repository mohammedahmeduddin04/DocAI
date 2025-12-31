
import React, { useState } from 'react';
import { User } from '../../types';

interface OrganDonationProps {
  user: User;
  onBack?: () => void;
}

const OrganDonation: React.FC<OrganDonationProps> = ({ user, onBack }) => {
  const [bloodType, setBloodType] = useState(user.bloodGroup || 'O+');
  const [pledgedOrgans, setPledgedOrgans] = useState<string[]>([]);
  const [isPledged, setIsPledged] = useState(() => {
    return !!localStorage.getItem('docai_organ_pledge');
  });

  const organs = ["Heart", "Lungs", "Liver", "Kidneys", "Pancreas", "Corneas", "Skin"];

  const toggleOrgan = (organ: string) => {
    setPledgedOrgans(prev => 
      prev.includes(organ) ? prev.filter(o => o !== organ) : [...prev, organ]
    );
  };

  const handlePledge = () => {
    setIsPledged(true);
    localStorage.setItem('docai_organ_pledge', JSON.stringify({
      pledgedAt: Date.now(),
      organs: pledgedOrgans,
      bloodType
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-12 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center text-center w-full animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-col items-center mb-12">
        <div className="w-24 h-24 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-full flex items-center justify-center text-5xl mb-6 shadow-xl shadow-rose-600/10">
          ❤️
        </div>
        <h2 className="text-4xl font-black mb-2 text-gray-900 dark:text-white tracking-tighter">Legacy of Life</h2>
        <p className="text-gray-500 dark:text-gray-400 font-medium max-w-md">Your pledge can save up to 8 lives. Join the global network of donors today.</p>
      </div>

      {!isPledged ? (
        <div className="w-full space-y-12 flex flex-col items-center">
          <div className="w-full text-left">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">1. Validate Blood Type</h4>
            <div className="flex flex-wrap gap-3 justify-start">
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(type => (
                <button
                  key={type}
                  onClick={() => setBloodType(type)}
                  className={`px-6 py-3 rounded-xl text-xs font-black transition-all ${
                    bloodType === type
                      ? 'bg-rose-600 text-white shadow-lg'
                      : 'bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-700'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full text-left">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">2. Select Organ Pledges</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {organs.map(organ => (
                <button
                  key={organ}
                  onClick={() => toggleOrgan(organ)}
                  className={`px-4 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all text-center ${
                    pledgedOrgans.includes(organ)
                      ? 'bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 border-2 border-rose-600'
                      : 'bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 border border-gray-100 dark:border-gray-700'
                  }`}
                >
                  {organ}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full p-8 bg-rose-50 dark:bg-rose-900/20 rounded-[2rem] border border-rose-100 dark:border-rose-900/50 flex items-start gap-6 text-left">
             <div className="text-2xl mt-1">📜</div>
             <div>
               <p className="text-xs font-black text-rose-900 dark:text-rose-100 uppercase tracking-widest mb-1">Pledge Agreement</p>
               <p className="text-[10px] text-rose-800 dark:text-rose-300 opacity-70 leading-relaxed font-medium">I hereby declare my voluntary intention to donate my organs after my death for transplantation purposes to help patients in need of life-saving surgeries.</p>
             </div>
          </div>

          <button
            onClick={handlePledge}
            disabled={pledgedOrgans.length === 0}
            className={`w-full py-6 rounded-3xl font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center ${
              pledgedOrgans.length > 0
                ? 'bg-rose-600 text-white shadow-2xl hover:scale-[1.02]'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed opacity-50'
            }`}
          >
            Confirm Global Registry Pledge
          </button>
        </div>
      ) : (
        <div className="animate-in zoom-in-95 duration-700 w-full flex flex-col items-center">
           <div className="w-full bg-gradient-to-br from-rose-600 to-rose-900 rounded-[3rem] p-10 text-white shadow-2xl text-left relative overflow-hidden mb-12">
             <div className="absolute top-0 right-0 p-8 opacity-10 text-6xl font-black italic select-none">LIFE</div>
             <div className="mb-10">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-200 opacity-60">Global Donor Registry</p>
                <h3 className="text-3xl font-black mt-2 tracking-tighter">Verified Hero Status</h3>
             </div>
             <div className="space-y-6">
                <div>
                   <p className="text-[9px] font-black uppercase tracking-widest text-rose-300 opacity-50 mb-1">Donor Name</p>
                   <p className="text-xl font-bold tracking-tight">{user.name}</p>
                </div>
                <div className="flex gap-10">
                   <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-rose-300 opacity-50 mb-1">Blood Registry</p>
                      <p className="text-xl font-black">{bloodType}</p>
                   </div>
                   <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-rose-300 opacity-50 mb-1">Pledges</p>
                      <p className="text-xl font-black">{pledgedOrgans.length || JSON.parse(localStorage.getItem('docai_organ_pledge') || '{}').organs?.length || 0} Organs</p>
                   </div>
                </div>
             </div>
             <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center opacity-40 text-[8px] font-black uppercase tracking-widest">
                <span>Ref: AI-DONOR-2024</span>
                <span>Registry Verified</span>
             </div>
           </div>

           <div className="grid grid-cols-2 gap-4 w-full">
             <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl text-center">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Lives Impacted</p>
                <p className="text-2xl font-black dark:text-white">~8</p>
             </div>
             <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl text-center">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Registry Rank</p>
                <p className="text-2xl font-black text-rose-600 uppercase">Guardian</p>
             </div>
           </div>

           <button 
             onClick={onBack}
             className="mt-12 px-12 py-5 border-2 border-gray-100 dark:border-gray-800 text-gray-400 dark:text-gray-500 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center justify-center"
           >
             Return To Core
           </button>
        </div>
      )}
    </div>
  );
};

export default OrganDonation;
