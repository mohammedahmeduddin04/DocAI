
import React, { useState } from 'react';
import { UserRole } from '../types';

interface LoginPageProps {
  onLogin: (role: UserRole, email?: string, password?: string) => void;
  toggleDarkMode: () => void;
  isDark: boolean;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, toggleDarkMode, isDark }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleBack = () => {
    setSelectedRole(null);
    setEmail('');
    setPassword('');
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Required fields missing');
      return;
    }
    onLogin(selectedRole!, email, password);
  };

  const roles = [
    { 
      role: UserRole.PATIENT, 
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ), 
      title: 'Patient', desc: 'Healthcare & Diagnosis', color: 'blue' 
    },
    { 
      role: UserRole.DOCTOR, 
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      ), 
      title: 'Doctor', desc: 'Clinical Verification', color: 'green' 
    },
    { 
      role: UserRole.ADMIN, 
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6.226a.91.91 0 00-.807.981 12.001 12.001 0 0021.136 0 .91.91 0 00-.807-.981A11.959 11.959 0 0112 2.714z" />
        </svg>
      ), 
      title: 'Admin', desc: 'Global Surveillance', color: 'orange' 
    },
  ];

  const activeRole = roles.find(r => r.role === selectedRole);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 transition-colors duration-700 bg-ios-grey dark:bg-black">
      <div className="max-w-md w-full animate-in fade-in zoom-in-95 duration-1000">
        
        {/* Header Branding */}
        <div className="text-center mb-12 flex flex-col items-center">
          <div className="w-20 h-20 bg-white dark:bg-ios-grey-dark rounded-ios-xl flex items-center justify-center text-ios-blue shadow-sm mb-6 ring-1 ring-black/5 dark:ring-white/5">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white">DocAI</h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium mt-1 text-sm">Professional Grade Diagnostics</p>
        </div>

        <div className="bg-white dark:bg-ios-grey-dark rounded-ios-2xl shadow-xl p-8 ring-1 ring-black/5 dark:ring-white/5 relative overflow-hidden">
          
          {!selectedRole ? (
            <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] text-center mb-6">Select Identity</p>
              {roles.map(r => (
                <button
                  key={r.role}
                  onClick={() => setSelectedRole(r.role)}
                  className="w-full py-4 px-6 rounded-ios bg-ios-grey dark:bg-white/5 text-black dark:text-white transition-all flex items-center justify-between group active:scale-[0.98]"
                >
                  <div className="flex items-center gap-5">
                    <span className="text-gray-400 dark:text-gray-500 group-hover:text-ios-blue transition-colors">
                      {r.icon}
                    </span>
                    <div className="text-left">
                      <p className="text-sm font-bold">{r.title}</p>
                      <p className="text-[10px] opacity-60 font-bold uppercase tracking-widest">{r.desc}</p>
                    </div>
                  </div>
                  <span className="opacity-20 group-hover:opacity-100 transition-opacity">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center justify-between mb-8">
                <button 
                  type="button" 
                  onClick={handleBack}
                  className="text-ios-blue font-bold flex items-center gap-1 text-xs active:opacity-50"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  BACK
                </button>
                <div className="text-right">
                  <h2 className="text-sm font-bold text-black dark:text-white uppercase tracking-widest">Sign In</h2>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{activeRole?.title}</p>
                </div>
              </div>

              {error && <p className="text-[10px] text-ios-red font-bold bg-ios-red/5 p-4 rounded-ios text-center uppercase tracking-widest">{error}</p>}

              <div className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full px-5 py-4 bg-ios-grey dark:bg-white/5 rounded-ios outline-none text-sm font-medium transition-all focus:ring-1 focus:ring-ios-blue/20"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-5 py-4 bg-ios-grey dark:bg-white/5 rounded-ios outline-none text-sm font-medium transition-all focus:ring-1 focus:ring-ios-blue/20"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-ios-blue text-white rounded-ios font-bold text-sm shadow-sm active:scale-[0.98] transition-all uppercase tracking-[0.2em]"
              >
                Sign In
              </button>

              <div className="pt-6 border-t border-black/5 dark:border-white/5">
                <div className="bg-ios-grey dark:bg-white/5 p-4 rounded-ios text-center">
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1">Standard Dev Protocol</p>
                  <p className="text-[10px] text-gray-600 dark:text-gray-300 font-bold uppercase">
                    {activeRole?.role.toLowerCase()}@docai.com / password
                  </p>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Global Footer Elements */}
        <div className="mt-12 flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 bg-white/50 dark:bg-white/5 p-1 rounded-full ring-1 ring-black/5 dark:ring-white/5">
            <button 
              onClick={toggleDarkMode}
              className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${!isDark ? 'bg-white shadow-sm text-black' : 'text-gray-500'}`}
            >
              Light
            </button>
            <button 
              onClick={toggleDarkMode}
              className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${isDark ? 'bg-ios-grey-dark shadow-sm text-white' : 'text-gray-500'}`}
            >
              Dark
            </button>
          </div>
          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.3em]">SECURE ACCESS • SYSTEM 2.4.0</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
