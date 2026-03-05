import { Screen } from "../components/Screen";
import { ArrowLeft, Calendar, MapPin, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router";
import { UPCOMING_EVENTS } from "../data/playgroundsContent";

const typeLabels: Record<string, string> = {
  festival: "Festival",
  workshop: "Workshop",
  talent: "Talent Program",
  conference: "Conference",
};

export function EventsScreen() {
  const navigate = useNavigate();

  return (
    <Screen title="Events">
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
          Upcoming<br />Events.
        </h1>
        <p className="text-white/70 text-sm font-medium tracking-wide">
          Festivals, workshops and talent programs from We Are Playgrounds.
        </p>
      </div>

      <div className="px-4 pb-32 flex flex-col gap-3">
        {UPCOMING_EVENTS.map((event) => (
          <a
            key={event.id}
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-[28px] bg-[#0a0a0a] border border-white/5 p-5 overflow-hidden hover:bg-[#111] hover:border-white/10 transition-colors group"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 min-w-0">
                <span className="inline-block text-[10px] font-bold text-fuchsia-400/90 bg-fuchsia-400/10 px-2.5 py-1 rounded-full border border-fuchsia-400/20 mb-3 uppercase tracking-wider">
                  {typeLabels[event.type] ?? event.type}
                </span>
                <h2 className="text-xl font-black text-white tracking-tight leading-tight mb-2 group-hover:text-fuchsia-300 transition-colors">
                  {event.title}
                </h2>
                <p className="text-sm text-white/60 leading-snug mb-3">
                  {event.description}
                </p>
                <div className="flex flex-wrap gap-4 text-xs text-white/50">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} />
                    {event.dateLabel}
                  </span>
                  {event.location && (
                    <span className="flex items-center gap-1.5">
                      <MapPin size={12} />
                      {event.location}
                    </span>
                  )}
                </div>
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
