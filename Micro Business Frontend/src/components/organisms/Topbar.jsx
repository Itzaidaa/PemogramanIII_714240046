import React from 'react';
import { Menu, Search, Bell } from 'lucide-react';

const Topbar = ({ toggleSidebar }) => (
  <header className="px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
    <div className="flex items-center gap-4">
      <button onClick={toggleSidebar} className="md:hidden p-2 bg-white rounded-xl shadow-sm text-slate-600">
        <Menu className="w-5 h-5" />
      </button>
      <div>
        <h2 className="text-2xl font-bold text-[#182243]">Welcome to MicroBiz</h2>
        <p className="text-sm text-slate-400 font-medium">Monitor your business performance</p>
      </div>
    </div>

    <div className="flex items-center gap-4 w-full sm:w-auto">
      <div className="relative flex-1 sm:flex-none">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full sm:w-72 pl-12 pr-4 py-3 bg-white border-none rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm font-medium"
        />
      </div>
      <button className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-400 hover:text-blue-500 transition-colors">
        <Bell className="w-5 h-5" />
      </button>
      <div className="w-12 h-12 rounded-2xl bg-[#3fa0ff] shadow-sm flex items-center justify-center text-white font-bold cursor-pointer">
        A
      </div>
    </div>
  </header>
);

export default Topbar;
