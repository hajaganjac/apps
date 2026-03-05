import React, { useMemo } from "react";
import "./Beams.css";

export type BeamsProps = {
  beamWidth?: number;
  beamHeight?: number;
  beamNumber?: number;
  lightColor?: string;
  speed?: number;
  noiseIntensity?: number;
  scale?: number;
  rotation?: number;
  className?: string;
};

export function Beams({
  beamWidth = 2,
  beamHeight = 15,
  beamNumber = 12,
  lightColor = "#ffffff",
  speed = 2,
  noiseIntensity = 2,
  scale = 0.2,
  rotation = 0,
  className = "",
}: BeamsProps) {
  const duration = 14 / Math.max(0.2, speed);

  const beamsPrimary = useMemo(
    () =>
      Array.from({ length: beamNumber }, (_, i) => ({
        id: `p-${i}`,
        delay: (i / (beamNumber || 1)) * (duration * 0.6),
        top: `${(i / (beamNumber - 1 || 1)) * 110 - 5}%`,
        width: beamWidth,
        height: beamHeight * 28,
      })),
    [beamNumber, beamWidth, beamHeight, duration]
  );

  const beamsSecondary = useMemo(
    () =>
      Array.from({ length: Math.floor(beamNumber * 0.7) }, (_, i) => ({
        id: `s-${i}`,
        delay: (i / (Math.floor(beamNumber * 0.7) || 1)) * (duration * 0.5) + duration * 0.2,
        top: `${(i / (Math.floor(beamNumber * 0.7) - 1 || 1)) * 110 - 5}%`,
        width: Math.max(1, beamWidth * 0.8),
        height: beamHeight * 22,
      })),
    [beamNumber, beamWidth, beamHeight, duration]
  );

  const opacity = 0.03 + Math.min(1, noiseIntensity / 10) * 0.12;

  return (
    <div
      className={`beams-container ${className}`.trim()}
      style={
        {
          "--beam-color": lightColor,
          "--beam-speed": `${duration}s`,
        } as React.CSSProperties
      }
      aria-hidden
    >
      {beamsPrimary.map((beam) => (
        <div
          key={beam.id}
          className="beam"
          style={{
            top: beam.top,
            width: `${beam.width}px`,
            height: `${beam.height}px`,
            transform: `rotate(${rotation}deg)`,
            animationDuration: `var(--beam-speed)`,
            animationDelay: `${beam.delay}s`,
            opacity,
          }}
        />
      ))}
      {beamsSecondary.map((beam) => (
        <div
          key={beam.id}
          className="beam"
          style={{
            top: beam.top,
            width: `${beam.width}px`,
            height: `${beam.height}px`,
            transform: `rotate(${-rotation - 25}deg)`,
            animationDuration: `${duration * 1.2}s`,
            animationDelay: `${beam.delay}s`,
            opacity: opacity * 0.7,
          }}
        />
      ))}
    </div>
  );
}

export default Beams;
