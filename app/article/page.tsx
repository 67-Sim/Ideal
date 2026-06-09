"use client";

import { useRouter } from "next/navigation";

export default function ArticlePage() {
  const router = useRouter();

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #fff8e8 0%, #f4ead8 45%, #e8d7bd 100%)",
        padding: "32px 20px",
        fontFamily:
          '"Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif',
        color: "#3b2a1a",
      }}
    >
      <article
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "rgba(255, 252, 244, 0.96)",
          borderRadius: "24px",
          padding: "28px 24px",
          boxShadow: "0 18px 40px rgba(80, 52, 25, 0.18)",
          border: "1px solid rgba(120, 82, 38, 0.18)",
          lineHeight: 1.9,
        }}
      >
        <button
          onClick={() => router.push("/")}
          style={{
            border: "none",
            background: "transparent",
            color: "#8a6b45",
            fontSize: "14px",
            cursor: "pointer",
            marginBottom: "18px",
            fontFamily:
              '"Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif',
          }}
        >
          ← 表紙へ戻る
        </button>

        <h1
          style={{
            fontSize: "28px",
            marginBottom: "24px",
            textAlign: "center",
          }}
        >
          会長の記事
        </h1>

        {/* PDF 표시 */}
        <iframe
          src="/chairman.pdf"
          style={{
            width: "100%",
            height: "900px",
            border: "none",
            borderRadius: "18px",
            boxShadow: "0 12px 28px rgba(80, 52, 25, 0.16)",
          }}
        />
      </article>
    </main>
  );
}