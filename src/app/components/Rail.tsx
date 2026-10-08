"use client";

import { useRef, type ReactNode } from "react";

export default function Rail({ children, label }: { children: ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const go = (dir: 1 | -1) => {
    const el = ref.current!;
    const card = el.firstElementChild as HTMLElement | null;
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 400) + 24), behavior: "smooth" });
  };

  return (
    <div>
      <div className="wrap mb-8 flex justify-end gap-2">
        {([-1, 1] as const).map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => go(d)}
            aria-label={d < 0 ? "Previous platform" : "Next platform"}
            className="grid h-12 w-12 place-items-center rounded-full border border-mist transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-bone"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden className={d < 0 ? "rotate-180" : ""}>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        ))}
      </div>
      <div ref={ref} className="rail relative" role="region" aria-label={label} tabIndex={0}>
        {children}
      </div>
    </div>
  );
}
