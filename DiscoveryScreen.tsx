import { Screen } from "../components/Screen";
import GlareHover from "../components/GlareHover";
import { ArrowLeft, Filter, X, Check } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useNavigate } from "react-router";

const allCircles = [
    { title: "Motion Design", discipline: "Animation & VFX", count: 124 },
    { title: "Concept Art", discipline: "Illustration", count: 86 },
    { title: "3D Animation", discipline: "Animation & VFX", count: 210 },
    { title: "Game Design", discipline: "Interactive", count: 95 },
    { title: "Storyboarding", discipline: "Film & Animation", count: 42 },
    { title: "Unreal Engine", discipline: "Real-time 3D", count: 156 },
    { title: "Visual Storytelling", discipline: "Direction", count: 78 }
  ];

export function DiscoveryScreen() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const navigate = useNavigate();

  const circles =
    activeFilter === "All"
      ? allCircles
      : allCircles.filter((c) => c.discipline === activeFilter);

  return (
    <Screen title="02. Discovery">
      <div className="relative z-10 pt-16 pb-4 px-6 flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md text-white/80 hover:text-white transition-colors">
          <ArrowLeft size={18} />
        </button>
        <button 
          onClick={() => setIsFilterOpen(true)}
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md text-white/80 hover:text-white transition-colors"
        >
          <Filter size={18} />
        </button>
      </div>

      <div className="px-6 mb-10 mt-6">
        <h1 className="text-5xl font-black text-white leading-[0.9] tracking-tighter mb-4 font-serif italic drop-shadow-sm">
          Explore<br />Circles.
        </h1>
        <p className="text-white/90 text-sm font-medium tracking-wide drop-shadow-sm">
          Connect through shared creative context.
        </p>
      </div>

      <div className="relative z-10 px-4 pb-32 flex flex-col gap-3">
        {circles.map((circle, i) => {
          const slug = circle.title.toLowerCase().replace(/\s+/g, "-");
          return (
          <GlareHover
            key={i}
            width="100%"
            height="auto"
            background="transparent"
            borderRadius="28px"
            borderColor="rgba(255,255,255,0.06)"
            glareColor="#d946ef"
            glareOpacity={0.18}
            glareSize={80}
            transitionDuration={400}
            className="w-full rounded-[28px] glare-hover--fill"
          >
          <Link 
            to={`/circles/${slug}`}
            className="group relative w-full rounded-[28px] bg-[#0a0a0a] border border-white/5 p-6 overflow-hidden cursor-pointer hover:bg-[#111] transition-colors duration-500 block min-h-[140px]"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-fuchsia-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="flex justify-between items-start mb-6">
              <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase">
                {String(i + 1).padStart(3, '0')}
              </span>
              <span className="text-xs font-bold text-fuchsia-400/80 bg-fuchsia-400/10 px-3 py-1 rounded-full border border-fuchsia-400/20">
                {circle.count} members
              </span>
            </div>
            
            <h2 className="text-3xl font-black text-white tracking-tighter leading-none mb-3 group-hover:text-fuchsia-300 transition-colors duration-300">
              {circle.title}
            </h2>
            <div className="text-sm font-medium text-white/50 uppercase tracking-widest">
              {circle.discipline}
            </div>
          </Link>
          </GlareHover>
          );
        })}
      </div>

      {/* Bottom Navigation (Fixed) */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent z-30 pointer-events-none"></div>

      {/* Filter Bottom Sheet Overlay */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col justify-end"
          >
            <div className="flex-1" onClick={() => setIsFilterOpen(false)} />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full bg-[#0a0a0a] rounded-t-[40px] border-t border-white/10 p-8 pb-16 flex flex-col gap-6"
            >
              <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto -mt-2 mb-4" />
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-3xl font-serif italic font-black text-white tracking-tighter">Disciplines.</h2>
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {["All", "Animation & VFX", "Illustration", "Interactive", "Film & Animation", "Real-time 3D", "Direction"].map(discipline => (
                  <button
                    key={discipline}
                    onClick={() => {
                      setActiveFilter(discipline);
                      setTimeout(() => setIsFilterOpen(false), 300);
                    }}
                    className={`w-full flex justify-between items-center px-6 py-4 rounded-2xl border transition-all duration-300 ${
                      activeFilter === discipline 
                        ? "bg-fuchsia-500/10 border-fuchsia-500/30 text-white" 
                        : "bg-white/5 border-transparent text-white/60 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span className="font-medium text-sm tracking-wide">{discipline}</span>
                    {activeFilter === discipline && <Check size={18} className="text-fuchsia-400" />}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  );
}
