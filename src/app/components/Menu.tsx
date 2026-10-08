"use client";

import { useRef } from "react";

export default function Menu({ items }: { items: readonly (readonly [string, string])[] }) {
  const ref = useRef<HTMLDetailsElement>(null);
  return (
    <details
      ref={ref}
      className="menu relative lg:hidden"
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("a")) ref.current!.open = false;
      }}
    >
      <summary className="grid h-11 w-11 place-items-center rounded-full border border-mist" aria-label="Menu">
        <svg className="menu-icon-open" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
          <path d="M4 8h16M4 16h16" />
        </svg>
        <svg className="menu-icon-close" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </summary>
      <nav aria-label="Mobile" className="absolute right-0 top-14 w-[min(84vw,320px)] rounded-[20px] border border-mist bg-bone p-3">
        <ul>
          {items.map(([label, href]) => (
            <li key={href}>
              <a href={href} className="flex items-center justify-between rounded-xl px-4 py-3 text-lg hover:bg-ash">
                {label}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}
