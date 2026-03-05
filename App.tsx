import React from "react";
import { HomeScreen } from "./screens/HomeScreen";
import { DiscoveryScreen } from "./screens/DiscoveryScreen";
import { CircleDetailScreen } from "./screens/CircleDetailScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { MessagesScreen } from "./screens/MessagesScreen";
import { Sparkles, Navigation, Smartphone } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] overflow-auto p-12 flex flex-col items-center selection:bg-fuchsia-500/30 selection:text-white pb-32" style={{ backgroundImage: 'radial-gradient(#ffffff1a 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      {/* Figma-like Canvas Header */}
      <div className="w-full max-w-[2400px] mb-12 flex justify-between items-end border-b border-zinc-900 pb-8 sticky top-0 bg-[#050505]/80 backdrop-blur-xl z-[999] pt-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-6 h-6 rounded bg-fuchsia-600 flex items-center justify-center">
              <Sparkles size={12} className="text-white" />
            </div>
            <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest font-bold">Project / Playgrounds</span>
          </div>
          <h1 className="text-3xl font-serif italic font-black text-white tracking-tighter">
            Festival App Interface
          </h1>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs uppercase tracking-widest bg-zinc-900/50 px-3 py-1.5 rounded-md border border-white/5 cursor-pointer hover:text-white transition-colors">
            100%
          </div>
          <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs uppercase tracking-widest">
            <Navigation size={14} /> View mode
          </div>
          <div className="flex items-center gap-2 text-white font-mono text-xs uppercase tracking-widest bg-zinc-900 px-4 py-2 rounded-full border border-zinc-800">
            <Smartphone size={14} className="text-fuchsia-400" />
            <span>5 Screens</span>
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="w-full max-w-[2400px] overflow-x-auto pb-16 snap-x snap-mandatory px-4 scrollbar-hide">
        <div className="relative flex gap-24 w-max">
          
          {/* SVG Connections showing user flow */}
          <svg className="absolute top-0 left-0 w-[2400px] h-[900px] pointer-events-none z-[-1]">
            <defs>
              <linearGradient id="flow-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d946ef" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.6" />
              </linearGradient>
              <linearGradient id="flow-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#d946ef" stopOpacity="0.6" />
              </linearGradient>
              <linearGradient id="flow-gradient-3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d946ef" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
              </linearGradient>
            </defs>

            {/* Path from Home to Discovery */}
            <path 
              d="M 393 450 C 440 450, 440 300, 489 300" 
              fill="none" 
              stroke="url(#flow-gradient-1)" 
              strokeWidth="3" 
              strokeDasharray="6 6" 
            />

            {/* Path from Discovery to Circle Detail */}
            <path 
              d="M 882 450 C 930 450, 930 450, 978 450" 
              fill="none" 
              stroke="url(#flow-gradient-2)" 
              strokeWidth="3" 
              strokeDasharray="6 6" 
            />

            {/* Path from Circle Detail to Profile */}
            <path 
              d="M 1371 450 C 1420 450, 1420 300, 1467 300" 
              fill="none" 
              stroke="url(#flow-gradient-3)" 
              strokeWidth="3" 
              strokeDasharray="6 6" 
            />
            
            {/* Path from Profile to Messages */}
            <path 
              d="M 1860 450 C 1910 450, 1910 450, 1956 450" 
              fill="none" 
              stroke="#3b82f6" 
              strokeOpacity="0.6"
              strokeWidth="3" 
              strokeDasharray="6 6" 
            />
          </svg>

          <div className="snap-start shrink-0 hover:-translate-y-2 transition-transform duration-500 relative">
            <HomeScreen />
            <div className="absolute -right-[12px] top-[450px] w-6 h-6 rounded-full bg-zinc-900 border-2 border-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,0.5)] z-10 hidden lg:flex items-center justify-center -translate-y-1/2"><div className="w-2 h-2 rounded-full bg-fuchsia-400"></div></div>
          </div>
          
          <div className="snap-start shrink-0 hover:-translate-y-2 transition-transform duration-500 relative mt-[-150px]">
            <div className="absolute -left-[12px] top-[450px] w-6 h-6 rounded-full bg-zinc-900 border-2 border-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,0.5)] z-10 hidden lg:flex items-center justify-center -translate-y-1/2"><div className="w-2 h-2 rounded-full bg-fuchsia-400"></div></div>
            <DiscoveryScreen />
            <div className="absolute -right-[12px] top-[600px] w-6 h-6 rounded-full bg-zinc-900 border-2 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] z-10 hidden lg:flex items-center justify-center -translate-y-1/2"><div className="w-2 h-2 rounded-full bg-purple-400"></div></div>
          </div>
          
          <div className="snap-start shrink-0 hover:-translate-y-2 transition-transform duration-500 relative">
            <div className="absolute -left-[12px] top-[450px] w-6 h-6 rounded-full bg-zinc-900 border-2 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] z-10 hidden lg:flex items-center justify-center -translate-y-1/2"><div className="w-2 h-2 rounded-full bg-purple-400"></div></div>
            <CircleDetailScreen />
            <div className="absolute -right-[12px] top-[450px] w-6 h-6 rounded-full bg-zinc-900 border-2 border-fuchsia-500 shadow-[0_0_15px_rgba(236,72,153,0.5)] z-10 hidden lg:flex items-center justify-center -translate-y-1/2"><div className="w-2 h-2 rounded-full bg-fuchsia-400"></div></div>
          </div>
          
          <div className="snap-start shrink-0 hover:-translate-y-2 transition-transform duration-500 relative mt-[-150px]">
            <div className="absolute -left-[12px] top-[450px] w-6 h-6 rounded-full bg-zinc-900 border-2 border-fuchsia-500 shadow-[0_0_15px_rgba(236,72,153,0.5)] z-10 hidden lg:flex items-center justify-center -translate-y-1/2"><div className="w-2 h-2 rounded-full bg-fuchsia-400"></div></div>
            <ProfileScreen />
            <div className="absolute -right-[12px] top-[600px] w-6 h-6 rounded-full bg-zinc-900 border-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] z-10 hidden lg:flex items-center justify-center -translate-y-1/2"><div className="w-2 h-2 rounded-full bg-blue-400"></div></div>
          </div>
          
          <div className="snap-start shrink-0 hover:-translate-y-2 transition-transform duration-500 relative">
            <div className="absolute -left-[12px] top-[450px] w-6 h-6 rounded-full bg-zinc-900 border-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] z-10 hidden lg:flex items-center justify-center -translate-y-1/2"><div className="w-2 h-2 rounded-full bg-blue-400"></div></div>
            <MessagesScreen />
          </div>
        </div>
      </div>
    </div>
  );
}
