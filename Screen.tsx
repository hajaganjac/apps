import React from "react";
import { useEmbedded } from "../context/EmbeddedContext";

export function Screen({ children, title, darkHeader = true }: { children: React.ReactNode; title: string, darkHeader?: boolean }) {
  const embedded = useEmbedded();

  if (embedded) {
    return (
      <div className="w-full flex-1 flex flex-col min-h-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative scrollbar-hide">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 shrink-0">
      <h2 className="text-zinc-500 font-mono text-xs tracking-widest uppercase ml-4">{title}</h2>
      <div className="w-[393px] h-[852px] bg-[#050505] rounded-[52px] overflow-hidden border-[12px] border-zinc-900 shadow-2xl relative flex flex-col group">
        
        {/* Fake Dynamic Island */}
        <div className="absolute top-2 w-full z-[100] flex justify-center pointer-events-none">
          <div className="w-[126px] h-[36px] bg-black rounded-full shadow-[0_0_15px_rgba(0,0,0,0.8)]"></div>
        </div>
        
        {/* Status Bar Fake */}
        <div className={`absolute top-0 w-full h-12 z-[90] flex justify-between items-center px-8 text-[13px] font-semibold pointer-events-none ${darkHeader ? 'text-white drop-shadow-md' : 'text-black'}`}>
          <span>9:41</span>
          <div className="flex items-center gap-1.5 opacity-80">
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 3H2C1.44772 3 1 3.44772 1 4V10C1 10.5523 1.44772 11 2 11H16C16.5523 11 17 10.5523 17 10V4C17 3.44772 16.5523 3 16 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 3V2C2 1.44772 2.44772 1 3 1H15C15.5523 1 16 1.44772 16 2V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 11H15V8.5C15 8.22386 14.7761 8 14.5 8H1.5C1.22386 8 1 8.22386 1 8.5V11Z" fill="currentColor"/>
              <path d="M1 8H15V5.5C15 5.22386 14.7761 5 14.5 5H1.5C1.22386 5 1 5.22386 1 5.5V8Z" fill="currentColor" fillOpacity="0.7"/>
              <path d="M1 5H15V2.5C15 2.22386 14.7761 2 14.5 2H1.5C1.22386 2 1 2.22386 1 2.5V5Z" fill="currentColor" fillOpacity="0.4"/>
            </svg>
          </div>
        </div>

        <div className="w-full flex-1 overflow-y-auto overflow-x-hidden relative scrollbar-hide">
          {children}
        </div>
      </div>
    </div>
  );
}
