import { useEffect, useRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type GravityMode = "attract" | "repel";

type GravityStarsBackgroundProps = HTMLAttributes<HTMLDivElement> & {
  glowIntensity?: number;
  gravityStrength?: number;
  mouseGravity?: GravityMode;
  mouseInfluence?: number;
  movementSpeed?: number;
  starsCount?: number;
  starsOpacity?: number;
  starsSize?: number;
};

type StarParticle = {
  size: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export const GravityStarsBackground = ({
  className,
  glowIntensity = 15,
  gravityStrength = 75,
  mouseGravity = "attract",
  mouseInfluence = 100,
  movementSpeed = 0.3,
  starsCount = 75,
  starsOpacity = 0.75,
  starsSize = 2,
  ...props
}: GravityStarsBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { active: false, x: 0, y: 0 };
    let width = 0;
    let height = 0;
    let animationFrameId = 0;

    const randomBetween = (min: number, max: number) => min + Math.random() * (max - min);

    const stars: StarParticle[] = Array.from({ length: starsCount }, () => ({
      x: 0,
      y: 0,
      vx: randomBetween(-movementSpeed, movementSpeed),
      vy: randomBetween(-movementSpeed, movementSpeed),
      size: randomBetween(starsSize * 0.5, starsSize * 1.8),
    }));

    const resizeCanvas = () => {
      const bounds = container.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;

      width = Math.max(bounds.width, 1);
      height = Math.max(bounds.height, 1);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      stars.forEach((star) => {
        if (star.x === 0 && star.y === 0) {
          star.x = Math.random() * width;
          star.y = Math.random() * height;
        } else {
          star.x = clamp(star.x, 0, width);
          star.y = clamp(star.y, 0, height);
        }
      });
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      for (const star of stars) {
        const dx = pointer.x - star.x;
        const dy = pointer.y - star.y;
        const distance = Math.hypot(dx, dy) || 1;
        const withinRange = pointer.active && distance < mouseInfluence;

        if (withinRange && !reducedMotion.matches) {
          const direction = mouseGravity === "attract" ? 1 : -1;
          const force = (1 - distance / mouseInfluence) * gravityStrength * 0.0005;

          star.vx += (dx / distance) * force * direction;
          star.vy += (dy / distance) * force * direction;
        }

        star.x += star.vx;
        star.y += star.vy;
        star.vx *= 0.992;
        star.vy *= 0.992;

        if (!reducedMotion.matches) {
          const driftLimit = movementSpeed * 1.9;

          star.vx = clamp(star.vx + randomBetween(-0.008, 0.008), -driftLimit, driftLimit);
          star.vy = clamp(star.vy + randomBetween(-0.008, 0.008), -driftLimit, driftLimit);
        }

        if (star.x < -24) star.x = width + 24;
        if (star.x > width + 24) star.x = -24;
        if (star.y < -24) star.y = height + 24;
        if (star.y > height + 24) star.y = -24;

        const proximity = withinRange ? 1 - distance / mouseInfluence : 0;
        const radius = star.size + proximity * 1.6;
        const alpha = clamp(starsOpacity - 0.18 + proximity * 0.45, 0.18, 1);
        const glow = glowIntensity + proximity * 18;

        context.beginPath();
        context.fillStyle = `rgba(28, 36, 50, ${alpha})`;
        context.shadowColor = `rgba(60, 84, 120, ${0.18 + proximity * 0.28})`;
        context.shadowBlur = glow;
        context.arc(star.x, star.y, radius, 0, Math.PI * 2);
        context.fill();
      }

      context.shadowBlur = 0;
      animationFrameId = window.requestAnimationFrame(draw);
    };

    const updatePointer = (clientX: number, clientY: number) => {
      const bounds = container.getBoundingClientRect();
      pointer.x = clientX - bounds.left;
      pointer.y = clientY - bounds.top;
      pointer.active = true;
    };

    const handlePointerMove = (event: PointerEvent) => {
      updatePointer(event.clientX, event.clientY);
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    resizeCanvas();
    draw();

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("blur", handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("blur", handlePointerLeave);
    };
  }, [
    glowIntensity,
    gravityStrength,
    mouseGravity,
    mouseInfluence,
    movementSpeed,
    starsCount,
    starsOpacity,
    starsSize,
  ]);

  return (
    <div
      ref={containerRef}
      className={cn("gravity-stars-background pointer-events-none", className)}
      {...props}
    >
      <canvas ref={canvasRef} className="gravity-stars-background__canvas" />
      <div className="gravity-stars-background__veil" />
    </div>
  );
};
