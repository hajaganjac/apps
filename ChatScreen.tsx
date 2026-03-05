import { Screen } from "../components/Screen";
import { ArrowLeft, Send } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { useChat } from "../context/ChatContext";
import { useEmbedded } from "../context/EmbeddedContext";

function formatTime(d: Date) {
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  if (diff < 86400000) return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  if (diff < 86400000 * 2) return "Yesterday";
  if (diff < 86400000 * 7) return d.toLocaleDateString([], { weekday: "short" });
  return d.toLocaleDateString([], { month: "short", day: "numeric" });
}

function ChatContent({
  thread,
  input,
  setInput,
  handleSend,
  scrollRef,
}: {
  thread: { name: string; messages: { id: string; text: string; sender: "me" | "them"; createdAt: Date }[] };
  input: string;
  setInput: (v: string) => void;
  handleSend: () => void;
  scrollRef: React.RefObject<HTMLDivElement | null>;
}) {
  const navigate = useNavigate();

  return (
    <>
      {/* Header */}
      <div className="pt-16 pb-4 px-6 flex justify-between items-center relative z-20 shrink-0 border-b border-white/5">
        <button
          onClick={() => navigate("/messages")}
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md text-white/80 hover:text-white transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1 flex justify-center">
          <h1 className="text-lg font-bold text-white tracking-tight truncate max-w-[200px]">
            {thread.name}
          </h1>
        </div>
        <div className="w-10" />
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-6 flex flex-col gap-4 scrollbar-hide min-h-0"
      >
        {thread.messages.length === 0 && (
          <p className="text-white/40 text-sm text-center py-8">
            No messages yet. Say hello.
          </p>
        )}
        {thread.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.sender === "me"
                  ? "bg-fuchsia-500/20 border border-fuchsia-500/30 text-white rounded-br-md"
                  : "bg-zinc-800/80 border border-white/10 text-white/90 rounded-bl-md"
              }`}
            >
              <p className="text-sm font-medium leading-relaxed break-words">
                {msg.text}
              </p>
              <p className={`text-[10px] font-mono mt-1 ${msg.sender === "me" ? "text-fuchsia-400/70" : "text-white/40"}`}>
                {formatTime(msg.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="shrink-0 p-4 pb-8 pt-2 bg-gradient-to-t from-[#050505] to-transparent">
        <div className="flex items-center gap-3 bg-zinc-900/80 border border-white/10 rounded-full pl-5 pr-2 py-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder="Message..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder:text-white/40 py-2"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-10 h-10 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/30 flex items-center justify-center text-fuchsia-400 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-fuchsia-500/30 transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </>
  );
}

export function ChatScreen() {
  const { threadId } = useParams<{ threadId: string }>();
  const navigate = useNavigate();
  const embedded = useEmbedded();
  const { getThread, sendMessage, markThreadRead } = useChat();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const thread = threadId ? getThread(threadId) : undefined;

  useEffect(() => {
    if (threadId) markThreadRead(threadId);
  }, [threadId, markThreadRead]);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [thread?.messages.length]);

  const handleSend = () => {
    if (!threadId || !input.trim()) return;
    sendMessage(threadId, input);
    setInput("");
  };

  if (!threadId || !thread) {
    return (
      <Screen title="Chat">
        <div className="flex flex-col flex-1 items-center justify-center gap-4 px-6">
          <p className="text-white/50 text-sm">Conversation not found.</p>
          <button
            onClick={() => navigate("/messages")}
            className="text-fuchsia-400 font-semibold text-sm hover:text-fuchsia-300"
          >
            Back to Chats
          </button>
        </div>
      </Screen>
    );
  }

  const content = (
    <ChatContent
      thread={thread}
      input={input}
      setInput={setInput}
      handleSend={handleSend}
      scrollRef={scrollRef}
    />
  );

  if (embedded) {
    return (
      <div className="w-full flex-1 flex flex-col min-h-0 overflow-hidden">
        {content}
      </div>
    );
  }

  return <Screen title="Chat">{content}</Screen>;
}
