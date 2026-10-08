import { ImageResponse } from "next/og";
import { OC_PATH, OC_VIEWBOX } from "./components/oc-mark";

export const alt = "OC International Holding — Parent company of OC Global Technology";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#0e0d0b", color: "#fcfbf8" }}>
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 3, color: "#c9a24a" }}>PARENT COMPANY · GROUP OF COMPANIES</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <svg viewBox={OC_VIEWBOX} width={347} height={140}>
            <path d={OC_PATH} fill="#c9a24a" fillRule="evenodd" />
          </svg>
          <div style={{ display: "flex", fontSize: 128, fontWeight: 600, letterSpacing: -5, lineHeight: 1, marginTop: 16 }}>
            <span>International</span>
            <span style={{ color: "#c9a24a", marginLeft: -22 }}>.</span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#bdb7a9" }}>
          <span>OC International Holding Sdn. Bhd.</span>
          <span>Parent company of OC Global Technology</span>
        </div>
      </div>
    ),
    size,
  );
}
