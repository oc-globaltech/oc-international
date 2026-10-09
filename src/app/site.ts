// Public origin, baked in at build time. SITE_URL overrides it (e.g. for a staging domain).
export const SITE = (process.env.SITE_URL || "https://ocih.group").replace(/\/$/, "");
export const NAME = "OC International Holding Sdn. Bhd.";
export const TITLE = "OC International Holding — Parent company of OC Global Technology";
export const DESCRIPTION =
  "OC International Holding Sdn. Bhd. is the parent company of OC Global Technology Sdn. Bhd., the Johor Bahru technology company behind O'ZONE, O'CARE, O'CHAT and O'SMASH, powering digital growth through conversation, commerce and community.";
