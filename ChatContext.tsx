import React, { useCallback, useMemo, useState } from "react";

export type ChatMessage = {
  id: string;
  text: string;
  sender: "me" | "them";
  createdAt: Date;
};

export type ChatThread = {
  id: string;
  name: string;
  messages: ChatMessage[];
  unread: boolean;
};

function slug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/\./g, "");
}

const seedThreads: ChatThread[] = [
  {
    id: "elias-vance",
    name: "Elias Vance",
    unread: true,
    messages: [
      { id: "1", text: "Hey, are you attending the Houdini workshop?", sender: "them", createdAt: new Date(Date.now() - 3600000 * 2) },
      { id: "2", text: "Yes, I'll be there. Looking forward to it.", sender: "me", createdAt: new Date(Date.now() - 3600000 * 1.5) },
      { id: "3", text: "Are you attending the Houdini workshop?", sender: "them", createdAt: new Date(Date.now() - 3600000 * 0.5) },
    ],
  },
  {
    id: "sira-k",
    name: "Sira K.",
    unread: false,
    messages: [
      { id: "4", text: "Thanks for connecting. Let's chat later.", sender: "them", createdAt: new Date(Date.now() - 86400000) },
    ],
  },
  {
    id: "marcus-r",
    name: "Marcus R.",
    unread: false,
    messages: [
      { id: "5", text: "The new renderer is insane.", sender: "them", createdAt: new Date(Date.now() - 86400000 * 2) },
    ],
  },
  {
    id: "creative-circle-3d",
    name: "Creative Circle: 3D",
    unread: false,
    messages: [
      { id: "6", text: "I'll be at the main stage.", sender: "them", createdAt: new Date(Date.now() - 86400000 * 3) },
    ],
  },
];

type ChatContextValue = {
  threads: ChatThread[];
  getThread: (id: string) => ChatThread | undefined;
  sendMessage: (threadId: string, text: string) => void;
  createOrGetThread: (name: string) => string;
  markThreadRead: (threadId: string) => void;
};

const ChatContext = React.createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [threads, setThreads] = useState<ChatThread[]>(seedThreads);

  const getThread = useCallback(
    (id: string) => threads.find((t) => t.id === id),
    [threads]
  );

  const sendMessage = useCallback((threadId: string, text: string) => {
    if (!text.trim()) return;
    const msg: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      text: text.trim(),
      sender: "me",
      createdAt: new Date(),
    };
    setThreads((prev) =>
      prev.map((t) =>
        t.id === threadId
          ? { ...t, messages: [...t.messages, msg], unread: false }
          : t
      )
    );
  }, []);

  const createOrGetThread = useCallback((name: string) => {
    const id = slug(name);
    setThreads((prev) => {
      const existing = prev.find((t) => t.id === id);
      if (existing) return prev;
      return [
        ...prev,
        {
          id,
          name,
          unread: false,
          messages: [],
        },
      ];
    });
    return id;
  }, []);

  const markThreadRead = useCallback((threadId: string) => {
    setThreads((prev) =>
      prev.map((t) => (t.id === threadId ? { ...t, unread: false } : t))
    );
  }, []);

  const value = useMemo<ChatContextValue>(
    () => ({
      threads,
      getThread,
      sendMessage,
      createOrGetThread,
      markThreadRead,
    }),
    [threads, getThread, sendMessage, createOrGetThread, markThreadRead]
  );

  return (
    <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = React.useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
}
