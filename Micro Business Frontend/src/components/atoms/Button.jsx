import React from 'react';

const Button = ({ children, variant = 'primary', icon: Icon, onClick }) => {
  const base = "inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold transition-all rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-[#3B82F6] text-white hover:bg-blue-600 focus:ring-blue-500 shadow-md shadow-blue-200",
    secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200 focus:ring-slate-500",
    ghost: "text-[#3B82F6] bg-blue-50 hover:bg-blue-100 focus:ring-blue-500"
  };
  return (
    <button onClick={onClick} className={`${base} ${variants[variant]}`}>
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
};

export default Button;
