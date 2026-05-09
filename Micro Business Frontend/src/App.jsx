import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/layouts/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import DataList from './pages/DataList';
import DataDetail from './pages/DataDetail';
import Reviews from './pages/Reviews';
import Partnership from './pages/Partnership';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        {/* Dashboard Overview */}
        <Route index element={<DashboardHome />} />
        
        {/* Dynamic List and Detail Routes */}
        <Route path="/" element={<DashboardHome />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/partnership" element={<Partnership />} />
        <Route path="/list/:module" element={<DataList />} />
        <Route path="list/:module/:id" element={<DataDetail />} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
