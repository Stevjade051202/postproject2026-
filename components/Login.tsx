import React, { useState } from 'react';
import { User, Lock, ShoppingCart, ArrowUp, ShieldCheck, Users } from 'lucide-react';

interface LoginProps {
  onLogin: (role: 'admin' | 'staff') => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'staff'>('admin');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(role);
  };

  return (
    <div className="min-h-screen w-full bg-[#1e4cd7] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Waves matching the high-fidelity design */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-[#3b82f6] opacity-30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-30%] right-[-10%] w-[90%] h-[90%] bg-[#2563eb] opacity-40 rounded-full blur-[140px]" />
        
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100 400C100 300 300 500 500 400C700 300 900 500 1100 400C1300 300 1500 500 1700 400" stroke="white" strokeWidth="100" strokeLinecap="round" />
          <path d="M-200 600C0 500 200 700 400 600C600 500 800 700 1000 600C1200 500 1400 700 1600 600" stroke="white" strokeWidth="120" strokeLinecap="round" />
        </svg>
      </div>

      <div className="w-full max-w-sm flex flex-col items-center z-10">
        {/* Logo Section */}
        <div className="mb-12 relative flex items-center justify-center">
          <div className="relative">
            <ShoppingCart size={90} className="text-white" strokeWidth={1.2} />
            <div className="absolute top-[22px] left-1/2 -translate-x-1/2">
              <ArrowUp size={28} className="text-white" strokeWidth={2.5} />
            </div>
            <div className="flex justify-center gap-2 mt-2">
              <div className="w-3 h-3 rounded-full border-2 border-white" />
              <div className="w-3 h-3 rounded-full border-2 border-white" />
            </div>
          </div>
        </div>

        {/* Role Selection Tabs - Specifically added to satisfy "create me account" */}
        <div className="w-full flex bg-white/10 p-1 rounded-xl border border-white/20 mb-8 backdrop-blur-md">
          <button 
            type="button"
            onClick={() => setRole('admin')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-black transition-all ${
              role === 'admin' ? 'bg-white text-[#1e4cd7] shadow-lg scale-[1.02]' : 'text-white/60 hover:text-white'
            }`}
          >
            <ShieldCheck size={16} />
            ADMIN
          </button>
          <button 
            type="button"
            onClick={() => setRole('staff')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-black transition-all ${
              role === 'staff' ? 'bg-white text-[#1e4cd7] shadow-lg scale-[1.02]' : 'text-white/60 hover:text-white'
            }`}
          >
            <Users size={16} />
            STAFF
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/70">
              <User size={20} strokeWidth={1.5} />
            </div>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="USERNAME"
              className="w-full bg-white/10 border border-white/40 rounded py-3.5 pl-12 pr-4 text-sm font-bold tracking-widest text-white placeholder-white/40 outline-none focus:border-white focus:bg-white/20 transition-all"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/70">
              <Lock size={20} strokeWidth={1.5} />
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="PASSWORD"
              className="w-full bg-white/10 border border-white/40 rounded py-3.5 pl-12 pr-4 text-sm font-bold tracking-widest text-white placeholder-white/40 outline-none focus:border-white focus:bg-white/20 transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-[#1e4cd7] font-black py-4 rounded text-sm tracking-[0.2em] hover:bg-white/90 active:scale-[0.98] transition-all shadow-2xl mt-4 uppercase"
          >
            Login as {role}
          </button>
        </form>

        <button className="mt-8 text-xs text-white/70 hover:text-white transition-colors tracking-wide font-medium">
          Forgot password?
        </button>
      </div>
    </div>
  );
};