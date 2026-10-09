import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// The site is fully prerendered, so pages are served read-only from static assets (no R2 needed).
export default defineCloudflareConfig({ incrementalCache: staticAssetsIncrementalCache });
