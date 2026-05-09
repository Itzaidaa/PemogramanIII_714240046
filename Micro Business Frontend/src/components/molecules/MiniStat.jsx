import React from 'react';

const MiniStat = ({ value, label }) => (
  <div className="bg-slate-50 rounded-2xl p-2 md:p-3 text-center border border-slate-100 flex flex-col justify-center items-center overflow-hidden">
    <h4 className="text-lg lg:text-xl font-extrabold text-[#182243]">{value}</h4>
    <p className="text-[8px] sm:text-[9px] lg:text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider leading-tight text-center w-full truncate">{label}</p>
  </div>
);

export default MiniStat;
