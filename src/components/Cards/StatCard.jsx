import React from "react";

const StatCard = ({ label, count, color, icon: Icon }) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center gap-4">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${color}`}>
      <Icon />
    </div>
    <div>
      <p className="text-2xl font-bold text-slate-800">{count}</p>
      <p className="text-xs text-slate-500 font-medium">{label}</p>
    </div>
  </div>
);

export default StatCard;
