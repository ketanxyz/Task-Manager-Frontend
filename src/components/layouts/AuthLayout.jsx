import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="w-full md:w-[55%] px-8 md:px-16 pt-8 pb-12 flex flex-col bg-white">
        <h2 className="text-xl font-bold text-[#1368EC]">Task Manager</h2>
        <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto">
          {children}
        </div>
      </div>
      {/* Right panel */}
      <div className="hidden md:flex md:w-[45%] bg-[#1368EC] relative overflow-hidden flex-col items-center justify-center p-12">
        {/* Decorative circles */}
        <div className="absolute top-[-60px] right-[-60px] w-72 h-72 rounded-full border-[40px] border-white/10" />
        <div className="absolute bottom-[-80px] left-[-80px] w-96 h-96 rounded-full border-[50px] border-white/10" />
        {/* Floating cards */}
        <div className="relative z-10 w-full max-w-xs space-y-4">
          <div className="bg-white rounded-2xl p-4 shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs bg-violet-100 text-violet-600 px-2 py-0.5 rounded-full font-medium">Pending</span>
              <span className="text-xs bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full font-medium">Medium Priority</span>
            </div>
            <p className="font-semibold text-slate-800 text-sm">Social Media Campaign</p>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">Develop a content plan for the upcoming product launch with engaging captions.</p>
            <div className="mt-2">
              <div className="flex justify-between text-xs text-slate-500 mb-1"><span>Task Done</span><span>4/10</span></div>
              <div className="w-full bg-slate-100 rounded-full h-1.5"><div className="bg-[#1368EC] h-1.5 rounded-full" style={{width:'40%'}} /></div>
            </div>
            <div className="flex justify-between mt-3 text-xs text-slate-500">
              <span>Start: 16th Mar 2025</span>
              <span>Due: 21st Mar 2025</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-3 shadow-lg flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">AC</div>
              <div>
                <p className="text-xs font-semibold text-slate-700">Adam Cole</p>
                <p className="text-[10px] text-slate-400">adam@timetoprogram</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-lg flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-xs font-bold text-blue-600">LR</div>
              <div>
                <p className="text-xs font-semibold text-slate-700">Luke Ryan</p>
                <p className="text-[10px] text-slate-400">luke@timetoprogram</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-xl opacity-80">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs bg-violet-100 text-violet-600 px-2 py-0.5 rounded-full font-medium">Pending</span>
              <span className="text-xs bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full font-medium">High Priority</span>
            </div>
            <p className="font-semibold text-slate-800 text-sm">Design Homepage Banner</p>
            <div className="mt-2">
              <div className="w-full bg-slate-100 rounded-full h-1.5"><div className="bg-rose-400 h-1.5 rounded-full" style={{width:'20%'}} /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
