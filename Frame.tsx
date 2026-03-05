import React from "react";

export function Frame({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-zinc-500 font-mono text-xs tracking-widest uppercase">{title}</h2>
      <div className="w-[393px] h-[852px] bg-[#050505] rounded-[52px] overflow-hidden border-[12px] border-zinc-900 shadow-2xl relative flex flex-col">
        {/* Fake Dynamic Island / Notch */}
        <div className="absolute top-0 w-full z-50 flex justify-center pt-2 pointer-events-none">
          <div className="w-32 h-8 bg-black rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]"></div>
        </div>
        
        {/* Status Bar Fake */}
        <div className="absolute top-0 w-full h-12 z-40 flex justify-between items-center px-8 text-white text-xs font-semibold pointer-events-none">
          <span>9:41</span>
          <div className="flex items-center gap-2">
            <div className="w-4 h-3 rounded-sm bg-white"></div>
            <div className="w-4 h-3 rounded-sm bg-white"></div>
          </div>
        </div>

        <div className="w-full flex-1 overflow-y-auto overflow-x-hidden pb-12 relative scrollbar-hide">
          {children}
        </div>
      </div>
    </div>
  );
}
