import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ReviewReply — AI Review Response Manager";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{ background: "#0F0C08", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "60px 80px", fontFamily: "system-ui, sans-serif" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: "linear-gradient(90deg, #F59E0B, #EF4444)", display: "flex" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ fontSize: "64px", fontWeight: 800, color: "#ffffff", letterSpacing: "-2px", display: "flex" }}>ReviewReply</div>
          <div style={{ fontSize: "32px", fontWeight: 500, color: "#F59E0B", display: "flex" }}>AI Review Response Manager</div>
          <div style={{ fontSize: "24px", color: "#6B7280", maxWidth: "700px", lineHeight: 1.4, display: "flex" }}>Generate professional responses to customer reviews in seconds. Google, Yelp, and more.</div>
        </div>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {["Google Reviews", "Yelp", "Professional Tone", "Instant"].map((t) => (
            <div key={t} style={{ background: "#F59E0B20", border: "1px solid #F59E0B40", borderRadius: "12px", padding: "8px 20px", fontSize: "18px", color: "#F59E0B", fontWeight: 600, display: "flex" }}>{t}</div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: "18px", color: "#4B5563", display: "flex" }}>reviewreply-ten.vercel.app</div>
          <div style={{ fontSize: "18px", color: "#4B5563", display: "flex" }}>automatik.studio</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
