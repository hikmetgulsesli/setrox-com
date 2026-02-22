"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * CursorGlow Component
 * 
 * A dual-layer mouse-tracking glow effect that follows the cursor.
 * - Outer glow: 400px default, expands to 500px on interactive elements
 * - Inner dot: 32px, centered on mouse position
 * - Uses requestAnimationFrame for smooth 60fps updates
 * - Hidden on mobile (lg:block only)
 * - Glow color uses var(--primary) CSS variable for theme adaptation
 */
export function CursorGlow() {
  const outerGlowRef = useRef<HTMLDivElement>(null);
  const innerDotRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafIdRef = useRef<number | null>(null);
  const isVisibleRef = useRef(true);
  const isOnInteractiveRef = useRef(false);

  const lerp = useCallback((start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  }, []);

  const animate = useCallback(() => {
    if (!outerGlowRef.current || !innerDotRef.current) {
      rafIdRef.current = requestAnimationFrame(animate);
      return;
    }

    // Smooth interpolation for outer glow (slower follow)
    positionRef.current.x = lerp(positionRef.current.x, targetRef.current.x, 0.12);
    positionRef.current.y = lerp(positionRef.current.y, targetRef.current.y, 0.12);

    const outerX = positionRef.current.x;
    const outerY = positionRef.current.y;
    const innerX = targetRef.current.x;
    const innerY = targetRef.current.y;

    // Apply transforms using translate3d for GPU acceleration
    outerGlowRef.current.style.transform = `translate3d(${outerX}px, ${outerY}px, 0) translate(-50%, -50%)`;
    innerDotRef.current.style.transform = `translate3d(${innerX}px, ${innerY}px, 0) translate(-50%, -50%)`;

    rafIdRef.current = requestAnimationFrame(animate);
  }, [lerp]);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };

      // Check if hovering over interactive element
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("a, button, [role='button'], input, textarea, select, [data-cursor-hover]");
      
      if (isInteractive && !isOnInteractiveRef.current) {
        isOnInteractiveRef.current = true;
        outerGlowRef.current?.classList.add("cursor-glow--expanded");
      } else if (!isInteractive && isOnInteractiveRef.current) {
        isOnInteractiveRef.current = false;
        outerGlowRef.current?.classList.remove("cursor-glow--expanded");
      }
    };

    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      if (outerGlowRef.current) outerGlowRef.current.style.opacity = "0.6";
      if (innerDotRef.current) innerDotRef.current.style.opacity = "0.15";
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      if (outerGlowRef.current) outerGlowRef.current.style.opacity = "0";
      if (innerDotRef.current) innerDotRef.current.style.opacity = "0";
    };

    // Start animation loop
    rafIdRef.current = requestAnimationFrame(animate);

    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Initial position (center of viewport)
    targetRef.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    positionRef.current = { ...targetRef.current };

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [animate]);

  return (
    <>
      {/* Outer glow - hidden on mobile, visible on lg+ */}
      <div
        ref={outerGlowRef}
        className="cursor-glow pointer-events-none fixed left-0 top-0 z-[9998] hidden will-change-transform lg:block"
        style={{
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: `radial-gradient(circle, oklch(from var(--primary) l c h / 0.15) 0%, transparent 70%)`,
          opacity: 0,
          filter: "blur(40px)",
          transition: "opacity 200ms ease-out, width 300ms ease-out, height 300ms ease-out",
        }}
        aria-hidden="true"
      />
      
      {/* Inner dot - hidden on mobile, visible on lg+ */}
      <div
        ref={innerDotRef}
        className="cursor-dot pointer-events-none fixed left-0 top-0 z-[9999] hidden will-change-transform lg:block"
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
          opacity: 0,
          filter: "blur(4px)",
          mixBlendMode: "screen" as const,
          transition: "opacity 200ms ease-out",
        }}
        aria-hidden="true"
      />

      {/* CSS for expanded state */}
      <style jsx>{`
        .cursor-glow--expanded {
          width: 500px !important;
          height: 500px !important;
        }
      `}</style>
    </>
  );
}
