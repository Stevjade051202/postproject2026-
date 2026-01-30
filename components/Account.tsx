import React from 'react';
import { 
  User, 
  Mail, 
  ShieldCheck, 
  Calendar, 
  LogOut, 
  Lock, 
  ChevronRight, 
  TrendingUp,
  Clock,
  ShieldAlert
} from 'lucide-react';

interface AccountProps {
  userRole: 'admin' | 'staff';
  onLogout: () => void;
}

export const Account: React.FC<AccountProps> = ({ userRole, onLogout }) => {
  const isAdmin = userRole === 'admin';
  
  // Mock User Details
  const userData = isAdmin ? {
    name: 'Easy Cebu Admin',
    email: 'admin@easycebu.com',
    joined: 'Jan 12, 2023',
    initials: 'EA',
    storeName: 'Easy Cebu Main Branch'
  } : {
    name: 'Staff Member 01',
    email: 'staff01@easycebu.com',
    joined: 'Nov 05, 2024',
    initials: 'S1',
    storeName: 'Easy Cebu Main Branch'
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden items-center">
      <div className="w-full max-w-2xl bg-white h-full lg:h-[95%] lg:mt-4 flex flex-col shadow-2xl lg:rounded-2xl overflow-hidden border border-slate-100">
        
        {/* Profile Header */}
        <div className="relative h-40 bg-[#1e4cd7] flex-shrink-0">
          {/* Decorative Waves */}
          <svg className="absolute bottom-0 w-full h-12 text-white fill-current" viewBox="0 0 1440 48" fill="none">
            <path d="M0 48H1440V0C1440 0 1080 48 720 48C360 48 0 0 0 0V48Z" />
          </svg>
        </div>

        {/* Profile Info Card Overlay */}
        <div className="px-8 -mt-16 relative z-10 flex flex-col items-center">
          <div className="w-32 h-32 rounded-3xl bg-white p-1.5 shadow-2xl">
            <div className="w-full h-full rounded-[1.4rem] bg-slate-900 flex items-center justify-center text-white text-3xl font-black">
              {userData.initials}
            </div>
          </div>
          <h1 className="mt-4 text-2xl font-black text-slate-800 tracking-tight">{userData.name}</h1>
          <div className="flex items-center gap-2 mt-1">
             <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest ${isAdmin ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                {userRole}
             </span>
             <span className="text-slate-300">•</span>
             <span className="text-xs text-slate-400 font-medium">{userData.storeName}</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          
          {/* Quick Stats - Context Aware */}
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                   <TrendingUp size={14} />
                   <span className="text-[10px] font-black uppercase tracking-widest">Sales Today</span>
                </div>
                <p className="text-xl font-black text-slate-800">₱{isAdmin ? '36,643.00' : '4,850.00'}</p>
             </div>
             <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                   <Clock size={14} />
                   <span className="text-[10px] font-black uppercase tracking-widest">Shift Time</span>
                </div>
                <p className="text-xl font-black text-slate-800">5h 22m</p>
             </div>
          </div>

          {/* Account Details Section */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Account Information</h3>
            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden divide-y divide-slate-50">
              <ProfileItem icon={Mail} label="Email Address" value={userData.email} />
              <ProfileItem icon={Calendar} label="Member Since" value={userData.joined} />
              <ProfileItem icon={ShieldCheck} label="Account Level" value={isAdmin ? "Full Access Administrator" : "Limited Staff Access"} />
            </div>
          </div>

          {/* Security & System */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Security & Settings</h3>
            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden divide-y divide-slate-50">
              <ActionItem icon={Lock} label="Change Password" />
              <ActionItem icon={ShieldAlert} label="Active Sessions" badge="2 devices" />
            </div>
          </div>

          {/* Footer Action */}
          <div className="pt-4 pb-8">
            <button 
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-3 bg-red-50 hover:bg-red-100 text-red-500 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all"
            >
              <LogOut size={20} />
              Log Out Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileItem: React.FC<{ icon: any, label: string, value: string }> = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-4 p-5">
    <div className="text-slate-300">
      <Icon size={20} />
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{label}</p>
      <p className="text-sm font-bold text-slate-800">{value}</p>
    </div>
  </div>
);

const ActionItem: React.FC<{ icon: any, label: string, badge?: string }> = ({ icon: Icon, label, badge }) => (
  <button className="w-full flex items-center gap-4 p-5 hover:bg-slate-50 transition-colors group">
    <div className="text-slate-300 group-hover:text-[#1e4cd7] transition-colors">
      <Icon size={20} />
    </div>
    <div className="flex-1 text-left">
      <span className="text-sm font-bold text-slate-800">{label}</span>
      {badge && (
        <span className="ml-2 text-[9px] font-black bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded tracking-tighter">
          {badge}
        </span>
      )}
    </div>
    <ChevronRight size={18} className="text-slate-200" />
  </button>
);
