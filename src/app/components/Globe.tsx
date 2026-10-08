"use client";

import { useEffect, useRef } from "react";
import { LAND, LAND_H, LAND_W } from "./land";

const INK = "14,13,11";
const GOLD = "201,162,74";
const N = 10000;
const TILT = 0.38;
// OC Global Technology HQ, Johor Bahru
const HQ = { lat: (1.4927 * Math.PI) / 180, lon: (103.7414 * Math.PI) / 180 };
const ORBITS = [
  { name: "O'ZONE", r: 1.26, tilt: 1.0, spin: 0.32, speed: 0.22, phase: 0.6 },
  { name: "O'CARE", r: 1.4, tilt: 1.08, spin: 0.12, speed: 0.17, phase: 2.2 },
  { name: "O'CHAT", r: 1.54, tilt: 0.94, spin: 0.46, speed: 0.13, phase: 3.9 },
  { name: "O'SMASH", r: 1.68, tilt: 1.04, spin: 0.24, speed: 0.1, phase: 5.3 },
];

type V = [number, number, number];

const geo = (lat: number, lon: number): V => [Math.cos(lat) * Math.cos(lon), Math.sin(lat), -Math.cos(lat) * Math.sin(lon)];

function buildSphere() {
  const bits = atob(LAND);
  const isLand = (lat: number, lon: number) => {
    const r = Math.min(LAND_H - 1, Math.floor(90 - (lat * 180) / Math.PI));
    const c = Math.min(LAND_W - 1, Math.floor(((lon * 180) / Math.PI + 180) % 360));
    const i = r * LAND_W + c;
    return (bits.charCodeAt(i >> 3) >> (7 - (i & 7))) & 1;
  };
  return Array.from({ length: N }, (_, i) => {
    const y = 1 - (i / (N - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const phi = i * Math.PI * (3 - Math.sqrt(5));
    const p: V = [Math.cos(phi) * r, y, Math.sin(phi) * r];
    return { p, land: isLand(Math.asin(y), Math.atan2(-p[2], p[0])) === 1 };
  });
}

function rotY([x, y, z]: V, a: number): V {
  return [x * Math.cos(a) + z * Math.sin(a), y, -x * Math.sin(a) + z * Math.cos(a)];
}
function rotX([x, y, z]: V, a: number): V {
  return [x, y * Math.cos(a) - z * Math.sin(a), y * Math.sin(a) + z * Math.cos(a)];
}
function rotZ([x, y, z]: V, a: number): V {
  return [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a), z];
}

export default function Globe() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const sphere = buildSphere();
    const ctx = canvas.getContext("2d")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mono = getComputedStyle(document.body).getPropertyValue("--font-geist-mono") || "monospace";
    let w = 0, h = 0, dpr = 1, raf = 0, visible = true, last = performance.now();
    let angle = -Math.PI / 2 - HQ.lon - 0.3; // Southeast Asia faces the viewer, drifting into centre
    let t = 0, drag = 0, dragX: number | null = null;

    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      if (reduce) draw();
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * (w < 640 ? 0.34 : 0.32);
      const cx = w / 2, cy = h / 2;
      const view = (p: V): V => rotX(rotY(p, angle), TILT);
      const proj = (p: V) => ({ x: cx + p[0] * R, y: cy - p[1] * R, z: p[2] });
      const small = w < 640;

      // Orbits: back halves first, sphere, then front halves
      const orbitPts = ORBITS.map((o) =>
        Array.from({ length: 160 }, (_, i) => {
          const a = (i / 160) * Math.PI * 2;
          return proj(rotX(rotZ(rotX([Math.cos(a) * o.r, 0, Math.sin(a) * o.r], o.tilt), o.spin), TILT));
        }),
      );
      const sats = ORBITS.map((o) => {
        const a = o.phase + t * o.speed;
        return proj(rotX(rotZ(rotX([Math.cos(a) * o.r, 0, Math.sin(a) * o.r], o.tilt), o.spin), TILT));
      });
      const drawOrbits = (front: boolean) => {
        ctx.lineWidth = 1;
        orbitPts.forEach((pts) => {
          for (let i = 0; i < pts.length; i++) {
            const a = pts[i], b = pts[(i + 1) % pts.length];
            if (a.z > 0 !== front) continue;
            ctx.strokeStyle = `rgba(${INK},${front ? 0.32 : 0.1})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        });
        sats.forEach((s, i) => {
          if (s.z > 0 !== front) return;
          const behind = !front && Math.hypot(s.x - cx, s.y - cy) < R;
          ctx.fillStyle = behind ? `rgba(${GOLD},0.25)` : `rgb(${GOLD})`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, front ? 6 : 4, 0, Math.PI * 2);
          ctx.fill();
          if (!behind && !small) {
            ctx.fillStyle = `rgba(${INK},${front ? 0.9 : 0.35})`;
            ctx.font = `12px ${mono}`;
            ctx.fillText(ORBITS[i].name, s.x + 12, s.y + 4);
          }
        });
      };

      drawOrbits(false);

      for (const { p, land } of sphere) {
        const q = proj(view(p));
        if (q.z < 0) continue;
        const a = land ? 0.3 + q.z * 0.65 : 0.05 + q.z * 0.07;
        const s = land ? 1.3 + q.z * 1.1 : 1.2;
        ctx.fillStyle = `rgba(${INK},${a})`;
        ctx.fillRect(q.x - s / 2, q.y - s / 2, s, s);
      }
      ctx.strokeStyle = `rgba(${INK},0.14)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.stroke();

      // HQ marker
      const hq = proj(view(geo(HQ.lat, HQ.lon)));
      if (hq.z > 0) {
        const pulse = (t * 0.6) % 1;
        ctx.strokeStyle = `rgba(${GOLD},${1 - pulse})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(hq.x, hq.y, 6 + pulse * 22, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = `rgb(${GOLD})`;
        ctx.beginPath();
        ctx.arc(hq.x, hq.y, 5, 0, Math.PI * 2);
        ctx.fill();
        if (!small) {
          const ex = hq.x + 56, ey = hq.y + 56;
          ctx.strokeStyle = `rgba(${INK},0.85)`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(hq.x + 5, hq.y + 5);
          ctx.lineTo(ex, ey);
          ctx.lineTo(ex + 168, ey);
          ctx.stroke();
          ctx.fillStyle = `rgb(${INK})`;
          ctx.font = `12px ${mono}`;
          ctx.fillText("OCGT HQ · JOHOR BAHRU", ex + 4, ey - 8);
        }
      }

      drawOrbits(true);
    };

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t += dt;
      angle += dt * 0.07 + drag;
      drag *= 0.92;
      draw();
      raf = visible ? requestAnimationFrame(loop) : 0;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    if (reduce) {
      draw();
      return () => ro.disconnect();
    }

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    });
    io.observe(canvas);

    const down = (e: PointerEvent) => {
      dragX = e.clientX;
      canvas.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (dragX === null) return;
      drag = (e.clientX - dragX) * 0.0025;
      dragX = e.clientX;
    };
    const up = () => (dragX = null);
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointercancel", up);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointercancel", up);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 h-full w-full cursor-grab touch-pan-y active:cursor-grabbing"
      role="img"
      aria-label="Dotted globe centred on Johor Bahru, Malaysia, with O'ZONE, O'CARE, O'CHAT and O'SMASH orbiting it"
    />
  );
}
