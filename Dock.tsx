import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Children, cloneElement, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import "./Dock.css";

function DockItem({
  children,
  className = "",
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
  to,
  isActive,
  onCameraClick,
}: {
  children: React.ReactNode;
  className?: string;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  spring: { mass: number; stiffness: number; damping: number };
  distance: number;
  magnification: number;
  baseItemSize: number;
  to: string;
  isActive?: boolean;
  onCameraClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: baseItemSize };
    return val - rect.x - rect.width / 2;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );
  const size = useSpring(targetSize, spring);

  const content = (
    <motion.div
        ref={ref}
        onHoverStart={() => isHovered.set(1)}
        onHoverEnd={() => isHovered.set(0)}
        onFocus={() => isHovered.set(1)}
        onBlur={() => isHovered.set(0)}
        className={`dock-item ${isActive ? "dock-item--active" : ""} ${className}`.trim()}
        style={{ width: size, height: size }}
        tabIndex={0}
        role="button"
      >
        {Children.map(children, (child) =>
          cloneElement(child as React.ReactElement<{ isHovered?: typeof isHovered }>, { isHovered })
        )}
      </motion.div>
  );

  if (onCameraClick) {
    return (
      <button
        type="button"
        onClick={onCameraClick}
        className="dock-item-link dock-item-link--action"
        aria-label="Contribute to gallery"
      >
        {content}
      </button>
    );
  }
  if (!to) {
    return <span className="dock-item-link dock-item-link--deco">{content}</span>;
  }
  return (
    <Link to={to} className="dock-item-link" aria-current={isActive ? "page" : undefined}>
      {content}
    </Link>
  );
}

function DockLabel({
  children,
  className = "",
  isHovered,
}: {
  children: React.ReactNode;
  className?: string;
  isHovered?: ReturnType<typeof useMotionValue<number>>;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    const unsubscribe = isHovered.on("change", (latest) => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  if (!isVisible) return null;
  return (
    <motion.span
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      className={`dock-label ${className}`.trim()}
    >
      {children}
    </motion.span>
  );
}

function DockIcon({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`dock-icon ${className}`.trim()}>{children}</span>;
}

export type DockItemConfig = {
  path?: string;
  icon: React.ReactNode;
  label: string;
  /** When set, the item opens the camera to contribute to the festival gallery. */
  action?: "camera";
};

export default function Dock({
  items,
  className = "",
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 56,
  distance = 180,
  panelHeight = 64,
  dockHeight = 200,
  baseItemSize = 44,
  activePath,
  onCameraClick,
}: {
  items: DockItemConfig[];
  className?: string;
  spring?: { mass: number; stiffness: number; damping: number };
  magnification?: number;
  distance?: number;
  panelHeight?: number;
  dockHeight?: number;
  baseItemSize?: number;
  activePath?: string;
  onCameraClick?: () => void;
}) {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="dock-outer">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={`dock-panel ${className}`.trim()}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Application dock"
      >
        {items.map((item, index) => (
          <DockItem
            key={item.path || item.action || `deco-${index}`}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
            to={item.path ?? ""}
            isActive={item.path ? activePath === item.path : false}
            onCameraClick={item.action === "camera" ? onCameraClick : undefined}
          >
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel>{item.label || "Contribute"}</DockLabel>
          </DockItem>
        ))}
      </motion.div>
    </div>
  );
}
