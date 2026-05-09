"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

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
          padding: "32px 24px",
          boxSizing: "border-box",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 테두리 장식 */}
        <div
          style={{
            position: "absolute",
            inset: "18px",
            border: "1px solid rgba(150, 110, 58, 0.22)",
            borderRadius: "26px",
            pointerEvents: "none",
          }}
        />

        {/* 타이틀 */}
        <div style={{ textAlign: "center", marginTop: "28px", zIndex: 1 }}>
          <div
            style={{
              fontSize: "13px",
              letterSpacing: "0.18em",
              color: "#9a7440",
              marginBottom: "14px",
            }}
          >
            COMANY PHILOSOPHY
          </div>

          <h1
            style={{
              fontSize: "34px",
              lineHeight: 1.25,
              margin: 0,
              fontWeight: 700,
              letterSpacing: "0.04em",
            }}
          >
            コマニ
            <br />
            0000年
          </h1>

          {/* 제2시기 설명 */}
          <p
            style={{
              marginTop: "18px",
              fontSize: "15px",
              lineHeight: 1.9,
              color: "#6d5840",
            }}
          >
            コマニ第2期、
            <br />
            理念が社内へ広がりはじめた時代。
          </p>

          <p
            style={{
              margin: "18px auto 0",
              maxWidth: "330px",
              fontSize: "13px",
              lineHeight: 1.85,
              color: "#7a6348",
              textAlign: "left",
            }}
          >
            〇〇年から始まったこの取り組みは、
            〇〇〇〇という背景の中で、
            一人ひとりが理念を自分の言葉で受け止めるために
            進められてきました。
          </p>

          {/* 선택 유도 핵심 문장 */}
          <p
            style={{
              marginTop: "18px",
              fontSize: "14px",
              lineHeight: 1.8,
              color: "#5c4630",
              fontWeight: 600,
            }}
          >
            心に響く理念を、
            <br />
            この一冊から選んでください。
          </p>
        </div>

        {/* 책 비주얼 */}
        <div
          style={{
            margin: "28px auto 30px",
            width: "180px",
            height: "210px",
            borderRadius: "14px 24px 24px 14px",
            background: "linear-gradient(135deg, #7a451e, #b17a35)",
            boxShadow: "0 22px 36px rgba(70, 38, 13, 0.28)",
            position: "relative",
            overflow: "hidden",
            border: "1px solid rgba(90, 48, 17, 0.28)",
          }}
        >
          {/* 책 등 */}
          <div
            style={{
              position: "absolute",
              left: "14px",
              top: "0",
              bottom: "0",
              width: "18px",
              background: "rgba(60, 30, 10, 0.22)",
            }}
          />

          {/* 페이지 영역 */}
          <div
            style={{
              position: "absolute",
              inset: "18px 18px 18px 42px",
              borderRadius: "12px",
              border: "1px solid rgba(255, 239, 190, 0.55)",
              background:
                "linear-gradient(180deg, rgba(255,239,190,0.28), rgba(255,239,190,0.08))",
            }}
          />

          {/* 장식 라인 */}
          <div
            style={{
              position: "absolute",
              top: "60px",
              left: "54px",
              right: "28px",
              height: "1px",
              background: "rgba(255, 239, 190, 0.6)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "90px",
              left: "54px",
              right: "28px",
              height: "1px",
              background: "rgba(255, 239, 190, 0.45)",
            }}
          />

          <div
            style={{
              position: "absolute",
              bottom: "120px",
              left: "54px",
              right: "28px",
              textAlign: "center",
              fontSize: "14px",
              letterSpacing: "0.14em",
              color: "#fff1c8",
              fontWeight: 700,
            }}
          >
            理念手帳
          </div>
        </div>

        {/* 버튼 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <button onClick={() => router.push("/bookshelf")} style={mainButtonStyle}>
            本を開く
          </button>

          <button onClick={() => router.push("/ranking")} style={subButtonStyle}>
            人気理念ランキング
          </button>

          <button
            onClick={() => router.push("/quiz")}
            style={subButtonStyle}
          >
            理念クイズ王に挑戦！
          </button>
        </div>

        {/* 하단 문구 */}
        <p
          style={{
            marginTop: "26px",
            textAlign: "center",
            fontSize: "12px",
            color: "#9a8060",
          }}
        >
          あなたの一票が、理念の価値を形にします。
        </p>
      </section>
    </main>
  );
}

const mainButtonStyle: React.CSSProperties = {
  width: "100%",
  padding: "16px",
  borderRadius: "999px",
  border: "none",
  background: "linear-gradient(135deg, #6d421f, #a97634)",
  color: "#fffaf0",
  fontSize: "17px",
  fontWeight: 700,
  cursor: "pointer",
  boxShadow: "0 12px 24px rgba(100, 61, 26, 0.28)",
};

const subButtonStyle: React.CSSProperties = {
  width: "100%",
  padding: "15px",
  borderRadius: "999px",
  border: "1px solid rgba(120, 82, 38, 0.28)",
  background: "rgba(255, 250, 240, 0.82)",
  color: "#4b321c",
  fontSize: "16px",
  fontWeight: 700,
  cursor: "pointer",
};