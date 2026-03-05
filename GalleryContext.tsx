import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

const STORAGE_KEY = "playgrounds-festival-gallery";

export type GalleryEntry = {
  id: string;
  dataUrl: string;
  createdAt: number;
};

type GalleryContextValue = {
  contributions: GalleryEntry[];
  addContribution: (dataUrl: string) => GalleryEntry;
};

function loadFromStorage(): GalleryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as GalleryEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveToStorage(entries: GalleryEntry[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // ignore
  }
}

const GalleryContext = createContext<GalleryContextValue | null>(null);

export function GalleryProvider({ children }: { children: React.ReactNode }) {
  const [contributions, setContributions] = useState<GalleryEntry[]>(loadFromStorage);

  const addContribution = useCallback((dataUrl: string): GalleryEntry => {
    const entry: GalleryEntry = {
      id: `gallery-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      dataUrl,
      createdAt: Date.now(),
    };
    setContributions((prev) => {
      const next = [entry, ...prev];
      saveToStorage(next);
      return next;
    });
    return entry;
  }, []);

  const value = useMemo(
    () => ({ contributions, addContribution }),
    [contributions, addContribution]
  );

  return (
    <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>
  );
}

export function useGallery() {
  const ctx = useContext(GalleryContext);
  if (!ctx) throw new Error("useGallery must be used within GalleryProvider");
  return ctx;
}
