import { Screen } from "../components/Screen";
import { ArrowLeft, Navigation } from "lucide-react";
import { useNavigate, Link } from "react-router";
import { useChat } from "../context/ChatContext";

export function FindFriendsScreen() {
  const navigate = useNavigate();
  const { threads } = useChat();
  const friends = threads.filter((t) => !t.name.startsWith("Creative Circle:"));

  return (
    <Screen title="Find Friends">
      <div className="pt-16 pb-4 px-6 flex justify-between items-center relative z-20">
        <button
          onClick={() => navigate("/")}
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md text-white/80 hover:text-white transition-colors"
          aria-label="Back to home"
        >
          <ArrowLeft size={18} />
        </button>
      </div>

      <div className="px-6 mb-8">
        <h1 className="text-4xl font-black text-white leading-[0.95] tracking-tighter font-serif italic mb-2">
          Find<br />Friends.
        </h1>
        <p className="text-white/70 text-sm font-medium tracking-wide">
          See how far your festival friends are and find each other.
        </p>
      </div>

      <div className="px-4 pb-32 flex flex-col gap-3">
        {friends.length === 0 ? (
          <div className="rounded-2xl bg-white/5 border border-white/10 p-8 text-center">
            <Navigation size={40} className="text-white/30 mx-auto mb-3" />
            <p className="text-white/60 text-sm">Add friends from circles or messages to track them here.</p>
          </div>
        ) : (
          friends.map((thread) => (
            <Link
              key={thread.id}
              to={`/find/${thread.id}`}
              className="flex items-center gap-4 w-full rounded-[28px] bg-[#0a0a0a] border border-white/5 p-5 hover:bg-[#111] hover:border-white/10 transition-colors group"
            >
              <div className="w-12 h-12 rounded-2xl bg-fuchsia-500/20 border border-fuchsia-500/30 flex items-center justify-center text-fuchsia-400 shrink-0">
                <Navigation size={22} />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold text-white tracking-tight group-hover:text-fuchsia-300 transition-colors">
                  {thread.name}
                </h2>
                <p className="text-xs text-white/50">Tap to track location</p>
              </div>
              <span className="text-white/30 group-hover:text-fuchsia-400 transition-colors">→</span>
            </Link>
          ))
        )}
      </div>
    </Screen>
  );
}
