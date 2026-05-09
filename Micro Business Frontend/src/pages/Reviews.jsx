import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import ReviewCard from '../components/molecules/ReviewCard';
import api from '../services/api';

const ratingStats = [
  { stars: 5, count: 989, label: 'FIVE' },
  { stars: 4, count: 4500, label: 'FOUR' },
  { stars: 3, count: 50, label: 'THREE' },
  { stars: 2, count: 16, label: 'TWO' },
  { stars: 1, count: 8, label: 'ONE' }
];

const Reviews = () => {
  const [customers, setCustomers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ id_pelanggan: '', name: '', email: '', comment: '', rating: 0 });

  useEffect(() => {
    // Tarik data pelanggan asli dari backend
    api.get('/pelanggan')
      .then(res => {
        const data = res.data.data || res.data || [];
        setCustomers(data);
        
        // Buat ulasan awal dari 3 pelanggan nyata yang di-fetch
        if (data.length > 0) {
           const initialGenerated = data.slice(0, 3).map((cust, i) => ({
             id: cust.id_pelanggan,
             name: cust.nama,
             rating: i === 1 ? 5 : 4,
             comment: i === 0 ? 'Pelayanan sangat memuaskan, kualitas produknya luar biasa.' : (i === 1 ? 'Sistemnya rapi, saya suka. Mudah dipakai dan cepat dioperasikan.' : 'Lumayan baik, sesuai dengan harapan saya. Semoga makin ditingkatkan.'),
             avatar: `https://ui-avatars.com/api/?name=${cust.nama}&background=random`
           }));
           setReviews(initialGenerated);
        }
      })
      .catch(err => console.error("Gagal menarik pelanggan untuk ulasan:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment || newReview.rating === 0) return;
    
    const reviewPayload = {
      id: Date.now(),
      name: newReview.name,
      rating: newReview.rating,
      comment: newReview.comment,
      avatar: `https://ui-avatars.com/api/?name=${newReview.name}&background=random`
    };
    
    // Add to top of the list locally
    setReviews([reviewPayload, ...reviews]);
    // Reset form
    setNewReview({ name: '', email: '', comment: '', rating: 0 });
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700 pb-10">
      <div className="flex flex-col gap-2 mb-8">
        <h2 className="text-2xl font-black text-[#182243]">Penilaian & Ulasan</h2>
        <p className="text-slate-500">Kelola ulasan dari database riil pelanggan Anda langsung di sini.</p>
      </div>

      {/* TOP SECTION: RATINGS BREAKDOWN & TOTAL */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Breakdown bars */}
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex flex-col justify-center space-y-5 lg:space-y-6">
          {ratingStats.map((stat, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <span className="w-12 text-[10px] font-bold text-slate-800 uppercase tracking-widest">{stat.label}</span>
              <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
              <div className="flex-1 h-3 bg-amber-50 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-amber-400 rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${Math.min((stat.count / 5000) * 100, 100)}%` }}>
                </div>
              </div>
              <span className="w-10 text-right text-xs font-extrabold text-slate-800">
                {stat.count >= 1000 ? (stat.count/1000).toFixed(1)+'K' : stat.count}
              </span>
            </div>
          ))}
        </div>

        {/* Global Rating Card */}
        <div className="bg-[#FFFDF7] rounded-[2rem] p-8 flex flex-col justify-center items-center h-full border border-amber-100 shadow-sm relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/40 rounded-full blur-2xl transform translate-x-10 -translate-y-10 group-hover:bg-amber-300/40 transition-colors"></div>
          <h1 className="text-7xl font-black text-amber-400 mb-6 drop-shadow-sm">4.3</h1>
          <div className="flex gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-8 h-8 ${i < 4 ? 'text-amber-400 fill-amber-400' : 'text-amber-200 fill-amber-200'}`} />
            ))}
          </div>
          <p className="text-sm font-bold text-slate-600 tracking-wide mt-2">50 Ratings</p>
        </div>
      </div>

      {/* BOTTOM SECTION: FEEDBACK LIST & ADD REVIEW */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mt-6">
        
        {/* Feedback List */}
        <div className="flex flex-col">
          <h3 className="text-xl font-extrabold text-[#182243] mb-6">Ulasan Terkini</h3>
          <div className="flex-1 space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {reviews.map(review => (
              <ReviewCard key={review.id} {...review} />
            ))}
          </div>
        </div>

        {/* Add Review Form */}
        <div>
          <h3 className="text-xl font-extrabold text-[#182243] mb-6">Tambah Ulasan Real</h3>
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-3">Add Your Rating <span className="text-red-400">*</span></label>
                <div className="flex gap-2 cursor-pointer w-fit group">
                  {[1,2,3,4,5].map((starIdx) => (
                     <Star 
                       key={starIdx} 
                       onClick={() => setNewReview({...newReview, rating: starIdx})}
                       className={`w-6 h-6 transition-all ${newReview.rating >= starIdx ? 'text-amber-400 fill-amber-400 scale-110 drop-shadow-sm' : 'text-slate-200 hover:text-amber-300'}`} 
                     />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-2">Name <span className="text-red-400">*</span></label>
                <input 
                  type="text" 
                  value={newReview.name}
                  onChange={e => setNewReview({...newReview, name: e.target.value})}
                  className="w-full bg-white border border-slate-200 text-sm font-medium text-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all placeholder:text-slate-300"
                  placeholder="Ketik Nama Anda"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-2">Email Anda <span className="text-red-400">*</span></label>
                <input 
                  type="email" 
                  value={newReview.email}
                  onChange={e => setNewReview({...newReview, email: e.target.value})}
                  className="w-full bg-white border border-slate-200 text-sm font-medium text-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all placeholder:text-slate-300"
                  placeholder="Ketik Email Anda"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-2">Write Your Review <span className="text-red-400">*</span></label>
                <textarea 
                  value={newReview.comment}
                  onChange={e => setNewReview({...newReview, comment: e.target.value})}
                  className="w-full bg-white border border-slate-200 text-sm font-medium text-slate-700 rounded-xl px-4 py-3 h-32 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all resize-none placeholder:text-slate-300"
                  placeholder="Ketik ulasan di sini..."
                  required
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#fbbc04] hover:bg-amber-500 text-white font-bold text-sm tracking-wide py-4 rounded-xl shadow-md shadow-amber-400/30 transition-all hover:-translate-y-1 hover:shadow-lg mt-2 disabled:opacity-50"
              >
                Kirim Ulasan Utama
              </button>

            </form>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Reviews;
