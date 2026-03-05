import { Screen } from "../components/Screen";
import { ArrowLeft, MoreHorizontal, Users, Sparkles, MessageCircle, UserPlus, X } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useParams, Link } from "react-router";
import { useChat } from "../context/ChatContext";
import { toast } from "sonner";

const circleTitles: Record<string, { title: string; subtitle: string }> = {
  "motion-design": { title: "Motion Design", subtitle: "Creatives in motion graphics, VFX, and animation." },
  "concept-art": { title: "Concept Art", subtitle: "Visual development and concept artists." },
  "3d-animation": { title: "3D Animation", subtitle: "Creatives specialized in rigging, modeling, and moving imagery." },
  "game-design": { title: "Game Design", subtitle: "Interactive and game experience designers." },
  "storyboarding": { title: "Storyboarding", subtitle: "Storyboard and pre-vis artists." },
  "unreal-engine": { title: "Unreal Engine", subtitle: "Real-time 3D and Unreal specialists." },
  "visual-storytelling": { title: "Visual Storytelling", subtitle: "Directors and visual storytellers." },
};

export function CircleDetailScreen() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [joined, setJoined] = useState(false);
  const navigate = useNavigate();
  const { createOrGetThread } = useChat();
  const { circleId } = useParams<{ circleId: string }>();
  const circleMeta = circleId ? circleTitles[circleId] : null;
  const displayTitle = circleMeta?.title ?? "3D Animation.";
  const displaySubtitle = circleMeta?.subtitle ?? "Creatives specialized in rigging, modeling, and moving imagery.";

  const attendees = [
    {
      name: "Elias Vance",
      discipline: "3D Artist",
      tags: ["Blender", "Unreal Engine", "Octane"],
      photo: "https://images.unsplash.com/photo-1638983752157-052aa1f15bf1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYXJ0aXN0JTIwcHJvZmlsZSUyMGRhcmt8ZW58MXx8fHwxNzcyNzEwMjE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      featured: true
    },
    {
      name: "Sira K.",
      discipline: "Concept Artist",
      tags: ["Photoshop", "Procreate", "ZBrush"],
      photo: "https://images.unsplash.com/photo-1601637155580-ac6c49428450?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHBvcnRyYWl0JTIwbmVvbiUyMGxpZ2h0aW5nfGVufDF8fHx8MTc3MjcxMDIyMHww&ixlib=rb-4.1.0&q=80&w=1080",
      featured: false
    },
    {
      name: "Marcus R.",
      discipline: "Animator",
      tags: ["Maya", "Nuke", "Storyboarding"],
      photo: "https://images.unsplash.com/photo-1663941842420-8f8e27ccf882?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMGFuaW1hdGlvbiUyMHJlbmRlciUyMGFic3RyYWN0fGVufDF8fHx8MTc3MjcxMDIyNHww&ixlib=rb-4.1.0&q=80&w=1080",
      featured: false
    },
    {
      name: "Leila M.",
      discipline: "VFX Supervisor",
      tags: ["Houdini", "Redshift", "Pipeline"],
      photo: null,
      featured: false
    }
  ];

  return (
    <Screen title="03. Circle Detail">
      {/* Header */}
      <div className="pt-16 pb-4 px-6 flex justify-between items-center relative z-20">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md text-white/80 hover:text-white transition-colors">
          <ArrowLeft size={18} />
        </button>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <Users size={14} className="text-purple-400" />
          <span className="text-xs font-bold text-white tracking-widest">210</span>
        </div>
      </div>

      {/* Title Area */}
      <div className="px-6 mb-12 mt-4 relative">
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-fuchsia-600/20 blur-[60px] rounded-full pointer-events-none"></div>
        <h1 className="text-5xl font-black text-white leading-[0.9] tracking-tighter mb-4 font-serif italic relative z-10">
          {displayTitle.includes(" ") ? (
            <>{(displayTitle.split(" ").slice(0, -1).join(" "))}<br />{displayTitle.split(" ").slice(-1)[0]}.</>
          ) : (
            <>{displayTitle}.</>
          )}
        </h1>
        <p className="text-white/40 text-sm font-medium tracking-wide max-w-[280px]">
          {displaySubtitle}
        </p>
        
        <button
          onClick={() => {
            setJoined((j) => !j);
            toast.success(joined ? "Left circle" : "Joined circle");
          }}
          className={`mt-8 w-full py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-colors ${
            joined
              ? "bg-fuchsia-500/20 border border-fuchsia-500/30 text-fuchsia-300"
              : "bg-white text-black hover:bg-zinc-200"
          }`}
        >
          {joined ? "Joined" : "Join Circle"}
        </button>
      </div>

      {/* Grid of Attendees */}
      <div className="px-4 pb-32 flex flex-col gap-4 relative z-20">
        <div className="flex items-center gap-2 mb-2 px-2">
          <Sparkles size={16} className="text-fuchsia-500" />
          <h3 className="text-white font-bold text-sm tracking-widest uppercase">Members</h3>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {attendees.map((person, i) => (
            <div 
              key={i} 
              className={`w-full rounded-[32px] p-6 flex flex-col gap-6 relative overflow-hidden group border ${person.featured ? 'bg-[#111] border-fuchsia-500/30 shadow-[0_0_30px_rgba(217,70,239,0.1)]' : 'bg-zinc-900/40 border-white/5 hover:bg-zinc-900/60'}`}
            >
              {person.featured && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/20 blur-[40px] rounded-full"></div>
              )}
              
              <div className="flex justify-between items-start z-10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-zinc-800 overflow-hidden border-2 border-white/10 shrink-0 relative">
                    {person.photo ? (
                      <ImageWithFallback src={person.photo} alt={person.name} className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/20 font-serif italic text-xl">?</div>
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white tracking-tighter leading-none mb-1">{person.name}</h2>
                    <p className="text-xs font-medium text-white/50 uppercase tracking-widest">{person.discipline}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedUser(person.name)}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                >
                  <MoreHorizontal size={16} />
                </button>
              </div>

              {/* Skill Tags - Dominating Visual Hierarchy */}
              <div className="flex flex-wrap gap-2 z-10">
                {person.tags.map(tag => (
                  <span 
                    key={tag} 
                    className={`text-xs font-bold px-4 py-2 rounded-xl backdrop-blur-md ${person.featured ? 'bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-500/20' : 'bg-white/5 text-white/80 border border-white/10'}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Action Sheet Overlay */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/60 backdrop-blur-md flex flex-col justify-end"
          >
            <div className="flex-1" onClick={() => setSelectedUser(null)} />
            <motion.div 
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 150 }}
              className="w-full bg-zinc-900 rounded-t-[40px] border-t border-white/10 p-8 pb-16 flex flex-col gap-6"
            >
              <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto -mt-4 mb-2" />
              
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">{selectedUser}</h3>
                <button 
                  onClick={() => setSelectedUser(null)}
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => {
                    toast.success(`Connection request sent to ${selectedUser}`);
                    setSelectedUser(null);
                  }}
                  className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl bg-fuchsia-600/20 text-fuchsia-300 border border-fuchsia-500/30 hover:bg-fuchsia-600/30 transition-all font-bold tracking-wide"
                >
                  <UserPlus size={20} /> Connect
                </button>
                <button 
                  onClick={() => {
                    if (selectedUser) {
                      const threadId = createOrGetThread(selectedUser);
                      setSelectedUser(null);
                      navigate(`/messages/${threadId}`);
                    }
                  }}
                  className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 text-white/80 border border-white/10 hover:bg-white/10 transition-all font-bold tracking-wide"
                >
                  <MessageCircle size={20} /> Direct Message
                </button>
                <Link
                  to={`/profile/${selectedUser.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "")}`}
                  onClick={() => setSelectedUser(null)}
                  className="w-full mt-4 text-white/40 text-sm font-semibold tracking-wide hover:text-white transition-colors py-2 text-center"
                >
                  View Full Profile
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  );
}
