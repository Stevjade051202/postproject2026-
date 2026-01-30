import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  ChevronRight, 
  ShieldCheck, 
  Lock, 
  ChevronLeft, 
  Users as UserGroupIcon, 
  SlidersHorizontal, 
  User as UserIcon, 
  Tag 
} from 'lucide-react';

const MOCK_USERS = [
  { id: 1, name: 'Easy Cebu', email: 'easycebu.sales@gmail.com', role: 'Admin', initials: 'EA' },
  { id: 2, name: 'Emma', email: 'easysales.emma@gmail.com', role: 'Manager', initials: 'EM' },
  { id: 3, name: 'Admin', email: 'easycebusouth@gmail.com', role: 'Admin', initials: 'AD' },
  { id: 4, name: 'Zen', email: 'supplier.firm@gmail.com', role: 'Admin', initials: 'ZE' },
  { id: 5, name: 'May', email: 'easysales.amy@gmail.com', role: 'Staff', initials: 'MA' },
  { id: 6, name: 'Romnick', email: '', role: 'Staff', initials: 'RO' },
];

const MOCK_SALES = [
  {
    id: 's1',
    price: 1503.00,
    items: '4 items: 1x Arabica 1x Signatur 2x g Cheese 1x Monnalis',
    customer: 'Food Daddy | Dennis L. Jimenez',
    time: '10:18 PM',
    transId: '#3-11551',
    user: 'Easy Cebu'
  },
  {
    id: 's2',
    price: 1020.00,
    items: '1x Box Embo',
    customer: 'Scarlett Escopete',
    time: '10:14 PM',
    transId: '#3-11550',
    user: 'Easy Cebu'
  },
  {
    id: 's3',
    price: 1845.00,
    items: '3 items: 1x Latte 2x Espresso',
    customer: 'Jeannina Kho',
    time: '9:52 PM',
    transId: '#3-11549',
    user: 'Easy Cebu'
  }
];

type PermissionLevel = 'EDIT' | 'VIEW' | 'NONE';
type ManagementTab = 'INFO' | 'PERMISSIONS' | 'SALES' | 'ORDERS';

interface PermissionRowProps {
  label: string;
  level: PermissionLevel;
  onChange: (level: PermissionLevel) => void;
}

