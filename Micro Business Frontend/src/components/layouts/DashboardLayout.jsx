import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../organisms/Sidebar';
import Topbar from '../organisms/Topbar';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-[#F4F7FB] font-sans overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Background decorative blob */}
        <div className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <Topbar toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:px-10 lg:pb-10">
          <Outlet /> {/* Renders the nested routes like DashboardHome, DataList, etc. */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
