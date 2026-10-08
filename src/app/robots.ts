import type { MetadataRoute } from "next";
import { SITE } from "./site";

// Open to every crawler, search and AI alike (Googlebot, Bingbot, GPTBot, ClaudeBot, PerplexityBot, Google-Extended…).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE}/sitemap.xml`,
  };
}
