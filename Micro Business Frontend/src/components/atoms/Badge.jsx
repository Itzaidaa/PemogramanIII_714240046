import React from 'react';

const Badge = ({ children, type }) => {
  const colors = {
    'Aktif': 'bg-emerald-100 text-emerald-700',
    'Selesai': 'bg-blue-100 text-blue-700',
    'Pending': 'bg-amber-100 text-amber-700',
    'Inaktif': 'bg-rose-100 text-rose-700',
    default: 'bg-slate-100 text-slate-700'
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${colors[type] || colors.default}`}>
      {children}
    </span>
  );
};

export default Badge;
