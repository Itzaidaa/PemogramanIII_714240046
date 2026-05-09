import React from 'react';

const ChartBar = ({ height, color, label }) => (
  <div className="relative flex flex-col items-center justify-end h-full w-10 sm:w-12 group z-10">
    <div className={`w-8 sm:w-10 rounded-t-xl ${color} transition-all duration-500 hover:opacity-80 relative shadow-sm`} style={{ height }}>
      {/* 3D effect polygon at top of bar */}
      <div className="absolute -top-2 left-0 w-full h-4 bg-white/20 rounded-t-xl" style={{ transform: 'skewX(45deg)', transformOrigin: 'bottom' }}></div>
    </div>
    <span className="absolute -bottom-8 text-[9px] sm:text-[10px] font-bold text-slate-500 w-24 text-center whitespace-nowrap">{label}</span>
  </div>
);

export default ChartBar;
