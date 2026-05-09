import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Users, CreditCard, FileText, Activity, X, MoreVertical, Star, Briefcase } from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'produk', path: '/list/produk', label: 'Produk', icon: Package },
    { id: 'pelanggan', path: '/list/pelanggan', label: 'Pelanggan', icon: Users },
    { id: 'pembayaran', path: '/list/pembayaran', label: 'Pembayaran', icon: CreditCard },
    { id: 'laporan', path: '/list/laporan', label: 'Laporan', icon: FileText },
    { id: 'ulasan', path: '/reviews', label: 'Ulasan', icon: Star },
    { id: 'partnership', path: '/partnership', label: 'Partnership', icon: Briefcase },
  ];

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-slate-900/40 z-30 md:hidden backdrop-blur-sm" onClick={toggleSidebar} />}

      <aside className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-[#182243] text-white transform transition-transform duration-300 ease-in-out flex flex-col my-4 ml-4 rounded-[2rem] shadow-2xl md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-[120%]'}`}>
        <div className="pt-8 pb-6 px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#3B82F6] flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-extrabold tracking-wide">MicroBiz</h1>
          </div>
          <button onClick={toggleSidebar} className="md:hidden text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {menuItems.map(item => {
            // Determine active state manually based on path
            const isActive = location.pathname === item.path || 
              (item.id !== 'dashboard' && location.pathname.includes(`/${item.id}`));

            return (
              <button
                key={item.id}
                onClick={() => {
                  navigate(item.path);
                  if (window.innerWidth < 768) toggleSidebar();
                }}
                className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-[#3fa0ff] text-white shadow-lg shadow-blue-500/30 translate-x-2'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {item.label}
              </button>
            )
          })}
        </nav>

        {/* Floating Card */}
        <div className="p-4 mt-auto">
          <div className="bg-white rounded-3xl p-5 text-center flex flex-col items-center shadow-lg relative">
            <button className="absolute top-3 right-3 text-slate-400"><MoreVertical className="w-4 h-4" /></button>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center mb-3 mt-2">
              <Package className="w-6 h-6" />
            </div>
            <h4 className="text-[#182243] font-bold text-sm mb-1">Kelola Integrasi</h4>
            <p className="text-xs text-slate-400 font-medium">Hubungkan App</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
