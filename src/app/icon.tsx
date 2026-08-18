import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: "#09090b",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
          border: "1.5px solid #a3e635",
          boxShadow: "0 0 10px rgba(163, 230, 53, 0.6)",
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
