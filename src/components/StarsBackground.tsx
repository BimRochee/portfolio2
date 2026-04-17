import { useEffect, useRef, type CSSProperties, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const STARFIELD_HEIGHT = 1400;
const STARFIELD_WIDTH = 1920;

const createSeededRandom = (seed: number) => () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
};

const createStarShadow = (count: number, seed: number) => {
  const random = createSeededRandom(seed);

  return Array.from({ length: count }, () => {
    const x = Math.round(random() * STARFIELD_WIDTH);
    const y = Math.round(random() * STARFIELD_HEIGHT);

    return `${x}px ${y}px 0 0 currentColor`;
  }).join(", ");
};

const starLayers = [
  {
    shadow: createStarShadow(110, 17),
    size: 1,
    opacity: 0.72,
    depth: 0.55,
    duration: 92,
    delay: -14,
  },
  {
    shadow: createStarShadow(72, 29),
    size: 2,
    opacity: 0.45,
    depth: 0.9,
    duration: 136,
    delay: -31,
  },
  {
    shadow: createStarShadow(34, 43),
    size: 3,
    opacity: 0.24,
    depth: 1.3,
    duration: 178,
    delay: -46,
  },
];

type StarsBackgroundProps = HTMLAttributes<HTMLDivElement> & {
  factor?: number;
  pointerEvents?: boolean;
  speed?: number;
  starColor?: string;
};

export const StarsBackground = ({
  className,
  factor = 0.05,
  pointerEvents = false,
  speed = 50,
  starColor = "#fff",
  style,
  ...props
}: StarsBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const resetParallax = () => {
      container.style.setProperty("--stars-parallax-x", "0px");
      container.style.setProperty("--stars-parallax-y", "0px");
    };

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (motionPreference.matches) {
      resetParallax();
      return;
    }

    const updateParallax = (clientX: number, clientY: number) => {
      const bounds = container.getBoundingClientRect();

      if (!bounds.width || !bounds.height) {
        return;
      }

      const normalizedX = (clientX - bounds.left) / bounds.width - 0.5;
      const normalizedY = (clientY - bounds.top) / bounds.height - 0.5;
      const offsetX = normalizedX * speed * factor;
      const offsetY = normalizedY * speed * factor;

      container.style.setProperty("--stars-parallax-x", `${offsetX.toFixed(2)}px`);
      container.style.setProperty("--stars-parallax-y", `${offsetY.toFixed(2)}px`);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = window.requestAnimationFrame(() => {
        updateParallax(event.clientX, event.clientY);
        animationFrameRef.current = null;
      });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("blur", resetParallax);

    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }

      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", resetParallax);
    };
  }, [factor, speed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "stars-background",
        pointerEvents ? "pointer-events-auto" : "pointer-events-none",
        className,
      )}
      style={{ ...style, "--stars-color": starColor } as CSSProperties}
      {...props}
    >
      {starLayers.map((layer, index) => {
        const fieldStyle = {
          width: `${layer.size}px`,
          height: `${layer.size}px`,
          opacity: layer.opacity,
          boxShadow: layer.shadow,
          animationDuration: `${(layer.duration * 50) / Math.max(speed, 1)}s`,
          animationDelay: `${layer.delay}s`,
          "--stars-field-height": `${STARFIELD_HEIGHT}px`,
        } as CSSProperties;

        return (
          <div
            key={index}
            className="stars-background__layer"
            style={{ "--stars-depth": layer.depth } as CSSProperties}
          >
            <span className="stars-background__field" style={fieldStyle} />
            <span className="stars-background__field stars-background__field--clone" style={fieldStyle} />
          </div>
        );
      })}

      <div className="stars-background__veil" />
    </div>
  );
};
