import { Screen } from "../components/Screen";
import { ArrowLeft, Share2, Link as LinkIcon, ExternalLink, MessageCircle, X, Users } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, Link } from "react-router";
import { toast } from "sonner";

export function ProfileScreen() {
  const [showConnect, setShowConnect] = useState(false);
  const navigate = useNavigate();

  return (
    <Screen title="04. Profile" darkHeader={false}>
      {/* Background Hero Image */}
      <div className="absolute top-0 left-0 w-full h-[400px] z-0">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1663941842420-8f8e27ccf882?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMGFuaW1hdGlvbiUyMHJlbmRlciUyMGFic3RyYWN0fGVufDF8fHx8MTc3MjcxMDIyNHww&ixlib=rb-4.1.0&q=80&w=1080" 
          alt="Profile Background" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/60 to-[#050505]"></div>
      </div>

      <div className="pt-16 pb-4 px-6 flex justify-between items-center relative z-20">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-black/40 border border-white/20 flex items-center justify-center backdrop-blur-md text-white/90 hover:text-white transition-colors">
          <ArrowLeft size={18} />
        </button>
        <button
          onClick={async () => {
            const url = window.location.origin + "/profile/elias-vance";
            if (navigator.share) {
              try {
                await navigator.share({ title: "Elias Vance — Playgrounds", url });
                toast.success("Profile shared");
              } catch (e) {
                if ((e as Error).name !== "AbortError") {
                  await navigator.clipboard.writeText(url);
                  toast.success("Link copied to clipboard");
                }
              }
            } else {
              await navigator.clipboard.writeText(url);
              toast.success("Link copied to clipboard");
            }
          }}
          className="w-10 h-10 rounded-full bg-black/40 border border-white/20 flex items-center justify-center backdrop-blur-md text-white/90 hover:text-white transition-colors"
        >
          <Share2 size={18} />
        </button>
      </div>

      <div className="px-6 mt-20 relative z-10 flex flex-col items-center text-center">
        <div className="w-32 h-32 rounded-full border-[6px] border-[#050505] overflow-hidden mb-6 shadow-[0_0_50px_rgba(217,70,239,0.3)] bg-zinc-900 z-20">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1638983752157-052aa1f15bf1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYXJ0aXN0JTIwcHJvZmlsZSUyMGRhcmt8ZW58MXx8fHwxNzcyNzEwMjE2fDA&ixlib=rb-4.1.0&q=80&w=1080" 
            alt="Elias Vance" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-black text-white leading-none tracking-tighter mb-4 font-serif italic">
            Elias Vance.
          </h1>
          <p className="text-xs font-bold text-fuchsia-400 uppercase tracking-widest mb-8 bg-fuchsia-400/10 px-4 py-2 rounded-full border border-fuchsia-400/20">
            3D Artist & Director
          </p>
        </div>
      </div>

      <div className="px-6 mt-2 relative z-10">
        <div className="mb-4">
          <h3 className="text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase mb-4 text-center">Expertise</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {["Blender", "Unreal Engine", "Octane Render", "Cinema 4D"].map(tag => (
              <span 
                key={tag} 
                className="text-xs font-bold px-4 py-2 rounded-2xl bg-white/5 text-white/90 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors cursor-default shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 mb-24">
          <h3 className="text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase mb-4 text-center">Portfolio & Links</h3>
          <div className="flex flex-col gap-3">
            {[
              { title: "ArtStation", link: "https://www.artstation.com", path: "artstation.com/elias", icon: <LinkIcon size={16} /> },
              { title: "Behance", link: "https://www.behance.net", path: "behance.net/eliasvance", icon: <LinkIcon size={16} /> },
              { title: "Personal Site", link: "https://eliasvance.studio", path: "eliasvance.studio", icon: <LinkIcon size={16} /> }
            ].map((item, idx) => (
              <a 
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                key={item.title} 
                className="w-full bg-[#111] hover:bg-zinc-900 border border-white/5 hover:border-white/10 rounded-3xl p-5 flex justify-between items-center group transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white/70 transition-colors ${idx === 0 ? 'bg-blue-600/20 text-blue-400' : idx === 1 ? 'bg-purple-600/20 text-purple-400' : 'bg-fuchsia-600/20 text-fuchsia-400'}`}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-[10px] text-white/50 font-mono tracking-widest uppercase">{item.path}</p>
                  </div>
                </div>
                <ExternalLink size={16} className="text-white/20 group-hover:text-white/60 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-0 left-0 w-full p-6 pb-12 bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent z-40 flex gap-4 pointer-events-none">
        <button 
          onClick={() => setShowConnect(true)}
          className="flex-1 bg-white text-black h-16 rounded-[2rem] font-bold uppercase tracking-widest text-xs hover:bg-zinc-200 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.1)] pointer-events-auto flex items-center justify-center gap-2"
        >
          <Share2 size={16} />
          Connect
        </button>
        <Link to="/messages/elias-vance" className="w-16 h-16 rounded-[2rem] bg-zinc-900 border border-white/10 flex items-center justify-center text-white hover:bg-zinc-800 transition-colors pointer-events-auto">
          <MessageCircle size={20} />
        </Link>
      </div>

      {/* Connect Overlay Modal */}
      <AnimatePresence>
        {showConnect && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col justify-end pointer-events-auto overflow-hidden bg-black/60 backdrop-blur-xl"
          >
            <div className="absolute inset-0" onClick={() => setShowConnect(false)}></div>
            
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative bg-[#0a0a0a] rounded-t-[48px] border-t border-white/10 p-8 pb-16 shadow-[0_-20px_60px_rgba(217,70,239,0.15)] w-full"
            >
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-white/10 rounded-full"></div>
              
              <button 
                onClick={() => setShowConnect(false)}
                className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>

              <h2 className="text-4xl font-black text-white leading-none tracking-tighter mb-2 font-serif italic mt-4">
                Connect.
              </h2>
              <p className="text-sm font-medium text-white/40 mb-10 tracking-wide">
                Exchange contact details with Elias.
              </p>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => {
                    toast.success("Contact saved to your phonebook");
                    setShowConnect(false);
                  }}
                  className="w-full bg-[#111] border border-white/5 hover:border-white/20 hover:bg-[#161616] rounded-3xl p-5 flex items-center gap-5 transition-all text-left group"
                >
                  <div className="w-14 h-14 rounded-[20px] bg-black border border-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/5 transition-all duration-500 shadow-inner">
                    <Users size={20} className="text-fuchsia-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight leading-none mb-1">Save Contact</h3>
                    <p className="text-[11px] text-white/40 font-mono uppercase tracking-widest">Add to your phonebook</p>
                  </div>
                </button>
                <button 
                  onClick={() => {
                    window.open("https://www.linkedin.com", "_blank", "noopener,noreferrer");
                    toast.success("Opening LinkedIn");
                    setShowConnect(false);
                  }}
                  className="w-full bg-[#111] border border-white/5 hover:border-white/20 hover:bg-[#161616] rounded-3xl p-5 flex items-center gap-5 transition-all text-left group"
                >
                  <div className="w-14 h-14 rounded-[20px] bg-black border border-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/5 transition-all duration-500 shadow-inner">
                    <LinkIcon size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight leading-none mb-1">Exchange LinkedIn</h3>
                    <p className="text-[11px] text-white/40 font-mono uppercase tracking-widest">Connect professionally</p>
                  </div>
                </button>
                <button 
                  onClick={() => {
                    setShowConnect(false);
                    navigate("/messages/elias-vance");
                  }}
                  className="w-full bg-[#111] border border-white/5 hover:border-white/20 hover:bg-[#161616] rounded-3xl p-5 flex items-center gap-5 transition-all text-left group"
                >
                  <div className="w-14 h-14 rounded-[20px] bg-black border border-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/5 transition-all duration-500 shadow-inner">
                    <MessageCircle size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight leading-none mb-1">Send Message</h3>
                    <p className="text-[11px] text-white/40 font-mono uppercase tracking-widest">Start a private conversation</p>
                  </div>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  );
}
