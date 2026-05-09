import React from 'react';
import { Star } from 'lucide-react';

const ReviewCard = ({ name, comment, rating, avatar }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex gap-4 hover:shadow-md transition-shadow">
      <img src={avatar || `https://ui-avatars.com/api/?name=${name}&background=random`} alt={name} className="w-12 h-12 rounded-full object-cover shrink-0 ring-2 ring-slate-50" />
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-2 gap-2">
          <h4 className="font-bold text-slate-800">{name}</h4>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
            ))}
          </div>
        </div>
        <p className="text-slate-500 text-sm leading-relaxed">{comment}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
