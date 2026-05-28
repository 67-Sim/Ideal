"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const chapters = [
  {
    id: 1,
    label: "第1章",
    title: "理念の原点",
    position: "top",
  },
  {
    id: 2,
    label: "第2章",
    title: "人と組織",
    position: "left",
  },
  {
    id: 3,
    label: "第3章",
    title: "仕事と価値",
    position: "right",
  },
  {
    id: 4,
    label: "第4章",
    title: "未来への継承",
    position: "bottom",
  },
];

export default function BookshelfPage() {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const [showChapters, setShowChapters] = useState(false);

  useEffect(() => {
    const openTimer = setTimeout(() => {
      setOpened(true);
    }, 400);

    const chapterTimer = setTimeout(() => {
      setShowChapters(true);
    }, 1200);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(chapterTimer);
    };
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #fff8e8 0%, #f4ead8 45%, #e8d7bd 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily:
          '"Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif',
        color: "#3b2a1a",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "430px",
          minHeight: "740px",
          borderRadius: "32px",
          background:
            "linear-gradient(180deg, rgba(255,252,244,0.96), rgba(250,242,226,0.96))",
          boxShadow: "0 24px 60px rgba(80, 52, 25, 0.22)",
          border: "1px solid rgba(120, 82, 38, 0.18)",
          padding: "28px 22px",
          boxSizing: "border-box",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "18px",
            border: "1px solid rgba(150, 110, 58, 0.22)",
            borderRadius: "26px",
            pointerEvents: "none",
          }}
        />

        <button
          onClick={() => router.push("/")}
          style={{
            position: "relative",
            zIndex: 5,
            border: "none",
            background: "transparent",
            color: "#8a6b45",
            fontSize: "14px",
            cursor: "pointer",
            marginBottom: "14px",
          }}
        >
          ← 表紙へ戻る
        </button>

        <div
          style={{
            textAlign: "center",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div
            style={{
              fontSize: "12px",
              letterSpacing: "0.18em",
              color: "#9a7440",
              marginBottom: "10px",
            }}
          >
            OPEN THE BOOK
          </div>

          <h1
            style={{
              fontSize: "27px",
              margin: 0,
              letterSpacing: "0.05em",
            }}
          >
            理念の章を選ぶ
          </h1>

          <p
            style={{
              marginTop: "12px",
              fontSize: "13px",
              lineHeight: 1.8,
              color: "#6d5840",
            }}
          >
            4つの章から
            <br />
            心に響く理念を探してください。
          </p>
        </div>

        {/* 책 펼침 연출 */}
        <div
          style={{
            margin: "34px auto 18px",
            width: "300px",
            height: "230px",
            position: "relative",
            perspective: "1000px",
            zIndex: 2,
          }}
        >
          {/* 그림자 */}
          <div
            style={{
              position: "absolute",
              left: "38px",
              right: "38px",
              bottom: "10px",
              height: "28px",
              borderRadius: "50%",
              background: "rgba(80, 45, 18, 0.2)",
              filter: "blur(10px)",
              transform: opened ? "scaleX(1.15)" : "scaleX(0.7)",
              transition: "all 900ms ease",
            }}
          />

          {/* 왼쪽 페이지 */}
          <div
            style={{
              position: "absolute",
              left: opened ? "8px" : "88px",
              top: "28px",
              width: "140px",
              height: "185px",
              borderRadius: "14px 8px 8px 14px",
              background:
                "linear-gradient(90deg, #efe0bf 0%, #fff8e8 82%, #e0cda5 100%)",
              boxShadow: "0 16px 24px rgba(80, 45, 18, 0.22)",
              border: "1px solid rgba(130, 91, 45, 0.24)",
              transformOrigin: "right center",
              transform: opened
                ? "rotateY(0deg)"
                : "rotateY(72deg) translateX(18px)",
              transition:
                "left 850ms ease, transform 850ms cubic-bezier(.2,.8,.2,1)",
              overflow: "hidden",
            }}
          >
            <PageLines side="left" />
          </div>

          {/* 오른쪽 페이지 */}
          <div
            style={{
              position: "absolute",
              right: opened ? "8px" : "88px",
              top: "28px",
              width: "140px",
              height: "185px",
              borderRadius: "8px 14px 14px 8px",
              background:
                "linear-gradient(90deg, #e0cda5 0%, #fff8e8 18%, #efe0bf 100%)",
              boxShadow: "0 16px 24px rgba(80, 45, 18, 0.22)",
              border: "1px solid rgba(130, 91, 45, 0.24)",
              transformOrigin: "left center",
              transform: opened
                ? "rotateY(0deg)"
                : "rotateY(-72deg) translateX(-18px)",
              transition:
                "right 850ms ease, transform 850ms cubic-bezier(.2,.8,.2,1)",
              overflow: "hidden",
            }}
          >
            <PageLines side="right" />
          </div>

          {/* 가운데 접힘 */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "30px",
              width: "3px",
              height: "180px",
              transform: "translateX(-50%)",
              borderRadius: "999px",
              background:
                "linear-gradient(180deg, rgba(120,80,38,0.18), rgba(80,45,18,0.35), rgba(120,80,38,0.18))",
              opacity: opened ? 1 : 0.2,
              transition: "opacity 800ms ease",
            }}
          />

          {/* 닫힌 책 표지 느낌 */}
          <div
            style={{
              position: "absolute",
              left: "90px",
              top: "26px",
              width: "120px",
              height: "190px",
              borderRadius: "14px 24px 24px 14px",
              background: "linear-gradient(135deg, #7a451e, #b17a35)",
              boxShadow: "0 20px 34px rgba(70, 38, 13, 0.28)",
              border: "1px solid rgba(90, 48, 17, 0.28)",
              opacity: opened ? 0 : 1,
              transform: opened
                ? "scale(0.82) rotateY(40deg)"
                : "scale(1) rotateY(0deg)",
              transition: "opacity 500ms ease, transform 700ms ease",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "14px",
                top: 0,
                bottom: 0,
                width: "18px",
                background: "rgba(60, 30, 10, 0.22)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "120px",
                left: "42px",
                right: "22px",
                textAlign: "center",
                fontSize: "10px",
                letterSpacing: "0.14em",
                color: "#fff1c8",
                fontWeight: 700,
              }}
            >
              理念手帳
            </div>
          </div>
        </div>

        {/* 장 선택 스킬트리 */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "310px",
            marginTop: "6px",
            opacity: showChapters ? 1 : 0,
            transform: showChapters ? "translateY(0)" : "translateY(18px)",
            transition: "opacity 700ms ease, transform 700ms ease",
            zIndex: 3,
          }}
        >
          {/* 중앙 문장 */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "118px",
              height: "118px",
              borderRadius: "50%",
              background:
                "linear-gradient(180deg, rgba(255,248,232,0.95), rgba(235,214,174,0.95))",
              border: "1px solid rgba(140, 95, 42, 0.25)",
              boxShadow: "0 12px 26px rgba(90, 56, 24, 0.16)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontSize: "13px",
              lineHeight: 1.6,
              color: "#6a4a28",
              fontWeight: 700,
            }}
          >

          </div>

          {/* 연결선 */}
          <div style={lineVertical} />
          <div style={lineHorizontal} />

          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => router.push(`/chapter/${chapter.id}`)}
              style={{
                ...chapterCardStyle,
                ...getChapterPosition(chapter.position),
              }}
            >
              <span
                style={{
                  display: "block",
                  fontSize: "13px",
                  color: "#9a7440",
                  marginBottom: "5px",
                  letterSpacing: "0.08em",
                }}
              >
                {chapter.label}
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: "15px",
                  color: "#3b2a1a",
                  fontWeight: 700,
                }}
              >
                {chapter.title}
              </span>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

