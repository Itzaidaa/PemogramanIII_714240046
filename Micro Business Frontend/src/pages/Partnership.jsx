import React, { useState } from 'react';
import { Search, Plus, ArrowLeft, ArrowRight, X } from 'lucide-react';
import PartnershipCard from '../components/molecules/PartnershipCard';

// Dummy static definitions for partners based on user requests
const partnersData = [
  { id: 1, name: 'Alfamart', type: 'Retail Chain', date: '12 October 2021', bgColor: 'bg-[#FFB703]', initial: 'A' },
  { id: 2, name: 'Indomaret', type: 'Convenience Store', date: '23 Desember 2018', bgColor: 'bg-[#EF233C]', initial: 'I' },
  { id: 3, name: 'Yogya', type: 'Supermarket', date: '04 January 2020', bgColor: 'bg-[#FF8FAB]', initial: 'Y' },
  { id: 4, name: 'Superindo', type: 'Hypermarket', date: '15 Maret 2022', bgColor: 'bg-[#00B4D8]', initial: 'S' },
  { id: 5, name: 'Borma', type: 'Retail Store', date: '11 Agustus 2021', bgColor: 'bg-[#3A0CA3]', initial: 'B' },
  { id: 6, name: 'Papaya', type: 'Fresh Market', date: '07 September 2019', bgColor: 'bg-[#06D6A0]', initial: 'P' },
  { id: 7, name: 'Hypermart', type: 'Hypermarket', date: '30 November 2020', bgColor: 'bg-[#FCA311]', initial: 'H' },
  { id: 8, name: 'Transmart', type: 'Shopping Mall', date: '18 Februari 2023', bgColor: 'bg-[#4361EE]', initial: 'T' },
];

const Partnership = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = partnersData.filter(partner => 
    partner.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full animate-in slide-in-from-bottom-4 duration-700 pb-6 px-2">
      
      {/* TOP HEADER CONTROLS */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10 w-full mt-4">
        {/* Search Bar inside Page */}
        <div className="bg-white rounded-2xl flex items-center px-4 py-3 shadow-sm border border-slate-100 flex-1 max-w-3xl w-full">
          <input 
            type="text" 
            placeholder="Search Partners" 
            className="bg-transparent border-none focus:outline-none w-full text-sm font-semibold text-slate-700 placeholder-slate-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="w-5 h-5 text-[#1C82FF]" />
        </div>
        
        {/* Add Button */}
        <button className="bg-[#1C82FF] hover:bg-blue-600 transition-colors shadow-[0_8px_20px_-6px_rgba(28,130,255,0.6)] text-white px-8 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center whitespace-nowrap min-w-[140px]">
          Add Partner
        </button>
      </div>

      {/* GRID CARDS SECTION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
        {filteredData.map(partner => (
          <PartnershipCard 
            key={partner.id}
            name={partner.name}
            type={partner.type}
            date={partner.date}
            bgColor={partner.bgColor}
            initial={partner.initial}
          />
        ))}
        {filteredData.length === 0 && (
          <div className="col-span-full py-20 text-center text-slate-400 font-bold">No partners found.</div>
        )}
      </div>

      {/* BOTTOM PAGINATION CONTROLS */}
      <div className="mt-auto flex flex-col md:flex-row justify-between items-center gap-6 pb-2 px-8">
        {/* Left: Numbering */}
        <div className="flex items-center gap-6 font-bold text-slate-400 text-sm">
          <button className="hover:text-[#1C82FF] transition-colors"><ArrowLeft className="w-5 h-5 text-slate-800" /></button>
          <div className="flex items-center gap-1.5">
            <span className="text-[#1C82FF] bg-[#F0F6FF] w-8 h-8 flex items-center justify-center rounded-full cursor-pointer">1</span>
            <span className="text-slate-400 cursor-pointer hover:bg-slate-50 transition-colors w-8 h-8 flex items-center justify-center rounded-full">2</span>
            <span className="text-slate-400 cursor-pointer hover:bg-slate-50 transition-colors w-8 h-8 flex items-center justify-center rounded-full">3</span>
            <span className="text-slate-300 w-8 h-8 flex items-center justify-center">...</span>
            <span className="text-slate-400 cursor-pointer hover:bg-slate-50 transition-colors w-8 h-8 flex items-center justify-center rounded-full">8</span>
          </div>
          <button className="hover:text-[#1C82FF] transition-colors"><ArrowRight className="w-5 h-5 text-slate-800" /></button>
        </div>

        {/* Right: Selection info */}
        <div className="flex items-center gap-5">
           <div className="flex items-center gap-3">
             <div className="w-6 h-6 bg-[#1C82FF] rounded-md flex items-center justify-center shadow-lg shadow-blue-500/30">
               <X className="w-4 h-4 text-white" />
             </div>
             <span className="font-semibold text-sm text-slate-600"><strong className="text-slate-800">1 of {filteredData.length}</strong> Partners Selected</span>
           </div>
           <button className="border-2 border-slate-200 text-slate-700 hover:border-slate-300 transition-colors font-bold text-xs px-6 py-2.5 rounded-xl">
             Select All
           </button>
        </div>
      </div>

    </div>
  );
};

export default Partnership;
