import React from 'react';

const CategoryCard = ({ color, avatar, name, percentage }) => {
  const isDark = color === 'dark';
  return (
    <div className={`rounded-3xl p-4 flex flex-col items-center justify-between text-center relative overflow-hidden ${
      isDark ? 'bg-[#182243] text-white shadow-lg' : 'bg-rose-300 text-white shadow-md'
    }`}>
      {/* Decorative circle */}
      <div className="absolute -right-4 -top-4 w-16 h-16 rounded-full bg-white/10 blur-xl"></div>
      
      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl mb-3 mt-2 backdrop-blur-md">
        {avatar}
      </div>
      <div>
        <h5 className="font-extrabold text-sm mb-1">{name}</h5>
        <span className="text-xl font-black">{percentage}</span>
      </div>
      <button className={`w-full mt-4 py-2 rounded-xl text-xs font-bold transition-colors ${
        isDark ? 'bg-[#3fa0ff] hover:bg-blue-500' : 'bg-white/30 hover:bg-white/40 backdrop-blur-sm'
      }`}>
        Details
      </button>
    </div>
  );
};

export default CategoryCard;
