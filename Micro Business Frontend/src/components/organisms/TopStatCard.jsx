import React from 'react';

const TopStatCard = ({ icon: Icon, value, label, gradientFrom, gradientTo, isCurrency = false }) => (
  <div className={`relative overflow-hidden rounded-[2rem] p-6 text-white bg-gradient-to-br ${gradientFrom} ${gradientTo} shadow-lg hover:-translate-y-2 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 w-full cursor-pointer group`}>
    
    {/* Background Decorative Blob */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10 group-hover:bg-white/20 transition-all duration-500"></div>
    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl transform -translate-x-5 translate-y-5"></div>

    <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
      <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner border border-white/10 group-hover:rotate-12 transition-transform duration-500">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-xs font-semibold text-white/80 tracking-widest uppercase mb-1">{label}</p>
        <div className="flex items-end gap-1">
          {isCurrency && <span className="text-xl font-bold opacity-80 mb-1">Rp</span>}
          <h3 className="text-4xl sm:text-3xl lg:text-4xl font-black tracking-tight drop-shadow-md">{value}</h3>
        </div>
      </div>
    </div>
  </div>
);

export default TopStatCard;