const PermissionRow: React.FC<PermissionRowProps> = ({ label, level, onChange }) => (
  <div className="flex items-center justify-between py-6 border-b border-slate-50 last:border-0">
    <span className="text-[11px] font-black text-slate-600 uppercase tracking-[0.1em]">{label}</span>
    <div className="flex bg-slate-100/50 p-1 rounded-xl border border-slate-100 shadow-inner">
      {(['EDIT', 'VIEW', 'NONE'] as PermissionLevel[]).map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`px-6 py-1.5 rounded-lg text-[10px] font-black transition-all duration-300 ${
            level === option 
              ? 'bg-white text-emerald-500 shadow-md scale-105' 
              : 'text-slate-300 hover:text-slate-400'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);

export const Users: React.FC = () => {
  const [currentUserRole, setCurrentUserRole] = useState<'Admin' | 'Staff'>('Admin');
  const [managingUser, setManagingUser] = useState<any | null>(null);
  const [activeFilterTab, setActiveFilterTab] = useState<'ALL' | 'ADMIN' | 'MANAGER' | 'STAFF'>('ALL');
  const [activeManagementTab, setActiveManagementTab] = useState<ManagementTab>('SALES');
  const [inventoryControlEnabled, setInventoryControlEnabled] = useState(true);
  
  const [permissions, setPermissions] = useState({
    stockAdjustment: 'EDIT' as PermissionLevel,
    priceManagement: 'VIEW' as PermissionLevel,
    deleteRecords: 'NONE' as PermissionLevel
  });

  const isAdmin = currentUserRole === 'Admin';

  const filteredUsers = useMemo(() => {
    if (activeFilterTab === 'ALL') return MOCK_USERS;
    return MOCK_USERS.filter(u => u.role.toUpperCase() === activeFilterTab);
  }, [activeFilterTab]);

  const formatPrice = (p: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2
    }).format(p).replace('PHP', '\u20b1');
  };

  if (managingUser) {
    return (
      <div className="flex flex-col h-full bg-slate-100 overflow-hidden items-center">
        <div className="w-full max-w-2xl bg-white h-full lg:h-[90%] lg:mt-8 flex flex-col shadow-2xl lg:rounded-xl overflow-hidden">
          <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setManagingUser(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <h1 className="text-xl font-medium text-slate-800 tracking-tight">Edit user</h1>
            </div>
            <button className="text-emerald-400">
              <SlidersHorizontal size={20} />
            </button>
          </div>

          <div className="flex px-6 border-b border-slate-100 bg-white sticky top-0 z-10">
            {(['INFO', 'PERMISSIONS', 'SALES', 'ORDERS'] as ManagementTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveManagementTab(tab)}
                className={`flex-1 py-4 text-[10px] font-black tracking-[0.2em] transition-all relative ${
                  activeManagementTab === tab ? 'text-emerald-500' : 'text-slate-300'
                }`}
              >
                {tab}
                {activeManagementTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-emerald-500 rounded-full mx-4" />
                )}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto bg-white flex flex-col">
            {activeManagementTab === 'SALES' && (
              <>
                <div className="px-6 py-4 border-b border-slate-50 flex items-center sticky top-0 bg-white z-10">
                  <div className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 flex items-center gap-3 shadow-sm focus-within:border-emerald-500 transition-all">
                    <Search size={18} className="text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Item, customer, price or code" 
                      className="w-full bg-transparent text-slate-800 text-sm font-medium outline-none placeholder-slate-300"
                    />
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-6">
                    <h2 className="text-lg font-medium text-slate-700">Tuesday, Jan 27, 2026</h2>
                    <p className="text-xs text-slate-400 font-light mt-0.5">6 sales, \u20b173,065.84</p>
                  </div>

                  <div className="space-y-6">
                    {MOCK_SALES.map((sale) => (
                      <div key={sale.id} className="flex flex-col gap-1.5 hover:bg-slate-50 rounded-lg transition-colors p-2 -mx-2 group">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors">
                              <Tag size={16} />
                            </div>
                            <div className="flex items-baseline gap-2">
                              <span className="font-bold text-slate-800 text-lg tracking-tight">
                                {formatPrice(sale.price)}
                              </span>
                              <span className="text-[10px] text-slate-400 font-medium">
                                by {sale.user}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-[10px] font-bold text-slate-300">{sale.time}</div>
                          </div>
                        </div>

                        <div className="flex justify-between items-start pl-11">
                          <div className="flex-1">
                            <p className="text-[13px] text-slate-600 leading-tight">
                              {sale.items}
                            </p>
                            <div className="flex items-center gap-2 mt-1.5">
                              <UserIcon size={12} className="text-slate-300" />
                              <span className="text-[11px] font-medium text-slate-500">
                                {sale.customer}
                              </span>
                            </div>
                          </div>
                          <span className="text-[10px] text-slate-300 font-medium ml-4">
                            {sale.transId}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto px-6 py-5 bg-slate-800 text-white flex flex-col gap-0.5">
                  <h3 className="text-[13px] font-bold">Last 30 days, {managingUser.name}</h3>
                  <p className="text-[14px] text-slate-300 font-medium tracking-tight">
                    {formatPrice(419959.66)} from 27 sales
                  </p>
                </div>
              </>
            )}

            {activeManagementTab === 'PERMISSIONS' && (
              <div className="p-6">
                <div className="flex items-center justify-between py-6 border-b border-slate-50">
                  <div className="flex items-center gap-4">
                    <div className="w-1.5 h-8 bg-emerald-500 rounded-full" />
                    <h2 className="text-[12px] font-black text-slate-800 uppercase tracking-widest">Inventory Control</h2>
                  </div>
                  <button 
                    onClick={() => setInventoryControlEnabled(!inventoryControlEnabled)}
                    className={`w-14 h-8 rounded-full p-1 transition-all duration-300 flex items-center ${inventoryControlEnabled ? 'bg-emerald-500' : 'bg-slate-200'}`}
                  >
                    <div className={`bg-white w-6 h-6 rounded-full shadow-lg transform transition-transform duration-300 ${inventoryControlEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
                  </button>
                </div>
                <div className={`${inventoryControlEnabled ? 'opacity-100' : 'opacity-20 pointer-events-none'}`}>
                  <PermissionRow label="Stock Adjustment" level={permissions.stockAdjustment} onChange={(l) => setPermissions(p => ({...p, stockAdjustment: l}))} />
                  <PermissionRow label="Price Management" level={permissions.priceManagement} onChange={(l) => setPermissions(p => ({...p, priceManagement: l}))} />
                  <PermissionRow label="Delete Records" level={permissions.deleteRecords} onChange={(l) => setPermissions(p => ({...p, deleteRecords: l}))} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-hidden items-center">
      <div className="w-full bg-white px-8 py-3 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Simulate Role:</span>
          <div className="flex bg-slate-50 p-1 rounded-lg">
            <button 
              onClick={() => setCurrentUserRole('Admin')}
              className={`px-4 py-1.5 rounded-md text-[10px] font-black transition-all ${isAdmin ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
            >
              ADMIN
            </button>
            <button 
              onClick={() => setCurrentUserRole('Staff')}
              className={`px-4 py-1.5 rounded-md text-[10px] font-black transition-all ${!isAdmin ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
            >
              STAFF
            </button>
          </div>
        </div>
        {!isAdmin && <span className="flex items-center gap-1.5 text-orange-500 font-black text-[10px] uppercase"><Lock size={12} /> Restricted Access</span>}
      </div>

      <div className="w-full max-w-4xl mt-8 px-4 flex-1 flex flex-col overflow-hidden pb-8">
        <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar pb-2">
          {(['ALL', 'ADMIN', 'MANAGER', 'STAFF'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilterTab(tab)}
              className={`px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeFilterTab === tab 
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-500 ring-offset-2' 
                  : 'bg-white text-slate-400 hover:text-slate-600 border border-slate-100 shadow-sm'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 flex flex-col h-full overflow-hidden border border-slate-100">
          <div className="px-8 py-6 flex items-center justify-between border-b border-slate-50">
            <div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight">Users</h1>
              <p className="text-xs text-slate-400 font-medium mt-1">Manage your team members and their access levels</p>
            </div>
            <button 
              disabled={!isAdmin}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isAdmin ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 hover:scale-105 active:scale-95' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`}
            >
              <Plus size={28} />
            </button>
          </div>

          <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/30">
            <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 flex items-center gap-3 shadow-sm focus-within:border-emerald-500 transition-all">
              <Search size={18} className="text-slate-400" />
              <input 
                type="text" 
                placeholder="Search users..." 
                className="w-full bg-transparent text-slate-800 text-sm font-medium outline-none placeholder-slate-300"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <div 
                  key={user.id}
                  onClick={() => isAdmin && setManagingUser(user)}
                  className={`flex items-center px-8 py-6 hover:bg-slate-50 cursor-pointer transition-all group ${
                    index !== filteredUsers.length - 1 ? 'border-b border-slate-50' : ''
                  }`}
                >
                  <div className="w-14 h-14 rounded-[1.2rem] bg-slate-800 flex items-center justify-center text-white font-black text-sm mr-5 flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {user.initials}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-base font-black text-slate-800 tracking-tight">{user.name}</h3>
                      {user.role === 'Admin' && <ShieldCheck size={16} className="text-emerald-500" />}
                    </div>
                    {user.email && (
                      <p className="text-sm text-slate-400 font-medium truncate">{user.email}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                      <span className={`text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1 rounded-full border ${user.role === 'Admin' ? 'border-emerald-100 text-emerald-500 bg-emerald-50/50' : 'border-slate-100 text-slate-300 bg-slate-50/30'}`}>
                        {user.role}
                      </span>
                    </div>

                    {isAdmin ? (
                      <div className="flex items-center gap-2 text-emerald-500 font-black text-[11px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>Manage</span>
                        <ChevronRight size={16} />
                      </div>
                    ) : (
                      <ChevronRight className="text-slate-100" size={18} />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-300 py-12">
                <UserGroupIcon size={48} className="mb-4 opacity-20" />
                <p className="font-black uppercase tracking-widest text-xs">No users found in this role</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};