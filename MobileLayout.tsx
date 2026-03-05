import React, { useState } from "react";
import { useOutlet, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Home, Search, MessageCircle, Camera, Compass } from "lucide-react";
import { EmbeddedContext } from "../context/EmbeddedContext";
import Dock from "./Dock";
import { CameraModal } from "./CameraModal";
import { GalleryProvider } from "../context/GalleryContext";

const navItems = [
  { path: "/", icon: <Home size={22} strokeWidth={2} />, label: "Home" },
  { path: "/discovery", icon: <Search size={22} strokeWidth={2} />, label: "Discover" },
  {
    action: "camera" as const,
    icon: (
      <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-purple-500 to-fuchsia-500 flex items-center justify-center">
        <Camera size={12} className="text-white" strokeWidth={2.5} />
      </div>
    ),
    label: "Contribute",
  },
  { path: "/messages", icon: <MessageCircle size={22} strokeWidth={2} />, label: "Messages" },
  { path: "/find", icon: <Compass size={22} strokeWidth={2} />, label: "Find" },
];

const pageTransition = {
  initial: { opacity: 0, x: 12 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -12 },
  transition: { duration: 0.22, ease: [0.25, 0.1, 0.25, 1] },
};

export function MobileLayout() {
  const location = useLocation();
  const outlet = useOutlet();
  const [cameraOpen, setCameraOpen] = useState(false);

  return (
    <EmbeddedContext.Provider value={true}>
      <GalleryProvider>
      <div className="min-h-screen min-h-[100dvh] bg-[#050505] flex flex-col safe-area relative">
        {/* Status bar */}
        <div className="relative z-10 h-12 shrink-0 flex justify-between items-center px-8 text-[13px] font-semibold text-white drop-shadow-md pointer-events-none">
          <span>9:41</span>
          <div className="flex items-center gap-1.5 opacity-80">
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
              <path
                d="M16 3H2C1.44772 3 1 3.44772 1 4V10C1 10.5523 1.44772 11 2 11H16C16.5523 11 17 10.5523 17 10V4C17 3.44772 16.5523 3 16 3Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 3V2C2 1.44772 2.44772 1 3 1H15C15.5523 1 16 1.44772 16 2V3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <path
                d="M1 11H15V8.5C15 8.22386 14.7761 8 14.5 8H1.5C1.22386 8 1 8.22386 1 8.5V11Z"
                fill="currentColor"
              />
              <path
                d="M1 8H15V5.5C15 5.22386 14.7761 5 14.5 5H1.5C1.22386 5 1 5.22386 1 5.5V8Z"
                fill="currentColor"
                fillOpacity="0.7"
              />
              <path
                d="M1 5H15V2.5C15 2.22386 14.7761 2 14.5 2H1.5C1.22386 2 1 2.22386 1 2.5V5Z"
                fill="currentColor"
                fillOpacity="0.4"
              />
            </svg>
          </div>
        </div>

        {/* Dynamic Island */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[126px] h-9 bg-black rounded-full shadow-[0_0_15px_rgba(0,0,0,0.8)] pointer-events-none z-50" />

        {/* Main content - smooth page transitions (no animation when opening a chat from messages) */}
        <main className="relative z-10 flex-1 overflow-hidden flex flex-col min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname.startsWith("/messages") ? "/messages" : location.key}
              className="flex-1 flex flex-col min-h-0 overflow-hidden"
              {...pageTransition}
            >
              {outlet}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Bottom nav - react-bits Dock with magnification */}
        <div className="relative z-10 shrink-0 h-28 bg-gradient-to-t from-[#050505]/98 via-[#050505]/80 to-transparent pointer-events-none" />
        <div className="fixed bottom-0 left-0 right-0 safe-area-bottom z-40 flex justify-center pb-5 pointer-events-none">
          <div className="pointer-events-auto">
            <Dock
              items={navItems}
              activePath={location.pathname === "/" ? "/" : location.pathname.startsWith("/discovery") ? "/discovery" : location.pathname.startsWith("/messages") ? "/messages" : location.pathname.startsWith("/find") ? "/find" : undefined}
              magnification={52}
              distance={160}
              panelHeight={60}
              baseItemSize={42}
              onCameraClick={() => setCameraOpen(true)}
            />
          </div>
        </div>

        <CameraModal open={cameraOpen} onClose={() => setCameraOpen(false)} />
      </div>
      </GalleryProvider>
    </EmbeddedContext.Provider>
  );
}
