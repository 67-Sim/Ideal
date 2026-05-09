"use client";

import { useParams, useRouter } from "next/navigation";
import { ideals } from "@/app/data/ideals";

const chapterTitles: Record<string, string> = {
  "1": "経営のこころ",
  "2": "素晴らしい人生をおくるために",
  "3": "コマニーでは一人一人が経営者",
  "4": "日々の仕事を進めるにあたって",
};

export default function ChapterPage() {
  const router = useRouter();
  const params = useParams();

  const chapterId = String(params.chapterId ?? "");

  const filteredIdeals = ideals.filter(
    (ideal) => String(ideal.chapter) === chapterId
  );

  if (!chapterTitles[chapterId] || filteredIdeals.length === 0) {
    return (
      <main style={containerStyle}>
        <h1>Not Found</h1>

        <button onClick={() => router.push("/bookshelf")} style={backButton}>
          戻る
        </button>
      </main>
    );
  }

  return (
    <main style={containerStyle}>
      <button onClick={() => router.push("/bookshelf")} style={backButton}>
        ← 章選択へ戻る
      </button>

      <p style={subTitleStyle}>第{chapterId}章</p>

      <h1 style={titleStyle}>
        {chapterTitles[chapterId]}
      </h1>

      <div style={gridStyle}>
        {filteredIdeals.map((ideal) => (
          <button
            key={ideal.id}
            onClick={() => router.push(`/ideal/${ideal.id}`)}
            style={cardStyle}
          >
            <span style={numberStyle}>
              理念 {ideal.id}
            </span>

            <span style={idealTitleStyle}>
              {ideal.title}
            </span>
          </button>
        ))}
      </div>
    </main>
  );
}

const containerStyle: React.CSSProperties = {
  minHeight: "100vh",
  padding: "24px",
  textAlign: "center",
  background:
    "radial-gradient(circle at top, #fff8e8 0%, #f4ead8 45%, #e8d7bd 100%)",
  fontFamily:
    '"Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif',
  color: "#3b2a1a",
};

const backButton: React.CSSProperties = {
  border: "none",
  background: "transparent",
  color: "#8a6b45",
  marginBottom: "18px",
  cursor: "pointer",
  fontSize: "14px",
};

const subTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "13px",
  color: "#9a7440",
  letterSpacing: "0.12em",
};

const titleStyle: React.CSSProperties = {
  fontSize: "26px",
  lineHeight: 1.35,
  margin: "8px 0 24px",
};

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "12px",
  maxWidth: "430px",
  margin: "0 auto",
};

const cardStyle: React.CSSProperties = {
  width: "100%",
  padding: "16px 18px",
  borderRadius: "18px",
  border: "1px solid rgba(120, 82, 38, 0.24)",
  background: "rgba(255, 250, 240, 0.9)",
  color: "#3b2a1a",
  cursor: "pointer",
  boxShadow: "0 10px 22px rgba(90, 56, 24, 0.12)",
  textAlign: "left",
  fontFamily:
    '"Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif',
};

const numberStyle: React.CSSProperties = {
  display: "block",
  fontSize: "12px",
  color: "#9a7440",
  marginBottom: "6px",
  letterSpacing: "0.08em",
};

const idealTitleStyle: React.CSSProperties = {
  display: "block",
  fontSize: "16px",
  fontWeight: 700,
  lineHeight: 1.5,
};