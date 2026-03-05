import { Screen } from "../components/Screen";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router";
import { NEWS_ITEMS } from "../data/playgroundsContent";

export function NewsScreen() {
  const navigate = useNavigate();

  return (
    <Screen title="News">
      <div className="pt-16 pb-4 px-6 flex justify-between items-center relative z-20">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md text-white/80 hover:text-white transition-colors"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>
      </div>

      <div className="px-6 mb-8">
        <h1 className="text-4xl font-black text-white leading-[0.95] tracking-tighter font-serif italic mb-2">
          News.
        </h1>
        <p className="text-white/70 text-sm font-medium tracking-wide">
          Updates, open calls and stories from We Are Playgrounds.
        </p>
      </div>

      <div className="px-4 pb-32 flex flex-col gap-3">
        {NEWS_ITEMS.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-[28px] bg-[#0a0a0a] border border-white/5 p-5 overflow-hidden hover:bg-[#111] hover:border-white/10 transition-colors group"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold text-white tracking-tight leading-snug mb-2 group-hover:text-fuchsia-300 transition-colors">
                  {item.title}
                </h2>
                <p className="text-sm text-white/50 leading-snug">
                  {item.excerpt}
                </p>
              </div>
              <span className="shrink-0 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 group-hover:text-fuchsia-400 group-hover:border-fuchsia-400/30 transition-colors">
                <ExternalLink size={16} />
              </span>
            </div>
          </a>
        ))}
      </div>
    </Screen>
  );
}
