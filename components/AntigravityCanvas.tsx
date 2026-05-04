"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number; y: number; z: number;
  vx: number; vy: number;
  vz: number;
  size: number;
  shape: "pencil" | "book" | "ring" | "star" | "nib" | "triangle";
  phase: number;
  rotation: number;
  rotSpeed: number;
}

export default function AntigravityCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef   = useRef<HTMLDivElement>(null);
  const mouseRef  = useRef({ x: -2000, y: -2000 });
  const particlesRef = useRef<Particle[]>([]);
  const frameRef  = useRef(0);
  const rafRef    = useRef(0);

  const init = useCallback((w: number, h: number) => {
    const shapes: Particle["shape"][] = ["pencil", "book", "ring", "star", "nib", "triangle"];
    particlesRef.current = Array.from({ length: 36 }, (_, i) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: 0.2 + Math.random() * 0.8,
      vx: (Math.random() - 0.5) * 0.2,
      vy: -0.05 - Math.random() * 0.12,
      vz: (Math.random() - 0.5) * 0.002,
      size: 5 + Math.random() * 13,
      shape: shapes[i % shapes.length],
      phase: Math.random() * Math.PI * 2,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.008,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const glow   = glowRef.current;
    if (!canvas || !glow) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width  = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      if (particlesRef.current.length === 0) init(window.innerWidth, window.innerHeight);
    };

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (glow) {
        glow.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(120,113,108,0.08) 0%, rgba(120,113,108,0.03) 40%, transparent 70%)`;
      }
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouse);

    // Draw helpers
    const drawPencil = (ctx: CanvasRenderingContext2D, x: number, y: number, s: number, rot: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.lineTo(s * 0.3, s * 0.6);
      ctx.lineTo(-s * 0.3, s * 0.6);
      ctx.closePath();
      ctx.stroke();
      // pencil tip
      ctx.beginPath();
      ctx.moveTo(-s * 0.3, s * 0.6);
      ctx.lineTo(0, s);
      ctx.lineTo(s * 0.3, s * 0.6);
      ctx.stroke();
      // eraser
      ctx.beginPath();
      ctx.rect(-s * 0.28, -s, s * 0.56, s * 0.22);
      ctx.stroke();
      ctx.restore();
    };

    const drawBook = (ctx: CanvasRenderingContext2D, x: number, y: number, s: number, rot: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.beginPath();
      ctx.rect(-s * 0.7, -s * 0.5, s * 1.4, s * 1.0);
      ctx.stroke();
      // spine
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.5);
      ctx.lineTo(0, s * 0.5);
      ctx.stroke();
      // lines inside
      for (let r = -0.25; r <= 0.25; r += 0.15) {
        ctx.beginPath();
        ctx.moveTo(-s * 0.55, s * r);
        ctx.lineTo(-s * 0.08, s * r);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(s * 0.08, s * r);
        ctx.lineTo(s * 0.55, s * r);
        ctx.stroke();
      }
      ctx.restore();
    };

    const drawNib = (ctx: CanvasRenderingContext2D, x: number, y: number, s: number, rot: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.beginPath();
      ctx.moveTo(0, s);
      ctx.lineTo(s * 0.6, -s * 0.4);
      ctx.lineTo(0, -s * 0.7);
      ctx.lineTo(-s * 0.6, -s * 0.4);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, s);
      ctx.lineTo(0, -s * 0.3);
      ctx.stroke();
      ctx.restore();
    };

    const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, s: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const r = i % 2 === 0 ? s : s * 0.45;
        const px = Math.cos(angle) * r;
        const py = Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    };

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      frameRef.current++;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const t  = frameRef.current;

      for (const p of particlesRef.current) {
        // Flee from cursor
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const fleeRadius = 200;
        if (dist < fleeRadius && dist > 0) {
          const strength = ((fleeRadius - dist) / fleeRadius) * 0.01;
          p.vx += (dx / dist) * strength;
          p.vy += (dy / dist) * strength;
        }

        // Gentle anti-gravity drift upward
        p.vy -= 0.0006;
        p.vx *= 0.988;
        p.vy *= 0.988;

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.0) { p.vx *= 1.0 / speed; p.vy *= 1.0 / speed; }

        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;
        p.rotation += p.rotSpeed;
        if (p.z < 0.2 || p.z > 1) p.vz *= -1;
        p.z = Math.max(0.2, Math.min(1, p.z));

        // Wrap
        if (p.x < -80) p.x = w + 80;
        if (p.x > w + 80) p.x = -80;
        if (p.y < -80) p.y = h + 80;
        if (p.y > h + 80) p.y = -80;

        // Breathing
        const breathe = 1 + Math.sin(t * 0.006 + p.phase) * 0.1;
        const s = p.size * p.z * breathe;
        const proximity = dist < fleeRadius ? (fleeRadius - dist) / fleeRadius : 0;
        const alpha = 0.05 + p.z * 0.12 + proximity * 0.14;

        // Warm ink color — adapts to proximity
        const r = Math.round(120 - proximity * 60);
        const g = Math.round(113 - proximity * 50);
        const b = Math.round(108 - proximity * 40);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.lineWidth = 0.6 + proximity * 0.6;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        switch (p.shape) {
          case "pencil":
            drawPencil(ctx, p.x, p.y, s, p.rotation);
            break;
          case "book":
            drawBook(ctx, p.x, p.y, s, p.rotation);
            break;
          case "nib":
            drawNib(ctx, p.x, p.y, s, p.rotation);
            break;
          case "star":
            drawStar(ctx, p.x, p.y, s);
            break;
          case "ring":
            ctx.beginPath();
            ctx.arc(p.x, p.y, s, 0, Math.PI * 2);
            ctx.stroke();
            if (s > 5) {
              ctx.globalAlpha = alpha * 0.35;
              ctx.beginPath();
              ctx.arc(p.x, p.y, s * 0.55, 0, Math.PI * 2);
              ctx.stroke();
              ctx.globalAlpha = 1;
            }
            break;
          case "triangle":
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            ctx.beginPath();
            ctx.moveTo(0, -s);
            ctx.lineTo(s * 0.87, s * 0.5);
            ctx.lineTo(-s * 0.87, s * 0.5);
            ctx.closePath();
            ctx.stroke();
            ctx.restore();
            break;
        }

        // Soft halo near cursor
        if (proximity > 0) {
          const g2 = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, s * 3.5);
          g2.addColorStop(0, `rgba(120, 113, 108, ${proximity * 0.06})`);
          g2.addColorStop(1, "rgba(120, 113, 108, 0)");
          ctx.fillStyle = g2;
          ctx.beginPath();
          ctx.arc(p.x, p.y, s * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Delicate mesh lines
      const pts = particlesRef.current;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
          if (d < 120) {
            ctx.strokeStyle = `rgba(120, 113, 108, ${(1 - d / 120) * 0.025})`;
            ctx.lineWidth = 0.3;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, [init]);

  return (
    <>
      <div
        ref={glowRef}
        className="cursor-glow"
        style={{ background: "radial-gradient(600px circle at 50% 40%, rgba(120,113,108,0.06) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <canvas
        ref={canvasRef}
        className="antigravity-canvas"
        aria-hidden="true"
      />
    </>
  );
}
