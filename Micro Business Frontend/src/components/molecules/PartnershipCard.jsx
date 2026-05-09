import React from 'react';
import { Trash2 } from 'lucide-react';

const PartnershipCard = ({ name, type, date, bgColor, initial }) => {
  return (
    <div className="relative group cursor-pointer w-full">
      <div className="bg-white group-hover:bg-[#1C82FF] transition-colors duration-300 rounded-[2rem] p-8 flex flex-col items-center justify-center shadow-sm border border-slate-50 group-hover:border-[#1C82FF] group-hover:shadow-[0_20px_40px_-15px_rgba(28,130,255,0.6)] h-[280px]">
        
        {/* Hover Delete Button Badge */}
        <div className="absolute top-0 right-0 bg-white rounded-xl p-3 shadow-[0_4px_15px_rgba(0,0,0,0.05)] text-slate-400 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:text-red-500 z-10 transform translate-x-3 -translate-y-3">
          <Trash2 className="w-5 h-5" />
        </div>

        {/* Dynamic Circular Avatar */}
        <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-white text-2xl mb-6 transition-transform duration-300 group-hover:scale-110 shadow-sm ${bgColor}`}>
          {initial}
        </div>

        {/* Text Details */}
        <h3 className="font-extrabold text-lg text-slate-800 group-hover:text-white transition-colors">{name}</h3>
        <p className="text-sm font-semibold text-slate-400 group-hover:text-blue-100 transition-colors mb-8 mt-1">{type}</p>
        
        <p className="text-[11px] font-bold text-slate-300 group-hover:text-blue-200 mt-auto tracking-wide">{date}</p>
      </div>
    </div>
  );
};

export default PartnershipCard;
