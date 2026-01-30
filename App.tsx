import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar.tsx';
import { Home } from './components/Home.tsx';
import { NewProduct } from './components/NewProduct.tsx';
import { Checkout } from './components/Checkout.tsx';
import { Orders } from './components/Orders.tsx';
import { Products } from './components/Products.tsx';
import { SmartAssistant } from './components/SmartAssistant.tsx';
import { OnlineCatalog } from './components/OnlineCatalog.tsx';
import { Coupons } from './components/Coupons.tsx';
import { Customers } from './components/Customers.tsx';
import { Transactions } from './components/Transactions.tsx';
import { Analytics } from './components/Analytics.tsx';
import { Users } from './components/Users.tsx';
import { Settings } from './components/Settings.tsx';
import { Help } from './components/Help.tsx';
import { Login } from './components/Login.tsx';
import { AdminPanel } from './components/AdminPanel.tsx';
import { Account } from './components/Account.tsx';
import { Menu } from 'lucide-react';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'staff'>('admin');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('home'); 

  const handleLogin = (role: 'admin' | 'staff') => {
    setUserRole(role);
    setIsLoggedIn(true);
    setActiveView('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsSidebarOpen(false);
  };

  const handleNavigate = (view: string) => {
    const adminOnlyViews = ['analytics', 'users', 'settings', 'admin-panel', 'finance'];
    if (userRole === 'staff' && adminOnlyViews.includes(view)) {
      setActiveView('home');
      return;
    }
    
    setActiveView(view);
    setIsSidebarOpen(false);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden font-sans text-slate-800">
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className={`
        fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar 
          activeView={activeView} 
          onNavigate={handleNavigate} 
          onLogout={handleLogout}
          userRole={userRole} 
        />
      </div>

      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {activeView === 'home' && (
          <div className="flex-1 h-full flex flex-col overflow-hidden">
            <div className="lg:hidden bg-white border-b p-4 flex items-center gap-3">
                 <button onClick={() => setIsSidebarOpen(true)}>
                    <Menu size={24} className="text-slate-600"/>
                 </button>
                 <span className="font-bold uppercase tracking-wide">EASY CEBU</span>
            </div>
            <Home />
          </div>
        )}

        {activeView === 'account' && (
          <div className="flex-1 h-full flex flex-col">
            <div className="lg:hidden bg-white border-b p-4 flex items-center gap-3">
                 <button onClick={() => setIsSidebarOpen(true)}>
                    <Menu size={24} className="text-slate-600"/>
                 </button>
                 <span className="font-bold uppercase tracking-wide">MY ACCOUNT</span>
            </div>
            <Account userRole={userRole} onLogout={handleLogout} />
          </div>
        )}

        {activeView === 'admin-panel' && (
          <div className="flex-1 h-full flex flex-col">
            <AdminPanel 
              onBack={() => setActiveView('home')} 
              onNavigateToUsers={() => setActiveView('users')}
            />
          </div>
        )}

        {activeView === 'new-product' && (
          <div className="flex-1 h-full flex flex-col">
            <NewProduct onBack={() => setActiveView('home')} />
          </div>
        )}

        {activeView === 'checkout' && (
          <div className="flex-1 h-full flex flex-col">
            <div className="lg:hidden bg-white border-b p-2">
                 <button onClick={() => setIsSidebarOpen(true)} className="p-2">
                    <Menu size={20} className="text-gray-600"/>
                 </button>
            </div>
            <Checkout />
          </div>
        )}

        {activeView === 'orders' && (
          <div className="flex-1 h-full flex flex-col">
            <div className="lg:hidden bg-white border-b p-2">
                 <button onClick={() => setIsSidebarOpen(true)} className="p-2">
                    <Menu size={20} className="text-gray-600"/>
                 </button>
            </div>
            <Orders />
          </div>
        )}
        
        {activeView === 'products' && (
          <div className="flex-1 h-full flex flex-col">
            <div className="lg:hidden bg-white border-b p-2">
                 <button onClick={() => setIsSidebarOpen(true)} className="p-2">
                    <Menu size={20} className="text-gray-600"/>
                 </button>
            </div>
            <Products />
          </div>
        )}

        {activeView === 'smart-assistant' && (
          <div className="flex-1 h-full flex flex-col">
            <div className="lg:hidden bg-white border-b p-2">
                 <button onClick={() => setIsSidebarOpen(true)} className="p-2">
                    <Menu size={20} className="text-gray-600"/>
                 </button>
            </div>
            <SmartAssistant />
          </div>
        )}

        {activeView === 'online-catalog' && (
          <div className="flex-1 h-full flex flex-col">
            <div className="lg:hidden bg-white border-b p-2">
                 <button onClick={() => setIsSidebarOpen(true)} className="p-2">
                    <Menu size={20} className="text-gray-600"/>
                 </button>
            </div>
            <OnlineCatalog />
          </div>
        )}

        {activeView === 'coupons' && (
          <div className="flex-1 h-full flex flex-col">
            <div className="lg:hidden bg-white border-b p-2">
                 <button onClick={() => setIsSidebarOpen(true)} className="p-2">
                    <Menu size={20} className="text-gray-600"/>
                 </button>
            </div>
            <Coupons />
          </div>
        )}

        {activeView === 'customers' && (
          <div className="flex-1 h-full flex flex-col">
            <div className="lg:hidden bg-white border-b p-2">
                 <button onClick={() => setIsSidebarOpen(true)} className="p-2">
                    <Menu size={20} className="text-gray-600"/>
                 </button>
            </div>
            <Customers />
          </div>
        )}

        {activeView === 'transactions' && (
          <div className="flex-1 h-full flex flex-col">
            <div className="lg:hidden bg-white border-b p-2">
                 <button onClick={() => setIsSidebarOpen(true)} className="p-2">
                    <Menu size={20} className="text-gray-600"/>
                 </button>
            </div>
            <Transactions />
          </div>
        )}

        {activeView === 'analytics' && (
          <div className="flex-1 h-full flex flex-col">
            <div className="lg:hidden bg-white border-b p-2">
                 <button onClick={() => setIsSidebarOpen(true)} className="p-2">
                    <Menu size={20} className="text-gray-600"/>
                 </button>
            </div>
            <Analytics />
          </div>
        )}

        {activeView === 'users' && (
          <div className="flex-1 h-full flex flex-col">
            <div className="lg:hidden bg-white border-b p-2">
                 <button onClick={() => setIsSidebarOpen(true)} className="p-2">
                    <Menu size={20} className="text-gray-600"/>
                 </button>
            </div>
            <Users />
          </div>
        )}

        {activeView === 'settings' && (
          <div className="flex-1 h-full flex flex-col">
            <div className="lg:hidden bg-white border-b p-2">
                 <button onClick={() => setIsSidebarOpen(true)} className="p-2">
                    <Menu size={20} className="text-gray-600"/>
                 </button>
            </div>
            <Settings />
          </div>
        )}

        {activeView === 'help' && (
          <div className="flex-1 h-full flex flex-col">
            <div className="lg:hidden bg-white border-b p-2">
                 <button onClick={() => setIsSidebarOpen(true)} className="p-2">
                    <Menu size={20} className="text-gray-600"/>
                 </button>
            </div>
            <Help />
          </div>
        )}

        {!['home', 'account', 'admin-panel', 'new-product', 'checkout', 'orders', 'products', 'smart-assistant', 'online-catalog', 'coupons', 'customers', 'transactions', 'analytics', 'users', 'settings', 'help'].includes(activeView) && (
           <div className="flex-1 flex items-center justify-center flex-col">
              <div className="lg:hidden w-full bg-kyte-dark p-4 text-white flex items-center gap-3 absolute top-0">
                  <button onClick={() => setIsSidebarOpen(true)}>
                      <Menu size={24} />
                  </button>
                  <span>{activeView}</span>
              </div>
              <p className="text-gray-400">View not implemented: {activeView}</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default App;
