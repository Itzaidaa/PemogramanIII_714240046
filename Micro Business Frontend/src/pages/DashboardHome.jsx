import React, { useState, useEffect } from 'react';
import { Users, Activity, DollarSign, Package } from 'lucide-react';
import TopStatCard from '../components/organisms/TopStatCard';
import MiniStat from '../components/molecules/MiniStat';
import ChartBar from '../components/molecules/ChartBar';
import Spinner from '../components/atoms/Spinner';
import api from '../services/api';

const formatRp = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num;
};

const DashboardHome = () => {
  const [metrics, setMetrics] = useState({
    customers: 0,
    products: 0,
    transactions: 0,
    revenue: 0,
    laporanAktif: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resProduk, resPelanggan, resPembayaran, resLaporan] = await Promise.all([
          api.get('/produk').catch(() => ({ data: [] })),
          api.get('/pelanggan').catch(() => ({ data: [] })),
          api.get('/pembayaran').catch(() => ({ data: [] })),
          api.get('/laporan').catch(() => ({ data: [] }))
        ]);

        const productsData = resProduk.data.data || resProduk.data || [];
        const customersData = resPelanggan.data.data || resPelanggan.data || [];
        const paymentsData = resPembayaran.data.data || resPembayaran.data || [];
        const reportsData = resLaporan.data.data || resLaporan.data || [];

        // Pendapatan berdasarkan total bayar yang Lunas
        const totalRevenue = paymentsData.reduce((acc, curr) => {
          if (curr.status_pembayaran === 'lunas') return acc + Number(curr.total_bayar);
          return acc;
        }, 0);

        setMetrics({
          products: productsData.length,
          customers: customersData.length,
          transactions: paymentsData.length,
          revenue: totalRevenue,
          laporanAktif: reportsData.length
        });
      } catch (error) {
        console.error("Dashboard Failed to fetch data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="flex items-center justify-center h-full"><Spinner /></div>;

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-700 pb-10">
      
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-black text-[#182243]">Overview Dashboard</h2>
        <span className="px-4 py-1.5 bg-white/50 backdrop-blur-sm shadow-sm rounded-full text-xs font-bold text-[#3B82F6] border border-blue-100 uppercase tracking-widest animate-pulse">
          Live Data Active
        </span>
      </div>

      {/* ROW 1: PREMIUM TOP STATS WITH HOVER EFFECTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <TopStatCard 
          icon={DollarSign} value={formatRp(metrics.revenue)} label="Pendapatan Lunas" 
          gradientFrom="from-emerald-400" gradientTo="to-teal-600" isCurrency={true} 
        />
        <TopStatCard 
          icon={Activity} value={metrics.transactions} label="Total Transaksi" 
          gradientFrom="from-blue-400" gradientTo="to-indigo-600" 
        />
        <TopStatCard 
          icon={Users} value={metrics.customers} label="Total Akun Pelanggan" 
          gradientFrom="from-violet-500" gradientTo="to-purple-700" 
        />
        <TopStatCard 
          icon={Package} value={metrics.products} label="Item Produk" 
          gradientFrom="from-rose-400" gradientTo="to-orange-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        {/* ROW 2 LEFT: GLASSMORPHISM DETAIL METRICS */}
        <div className="lg:col-span-1 bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-white flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-white/80 to-transparent pointer-events-none rounded-full transform translate-x-32 -translate-y-32"></div>
          
          <h3 className="text-xl font-black text-[#182243] mb-8 relative z-10">Sorotan Lain</h3>
          <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
            <MiniStat value={metrics.laporanAktif} label="Data Laporan" />
            <MiniStat value={metrics.transactions} label="Invoice" />
          </div>
          
          <div className="mt-auto bg-gradient-to-r from-blue-500 to-indigo-600 rounded-[2rem] p-6 border border-white/20 shadow-2xl shadow-blue-500/40 text-white relative z-10 hover:scale-[1.03] transition-transform duration-500 cursor-default">
            <div className="absolute inset-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="flex justify-between items-end mb-5">
              <div>
                <p className="text-xs font-semibold opacity-80 uppercase tracking-widest mb-1">Status Storage</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black">{metrics.customers + metrics.products}</span>
                  <span className="text-lg font-bold opacity-80">Data</span>
                </div>
              </div>
            </div>
            <div className="w-full bg-black/20 rounded-full h-3 overflow-hidden shadow-inner">
               {/* width dynamically calculated up to 100 records max for visual effect */}
              <div className="bg-white h-full rounded-full animate-pulse transition-all duration-1000 ease-out" 
                   style={{ width: `${Math.min(((metrics.customers + metrics.products) / 100) * 100, 100)}%` }}></div>
            </div>
            <p className="text-[10px] mt-3 font-semibold opacity-70 text-right">Kapasitas aman</p>
          </div>
        </div>

        {/* ROW 2 RIGHT: BAR CHART GLASSMORPHISM */}
        <div className="lg:col-span-2 bg-gradient-to-br from-white to-slate-50/80 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-white relative transition-all duration-500 hover:shadow-2xl">
          <h3 className="text-xl font-black text-[#182243] mb-12">Visualisasi Kepadatan Modul Database</h3>
          <div className="px-2 sm:px-4 h-72 flex items-end justify-around gap-2 relative z-10 pb-10">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-10">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-full border-t-[1.5px] border-dashed border-slate-200/60 flex items-center relative">
                  <span className="absolute -left-4 text-[10px] text-slate-400 font-bold bg-white/50 px-1 rounded-sm">{50 - (i * 10)}</span>
                </div>
              ))}
              <div className="w-full border-t-2 border-slate-200"></div>
            </div>
            
            {/* Dynamic Bars based on live max 50 items metric */}
            <ChartBar height={`${Math.max(Math.min((metrics.products / 50) * 100, 100), 5)}%`} color="bg-gradient-to-t from-orange-500 to-rose-400" label={`Produk (${metrics.products})`} />
            <ChartBar height={`${Math.max(Math.min((metrics.customers / 50) * 100, 100), 5)}%`} color="bg-gradient-to-t from-purple-600 to-violet-400" label={`Pelanggan (${metrics.customers})`} />
            <ChartBar height={`${Math.max(Math.min((metrics.transactions / 50) * 100, 100), 5)}%`} color="bg-gradient-to-t from-indigo-500 to-blue-400" label={`Pembayaran (${metrics.transactions})`} />
            <ChartBar height={`${Math.max(Math.min((metrics.laporanAktif / 50) * 100, 100), 5)}%`} color="bg-gradient-to-t from-emerald-600 to-teal-400" label={`Laporan (${metrics.laporanAktif})`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
