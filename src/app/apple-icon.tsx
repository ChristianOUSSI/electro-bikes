import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 100,
          background: "linear-gradient(135deg, #09090b 0%, #18181b 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 36,
          border: "4px solid #a3e635",
        }}
      >
        <span
          style={{
            fontWeight: 900,
            color: "#a3e635",
            lineHeight: 1,
          }}
        >
          ⚡
        </span>
      </div>
    ),
    {
      ...size,
    }
  );
}
