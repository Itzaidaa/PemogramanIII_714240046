import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import api from '../services/api';
import Spinner from '../components/atoms/Spinner';
import Badge from '../components/atoms/Badge';
import { normalizeData } from '../utils/normalizer';

const DataDetail = () => {
  const { module, id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    api.get(`/${module}/${id}`)
      .then(res => {
        const item = res.data.data ? res.data.data : res.data;
        setData(normalizeData(item, module));
        setLoading(false);
      })
      .catch(err => {
        console.error("API Error: ", err);
        setError("Gagal memuat detail data.");
        setLoading(false);
      });
  }, [module, id]);

  if (loading) return <div className="flex justify-center items-center h-64"><Spinner /></div>;

  if (error || !data) return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button onClick={() => navigate(`/list/${module}`)} className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-[#3fa0ff] transition-colors">
        <ArrowLeft className="w-4 h-4" /> Kembali
      </button>
      <div className="bg-white rounded-[2rem] p-8 shadow-sm flex justify-center text-rose-500 font-bold">{error || "Data tidak ditemukan"}</div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-300">
      <button onClick={() => navigate(`/list/${module}`)} className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-[#3fa0ff] transition-colors">
        <ArrowLeft className="w-4 h-4" /> Kembali
      </button>

      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-xl font-extrabold text-[#182243]">Detail Informasi</h3>
          <Badge type={data.status}>{data.status || 'Active'}</Badge>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1">ID Referensi</span>
              <span className="text-lg font-bold text-[#182243]">{data.id}</span>
            </div>
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1">Tanggal Dibuat</span>
              <span className="text-lg font-bold text-[#182243]">{data.createdAt || data.created_at || '-'}</span>
            </div>
            <div className="md:col-span-2 bg-slate-50 p-6 rounded-3xl border border-slate-100">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1">Nama Lengkap</span>
              <span className="text-xl font-bold text-[#182243]">{data.name}</span>
            </div>
            <div className="md:col-span-2 bg-slate-50 p-6 rounded-3xl border border-slate-100">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1">Deskripsi & Kategori ({data.category || '-'})</span>
              <p className="text-base font-medium text-slate-600 mt-2 leading-relaxed">{data.description || '-'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataDetail;