function PageLines({ side }: { side: "left" | "right" }) {
  return (
    <>
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: side === "left" ? "22px" : "18px",
            right: side === "left" ? "18px" : "22px",
            top: `${42 + i * 26}px`,
            height: "1px",
            background: "rgba(120, 82, 38, 0.24)",
          }}
        />
      ))}

    </>
  );
}

function getChapterPosition(position: string): React.CSSProperties {
  switch (position) {
    case "top":
      return {
        left: "50%",
        top: "0",
        transform: "translateX(-50%)",
      };
    case "left":
      return {
        left: "0",
        top: "50%",
        transform: "translateY(-50%)",
      };
    case "right":
      return {
        right: "0",
        top: "50%",
        transform: "translateY(-50%)",
      };
    case "bottom":
      return {
        left: "50%",
        bottom: "0",
        transform: "translateX(-50%)",
      };
    default:
      return {};
  }
}

const chapterCardStyle: React.CSSProperties = {
  position: "absolute",
  width: "132px",
  minHeight: "72px",
  borderRadius: "18px",
  border: "1px solid rgba(120, 82, 38, 0.24)",
  background:
    "linear-gradient(180deg, rgba(255,252,244,0.96), rgba(239,224,191,0.9))",
  boxShadow: "0 12px 24px rgba(90, 56, 24, 0.14)",
  cursor: "pointer",
  padding: "12px 10px",
  boxSizing: "border-box",
  fontFamily:
    '"Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif',
};

const lineVertical: React.CSSProperties = {
  position: "absolute",
  left: "50%",
  top: "42px",
  bottom: "42px",
  width: "1px",
  transform: "translateX(-50%)",
  background:
    "linear-gradient(180deg, transparent, rgba(130, 90, 42, 0.35), transparent)",
};

const lineHorizontal: React.CSSProperties = {
  position: "absolute",
  left: "52px",
  right: "52px",
  top: "50%",
  height: "1px",
  transform: "translateY(-50%)",
  background:
    "linear-gradient(90deg, transparent, rgba(130, 90, 42, 0.35), transparent)",
};