import React from 'react';

const LegendItem = ({ color, title, subtitle }) => (
  <div className="flex items-start gap-3">
    <div className={`w-4 h-4 rounded-md ${color} mt-1`} />
    <div>
      <h5 className="font-extrabold text-sm text-[#182243]">{title}</h5>
      <p className="text-xs font-medium text-slate-400">{subtitle}</p>
    </div>
  </div>
);

export default LegendItem;
