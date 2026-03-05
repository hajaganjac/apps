import { Screen } from "../components/Screen";
import DarkVeil from "../components/DarkVeil";
import GlareHover from "../components/GlareHover";
import { Search, MapPin, Calendar, Compass, ArrowUpRight, X, Newspaper } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useNavigate } from "react-router";
import { useEmbedded } from "../context/EmbeddedContext";
import { toast } from "sonner";
import { ABOUT, UPCOMING_EVENTS, NEWS_ITEMS } from "../data/playgroundsContent";

export function HomeScreen() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const embedded = useEmbedded();
  const navigate = useNavigate();
  const heroImg = "https://images.unsplash.com/photo-1771873679931-992e80181419?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMG5lb24lMjBjaW5lbWF0aWMlMjBkYXJrfGVufDF8fHx8MTc3MjcxMDIxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
  
  return (
    <Screen title="01. Home">
      {/* Header / Nav */}
      <div className="pt-16 pb-4 px-6 flex justify-between items-center relative z-20">
        <Link to="/" className="text-white font-serif italic text-2xl font-black tracking-tighter mix-blend-difference hover:opacity-90 transition-opacity">
          PLAYGROUNDS.
        </Link>
        <button 
          onClick={() => setIsSearchOpen(true)}
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md text-white/80 hover:text-white transition-colors"
        >
          <Search size={18} />
        </button>
      </div>

      {/* Hero Card */}
      <div className="px-4 mb-10">
        <GlareHover
          width="100%"
          height="var(--hero-height)"
          background="transparent"
          borderRadius="36px"
          borderColor="rgba(255,255,255,0.06)"
          glareColor="#a855f7"
          glareOpacity={0.25}
          glareSize={120}
          transitionDuration={500}
          className="w-full rounded-[36px] glare-hover--fill"
          style={{ height: "var(--hero-height)" }}
        >
        <div className="relative w-full rounded-[36px] overflow-hidden group border border-white/5" style={{ height: "var(--hero-height)" }}>
          <ImageWithFallback 
            src={heroImg} 
            alt="Playgrounds Hero" 
            className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 pointer-events-none">
            <DarkVeil
              hueShift={0}
              noiseIntensity={0}
              scanlineIntensity={0}
              speed={0.5}
              scanlineFrequency={0}
              warpAmount={0}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/20 to-[#050505]/95 backdrop-blur-[2px] pointer-events-none"></div>
          
          <div className="absolute bottom-0 left-0 p-8 w-full z-10">
            <div className="flex gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-fuchsia-500/30 text-[10px] uppercase tracking-widest text-fuchsia-400 font-bold shadow-[0_0_15px_rgba(217,70,239,0.3)]">
                Upcoming
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white leading-[0.85] tracking-tighter mb-4 uppercase drop-shadow-2xl font-serif italic">
              The Art<br />Department
            </h1>
            <p className="text-sm text-white/80 font-medium drop-shadow-md mb-4 max-w-[280px]">
              Design & craftsmanship in film, animation and games.
            </p>
            <div className="flex flex-wrap gap-5 text-xs font-semibold text-white/80 tracking-wide uppercase">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-purple-400" />
                <span>Eindhoven, NL</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-fuchsia-400" />
                <span>15 – 17 Apr 2026</span>
              </div>
            </div>
          </div>
        </div>
        </GlareHover>
      </div>

      {/* About + Events CTA */}
      <div className="px-6 mb-10 relative z-20">
        <p className="text-white/70 text-sm leading-relaxed mb-6">
          {ABOUT.tagline}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/40 text-fuchsia-300 font-bold text-sm hover:bg-fuchsia-500/30 transition-colors"
          >
            Upcoming events <ArrowUpRight size={14} />
          </Link>
          <a
            href={ABOUT.replayUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white/80 font-medium text-sm hover:bg-white/10 transition-colors"
          >
            Watch RePlay
          </a>
        </div>
      </div>

      {/* Upcoming events preview */}
      <div className="px-6 mb-8 flex justify-between items-end relative z-20">
        <h2 className="text-2xl font-black text-white tracking-tighter leading-none font-serif italic">
          Upcoming.
        </h2>
        <Link to="/events" className="text-[10px] font-bold text-fuchsia-400 flex items-center gap-1 uppercase tracking-widest mb-1 hover:text-fuchsia-300 transition-colors">
          All events <ArrowUpRight size={14} />
        </Link>
      </div>
      <div className="px-6 pb-6 flex gap-4 overflow-x-auto scrollbar-hide relative z-20">
        {UPCOMING_EVENTS.slice(0, 3).map((event) => (
          <a
            key={event.id}
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="min-w-[260px] rounded-2xl bg-[#0a0a0a] border border-white/5 p-4 hover:bg-[#111] hover:border-white/10 transition-colors block"
          >
            <span className="text-[10px] font-mono text-fuchsia-400/80 uppercase tracking-wider">{event.dateLabel}</span>
            <h3 className="text-lg font-bold text-white tracking-tight mt-1 line-clamp-2">{event.title}</h3>
            <p className="text-xs text-white/50 mt-2 line-clamp-2">{event.description}</p>
          </a>
        ))}
      </div>

      {/* Creative Circles Section */}
      <div className="px-6 mb-6 flex justify-between items-end relative z-20">
        <h2 className="text-3xl font-black text-white tracking-tighter leading-none font-serif italic">
          Creative<br/>
          <span className="text-white/40 font-sans not-italic font-medium tracking-tight">Circles</span>
        </h2>
        <Link to="/discovery" className="text-[10px] font-bold text-fuchsia-400 flex items-center gap-1 uppercase tracking-widest mb-1 hover:text-fuchsia-300 transition-colors">
          View All <ArrowUpRight size={14} />
        </Link>
      </div>

      {/* Horizontal Scroll for Circles */}
      <div className="flex gap-4 overflow-x-auto px-6 pb-6 snap-x snap-mandatory scrollbar-hide">
        {[
          {
            title: "Motion Design",
            count: 124,
            tags: ["Cinema 4D", "After Effects", "Houdini"],
            color: "from-purple-600/30 to-fuchsia-600/10",
            glow: "shadow-[0_0_30px_rgba(168,85,247,0.15)]"
          },
          {
            title: "Concept Art",
            count: 86,
            tags: ["Procreate", "Photoshop", "Blender"],
            color: "from-blue-600/30 to-purple-600/10",
            glow: "shadow-[0_0_30px_rgba(59,130,246,0.15)]"
          },
          {
            title: "3D Animation",
            count: 210,
            tags: ["Maya", "Unreal", "Rigging"],
            color: "from-fuchsia-600/30 to-orange-500/10",
            glow: "shadow-[0_0_30px_rgba(236,72,153,0.15)]"
          }
        ].map((circle, i) => {
          const slug = circle.title.toLowerCase().replace(/\s+/g, "-");
          return (
          <GlareHover
            key={i}
            width="280px"
            height="240px"
            background="transparent"
            borderRadius="32px"
            borderColor="rgba(255,255,255,0.08)"
            glareColor="#c084fc"
            glareOpacity={0.2}
            glareSize={100}
            transitionDuration={400}
            className="rounded-[32px] snap-center block"
            style={{ minWidth: "var(--card-min-w)", height: "var(--card-height)" }}
          >
          <Link to={`/circles/${slug}`} className={`rounded-[32px] snap-center bg-zinc-900/40 backdrop-blur-xl border border-white/10 p-6 flex flex-col justify-between relative overflow-hidden group ${circle.glow} block w-full h-full`} style={{ minWidth: "var(--card-min-w)", height: "var(--card-height)" }}>
            <div className={`absolute -top-16 -right-16 w-48 h-48 bg-gradient-to-br ${circle.color} blur-[50px] rounded-full group-hover:scale-150 transition-transform duration-700 ease-out`}></div>
            <div className="relative z-10">
              <div className="text-white/30 text-xs font-mono mb-3">{String(i+1).padStart(2, '0')}</div>
              <h3 className="text-3xl font-bold text-white leading-tight tracking-tighter mb-2">{circle.title}</h3>
              <div className="text-sm text-fuchsia-300/80 font-medium">{circle.count} creatives</div>
            </div>
            <div className="relative z-10 flex flex-wrap gap-2">
              {circle.tags.map(tag => (
                <span key={tag} className="text-[11px] font-semibold px-3 py-1.5 rounded-lg bg-black/40 text-white/80 border border-white/10 backdrop-blur-md">
                  {tag}
                </span>
              ))}
            </div>
          </Link>
          </GlareHover>
          );
        })}
      </div>

      {/* News preview */}
      <div className="px-6 mb-6 flex justify-between items-end relative z-20 mt-4">
        <h2 className="text-2xl font-black text-white tracking-tighter leading-none font-serif italic">
          News.
        </h2>
        <Link to="/news" className="text-[10px] font-bold text-fuchsia-400 flex items-center gap-1 uppercase tracking-widest mb-1 hover:text-fuchsia-300 transition-colors">
          All news <ArrowUpRight size={14} />
        </Link>
      </div>
      <div className="px-6 pb-32 flex flex-col gap-3 relative z-20">
        {NEWS_ITEMS.slice(0, 3).map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 w-full rounded-2xl bg-[#0a0a0a] border border-white/5 p-4 hover:bg-[#111] hover:border-white/10 transition-colors group"
          >
            <span className="shrink-0 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/50 group-hover:text-fuchsia-400 transition-colors">
              <Newspaper size={18} />
            </span>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-white tracking-tight line-clamp-1 group-hover:text-fuchsia-300 transition-colors">{item.title}</h3>
              <p className="text-xs text-white/45 line-clamp-1 mt-0.5">{item.excerpt}</p>
            </div>
            <ArrowUpRight size={14} className="shrink-0 text-white/30 group-hover:text-fuchsia-400 transition-colors" />
          </a>
        ))}
      </div>

      {/* Bottom Navigation (only in Figma frame preview) */}
      {!embedded && (
        <>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-30 pointer-events-none"></div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-[#111]/90 backdrop-blur-2xl border border-white/10 rounded-full px-8 py-4 flex gap-10 z-40 shadow-2xl items-center">
            <button onClick={() => navigate("/")} className="text-white hover:opacity-80 transition-opacity" aria-label="Home"><Compass size={24} strokeWidth={2} /></button>
            <button onClick={() => setIsSearchOpen(true)} className="text-white/40 hover:text-white transition-colors" aria-label="Search"><Search size={24} strokeWidth={2} /></button>
            <button onClick={() => navigate("/")} className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-fuchsia-500 p-[2px] hover:opacity-90 transition-opacity" aria-label="Home">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-purple-500 to-fuchsia-500"></div>
              </div>
            </button>
          </div>
        </>
      )}

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-50 bg-[#050505]/95 backdrop-blur-2xl flex flex-col pt-16 px-6"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-serif italic font-black text-white tracking-tighter">Search.</h2>
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="w-full bg-zinc-900/50 border border-fuchsia-500/30 rounded-full px-6 py-4 flex items-center gap-4 mb-10 shadow-[0_0_20px_rgba(217,70,239,0.1)]">
              <Search size={20} className="text-fuchsia-400" />
              <input 
                type="text" 
                placeholder="Find circles, events, or creatives..." 
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setIsSearchOpen(false);
                  navigate("/discovery");
                  toast.success(`Searching for "${searchQuery || "everything"}"`);
                }
              }}
                className="bg-transparent border-none outline-none text-base text-white placeholder:text-white/40 w-full"
              />
            </div>
            
            <div className="flex-1">
              <h3 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-4">Trending</h3>
              <div className="flex flex-wrap gap-3 mb-6">
                {["#Houdini", "Concept Art", "Main Stage", "Networking", "After Effects"].map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false);
                      navigate("/discovery");
                      toast.success(`Exploring ${tag}`);
                    }}
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/80 text-sm font-medium hover:bg-white/10 hover:border-fuchsia-500/30 transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-3">Quick links</h3>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => { setIsSearchOpen(false); navigate("/events"); }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/90 text-sm font-medium hover:bg-white/10 text-left"
                >
                  Upcoming events <ArrowUpRight size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => { setIsSearchOpen(false); navigate("/news"); }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/90 text-sm font-medium hover:bg-white/10 text-left"
                >
                  News <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  );
}
