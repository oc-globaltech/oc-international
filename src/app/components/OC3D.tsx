"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { OC_PATH, OC_VIEWBOX } from "./oc-mark";

// Extruded gold "OC" that turns as the page scrolls. `children` is the flat mark,
// shown until WebGL is ready and kept if it never is.
export default function OC3D({ children, bleed = 0.4 }: { children: ReactNode; bleed?: number }) {
  const host = useRef<HTMLSpanElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      const { SVGLoader } = await import("three/addons/loaders/SVGLoader.js");
      const { RoomEnvironment } = await import("three/addons/environments/RoomEnvironment.js");
      const el = host.current;
      if (disposed || !el) return;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      } catch {
        return; // no WebGL: the flat mark stays
      }
      renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      const canvas = renderer.domElement;
      canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%";
      canvas.setAttribute("aria-hidden", "true");
      el.appendChild(canvas);

      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environment = env;

      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${OC_VIEWBOX}"><path fill-rule="evenodd" d="${OC_PATH}"/></svg>`;
      const shapes = new SVGLoader().parse(svg).paths.flatMap((p) => p.toShapes());
      const geometry = new THREE.ExtrudeGeometry(shapes, {
        depth: 30,
        bevelEnabled: true,
        bevelThickness: 6,
        bevelSize: 3.5,
        bevelSegments: 8,
        curveSegments: 12,
      });
      geometry.center();
      geometry.rotateX(Math.PI); // SVG y points down; flipping y and z keeps faces outward
      const material = new THREE.MeshPhysicalMaterial({
        color: 0xd1aa55,
        metalness: 1,
        roughness: 0.24,
        clearcoat: 0.5,
        clearcoatRoughness: 0.18,
        envMapIntensity: 1.5,
      });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      const key = new THREE.DirectionalLight(0xfff1d6, 1.4);
      key.position.set(-300, 400, 500);
      const fill = new THREE.DirectionalLight(0xffe2a8, 1.6);
      fill.position.set(200, -100, 900);
      scene.add(key, fill);

      geometry.computeBoundingBox();
      const size = new THREE.Vector3();
      geometry.boundingBox!.getSize(size);
      const camera = new THREE.PerspectiveCamera(26, 1, 1, 10000);

      const resize = () => {
        const w = el.clientWidth, h = el.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        // fit the model's width to the flat mark's box, which sits `bleed` em inside the canvas
        const b = parseFloat(getComputedStyle(el).fontSize) * bleed;
        const markFrac = (w - 2 * b) / w;
        camera.position.z = size.x / (markFrac * 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.aspect);
        camera.updateProjectionMatrix();
      };
      const ro = new ResizeObserver(resize);
      ro.observe(el);
      resize();

      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const cur = { y: -0.32, x: 0.14 };
      let mx = 0, my = 0, t = 0, raf = 0, visible = true, last = performance.now();

      const target = () => {
        const p = Math.min(Math.max(scrollY / (innerHeight * 0.9), 0), 1.4);
        return { y: -0.32 + p * Math.PI * 0.85 + mx * 0.22, x: 0.14 - p * 0.42 + my * 0.14 };
      };
      const frame = (now: number) => {
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        t += dt;
        const g = target();
        const k = 1 - Math.pow(0.0015, dt); // frame-rate independent easing
        cur.y += (g.y - cur.y) * k;
        cur.x += (g.x - cur.x) * k;
        mesh.rotation.set(cur.x + Math.sin(t * 0.7) * 0.03, cur.y + Math.sin(t * 0.45) * 0.05, 0);
        mesh.position.y = Math.sin(t * 0.9) * 2;
        renderer.render(scene, camera);
        raf = visible ? requestAnimationFrame(frame) : 0;
      };

      const onPointer = (e: PointerEvent) => {
        mx = e.clientX / innerWidth - 0.5;
        my = e.clientY / innerHeight - 0.5;
      };
      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        if (visible && !raf && !reduce) {
          last = performance.now();
          raf = requestAnimationFrame(frame);
        }
      });

      if (reduce) {
        mesh.rotation.set(cur.x, cur.y, 0);
        renderer.render(scene, camera);
      } else {
        io.observe(el);
        addEventListener("pointermove", onPointer, { passive: true });
      }
      setReady(true);

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        removeEventListener("pointermove", onPointer);
        geometry.dispose();
        material.dispose();
        env.dispose();
        pmrem.dispose();
        renderer.dispose();
        canvas.remove();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [bleed]);

  return (
    <span className="relative block h-full w-full">
      <span className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`}>{children}</span>
      <span
        ref={host}
        className={`pointer-events-none absolute transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
        style={{ inset: `-${bleed}em` }}
      />
    </span>
  );
}
