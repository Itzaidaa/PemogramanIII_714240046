import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import api from '../services/api';
import Spinner from '../components/atoms/Spinner';
import Badge from '../components/atoms/Badge';
import Button from '../components/atoms/Button';
import { normalizeData } from '../utils/normalizer';

const DataList = () => {
  const { module } = useParams();
  const navigate = useNavigate();
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const titles = { 
    produk: 'Data Produk', 
    pelanggan: 'Data Pelanggan', 
    pembayaran: 'Data Pembayaran', 
    laporan: 'Data Laporan' 
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    // Asumsi endpoint menggunakan bentuk plural: /api/products
    api.get(`/${module}`)
      .then(res => {
        // Mendukung berbagai struktur response (misal res.data.data atau res.data)
        const fetchedData = res.data.data ? res.data.data : res.data;
        const normalizedList = (Array.isArray(fetchedData) ? fetchedData : []).map(item => normalizeData(item, module));
        setData(normalizedList);
        setLoading(false);
      })
      .catch(err => {
        console.error("API Error: ", err);
        setError(`Gagal memuat data ${module}. Pastikan backend sudah menyala.`);
        setLoading(false);
      });
  }, [module]);

  const filteredData = data.filter(item => {
    const nameMatch = item.name ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) : false;
    const idMatch = item.id ? String(item.id).toLowerCase().includes(searchQuery.toLowerCase()) : false;
    return nameMatch || idMatch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#182243]">{titles[module] || 'Daftar Data'}</h1>
          <p className="text-slate-400 font-medium text-sm mt-1">Kelola data Anda dengan mudah.</p>
        </div>
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text" placeholder="Cari ID atau Nama..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3fa0ff] text-sm font-medium"
          />
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-64"><Spinner /></div>
        ) : error ? (
          <div className="flex justify-center items-center h-64 flex-col gap-4 text-rose-500">
            <span className="font-bold">{error}</span>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="flex justify-center items-center h-64 text-slate-400 font-medium">
             Tidak ada data ditemukan.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50/80 border-b border-slate-100 text-slate-500 uppercase text-[10px] font-extrabold tracking-wider">
                <tr>
                  <th className="px-6 py-5">ID</th>
                  <th className="px-6 py-5">Nama</th>
                  <th className="px-6 py-5">Kategori</th>
                  <th className="px-6 py-5 hidden md:table-cell">Deskripsi</th>
                  <th className="px-6 py-5 hidden lg:table-cell">Tanggal</th>
                  <th className="px-6 py-5">Status</th>
                  <th className="px-6 py-5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.map((item, idx) => (
                  <tr key={item.id || idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-[#182243]">{item.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-700">{item.name}</td>
                    <td className="px-6 py-4 font-medium">{item.category}</td>
                    <td className="px-6 py-4 hidden md:table-cell text-slate-500 truncate max-w-[150px]">{item.description}</td>
                    <td className="px-6 py-4 hidden lg:table-cell text-slate-500 whitespace-nowrap">{item.createdAt}</td>
                    <td className="px-6 py-4"><Badge type={item.status}>{item.status}</Badge></td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" onClick={() => navigate(`/list/${module}/${item.id}`)}>Lihat</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataList;
