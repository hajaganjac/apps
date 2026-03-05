import { Screen } from "../components/Screen";
import { ArrowLeft, Search, Plus, X } from "lucide-react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, Link } from "react-router";
import { useChat } from "../context/ChatContext";

function formatThreadTime(date: Date) {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  if (diff < 86400000) return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  if (diff < 86400000 * 2) return "Yesterday";
  if (diff < 86400000 * 7) return date.toLocaleDateString([], { month: "short", day: "numeric" });
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

export function MessagesScreen() {
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { threads, createOrGetThread } = useChat();

  const sortedThreads = useMemo(() => {
    return [...threads].sort((a, b) => {
      const aLast = a.messages[a.messages.length - 1]?.createdAt?.getTime() ?? 0;
      const bLast = b.messages[b.messages.length - 1]?.createdAt?.getTime() ?? 0;
      return bLast - aLast;
    });
  }, [threads]);

  const filteredThreads = useMemo(() => {
    if (!searchQuery.trim()) return sortedThreads;
    const q = searchQuery.toLowerCase();
    return sortedThreads.filter((t) => t.name.toLowerCase().includes(q));
  }, [sortedThreads, searchQuery]);

  const startChatWith = (name: string) => {
    const threadId = createOrGetThread(name);
    setIsNewChatOpen(false);
    navigate(`/messages/${threadId}`);
  };

  return (
    <Screen title="05. Messages">
      <div className="pt-16 pb-4 px-6 flex justify-between items-center relative z-20">
        <button onClick={() => navigate("/")} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md text-white/80 hover:text-white transition-colors" aria-label="Back to home">
          <ArrowLeft size={18} />
        </button>
        <button 
          onClick={() => setIsNewChatOpen(true)}
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md text-white/80 hover:text-white transition-colors"
        >
          <Plus size={18} />
        </button>
      </div>

      <div className="px-4 pb-32 flex flex-col gap-2 mt-6">
        <div className="px-2 mb-4">
          <div className="w-full bg-zinc-900/50 border border-white/5 rounded-full px-5 py-3.5 flex items-center gap-3">
            <Search size={16} className="text-white/30" />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm text-white placeholder:text-white/30 w-full"
            />
          </div>
        </div>

        {filteredThreads.map((thread) => {
          const lastMsg = thread.messages[thread.messages.length - 1];
          const preview = lastMsg?.text ?? "No messages yet";
          const time = lastMsg ? formatThreadTime(lastMsg.createdAt) : "";
          return (
            <Link
              key={thread.id}
              to={`/messages/${thread.id}`}
              className="w-full rounded-[28px] p-5 flex items-center gap-5 relative overflow-hidden group hover:bg-[#111] border border-transparent hover:border-white/5 transition-colors cursor-pointer block"
            >
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex flex-col items-center justify-center text-white/50 font-serif italic text-lg shrink-0">
                {thread.name.charAt(0)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-end mb-1">
                  <h3 className={`text-base font-bold tracking-tight truncate ${thread.unread ? 'text-white' : 'text-white/80'}`}>
                    {thread.name}
                  </h3>
                  <span className={`text-[10px] font-mono tracking-widest uppercase shrink-0 ${thread.unread ? 'text-fuchsia-400' : 'text-white/30'}`}>
                    {time}
                  </span>
                </div>
                <p className={`text-sm truncate ${thread.unread ? 'text-white/70 font-medium' : 'text-white/40'}`}>
                  {preview}
                </p>
              </div>
              
              {thread.unread && (
                <div className="w-2 h-2 rounded-full bg-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.8)] shrink-0"></div>
              )}
            </Link>
          );
        })}
      </div>

      {/* New Message Overlay */}
      <AnimatePresence>
        {isNewChatOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/60 backdrop-blur-md flex flex-col justify-end"
          >
            <div className="flex-1" onClick={() => setIsNewChatOpen(false)} />
            <motion.div 
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 150 }}
              className="w-full bg-zinc-900 rounded-t-[40px] border-t border-white/10 p-8 pb-16 flex flex-col gap-6"
            >
              <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto -mt-4 mb-2" />
              
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-3xl font-black text-white font-serif italic tracking-tighter">New Chat.</h3>
                <button 
                  onClick={() => setIsNewChatOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="w-full bg-zinc-900/50 border border-white/10 rounded-full px-5 py-3.5 flex items-center gap-3 mb-2">
                <span className="text-white/40 font-medium text-sm">To:</span>
                <input 
                  type="text" 
                  placeholder="Type a name..." 
                  autoFocus
                  className="bg-transparent border-none outline-none text-sm text-white w-full"
                />
              </div>

              <div className="flex flex-col gap-2">
                <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-widest px-2 mb-1">Suggested</h4>
                {["Sira K.", "Leila M.", "Marcus R."].map(name => (
                  <button 
                    key={name}
                    className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-white/5 transition-colors text-left"
                    onClick={() => startChatWith(name)}
                  >
                    <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-white/5 flex items-center justify-center text-white/50 font-serif italic">
                      {name.charAt(0)}
                    </div>
                    <span className="text-white font-bold tracking-tight">{name}</span>
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
