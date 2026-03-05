import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Camera, Send, RotateCcw } from "lucide-react";
import { useGallery } from "../context/GalleryContext";
import { toast } from "sonner";

type CameraModalProps = {
  open: boolean;
  onClose: () => void;
};

export function CameraModal({ open, onClose }: CameraModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [capturedUrl, setCapturedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const { addContribution } = useGallery();

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  useEffect(() => {
    if (!open) {
      stopStream();
      setCapturedUrl(null);
      setError(null);
      setSending(false);
      return;
    }

    setError(null);
    let mounted = true;

    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      })
      .then((stream) => {
        if (!mounted || !videoRef.current) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        videoRef.current.srcObject = stream;
      })
      .catch((err) => {
        if (mounted) {
          setError("Camera access denied or unavailable.");
          console.warn("Camera error:", err);
        }
      });

    return () => {
      mounted = false;
      stopStream();
    };
  }, [open, stopStream]);

  const capture = useCallback(() => {
    const video = videoRef.current;
    if (!video || !streamRef.current || video.readyState !== 4) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
    stopStream();
    setCapturedUrl(dataUrl);
  }, [stopStream]);

  const retake = useCallback(() => {
    setCapturedUrl(null);
    setError(null);
    navigator.mediaDevices
      .getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      })
      .then((stream) => {
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch((err) => {
        setError("Camera unavailable.");
        console.warn(err);
      });
  }, []);

  const sendToGallery = useCallback(() => {
    if (!capturedUrl) return;
    setSending(true);
    try {
      addContribution(capturedUrl);
      toast.success("Thanks! Your photo was added to the festival gallery.");
      onClose();
    } catch (e) {
      toast.error("Could not save. Try again.");
    } finally {
      setSending(false);
    }
  }, [capturedUrl, addContribution, onClose]);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black flex flex-col"
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4 safe-area pt-6">
          <span className="text-white/80 font-semibold text-sm">
            Contribute to the gallery
          </span>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Camera view or preview */}
        <div className="flex-1 flex flex-col items-center justify-center min-h-0 p-4">
          {error ? (
            <div className="flex flex-col items-center gap-4 text-center">
              <p className="text-white/80 text-sm">{error}</p>
              <p className="text-white/50 text-xs max-w-[260px]">
                Allow camera access in your browser settings to contribute photos.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-full bg-white/10 text-white text-sm font-medium"
              >
                Close
              </button>
            </div>
          ) : capturedUrl ? (
            <div className="w-full max-w-md flex flex-col items-center gap-6">
              <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-black aspect-[4/3] flex items-center justify-center">
                <img
                  src={capturedUrl}
                  alt="Captured"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-4 w-full justify-center">
                <button
                  onClick={retake}
                  disabled={sending}
                  className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 border border-white/10 text-white/90 font-medium text-sm hover:bg-white/15 transition-colors disabled:opacity-50"
                >
                  <RotateCcw size={18} />
                  Retake
                </button>
                <button
                  onClick={sendToGallery}
                  disabled={sending}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-fuchsia-500 text-white font-bold text-sm hover:bg-fuchsia-400 transition-colors disabled:opacity-50"
                >
                  {sending ? (
                    "Sending…"
                  ) : (
                    <>
                      <Send size={18} />
                      Send to gallery
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="w-full max-w-md rounded-2xl overflow-hidden border border-white/10 bg-black aspect-[4/3] relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover scale-x-[-1]"
                  style={{ transform: "scaleX(-1)" }}
                />
              </div>
              <button
                onClick={capture}
                className="mt-8 w-16 h-16 rounded-full bg-white border-4 border-white/30 flex items-center justify-center text-black shadow-lg hover:scale-105 active:scale-95 transition-transform"
                aria-label="Take photo"
              >
                <Camera size={28} />
              </button>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
