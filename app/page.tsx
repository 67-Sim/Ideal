"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const hiraganaGrid = [
  "し", "ゃ", "ち", "ょ",
  "う", "さ", "ま", "け",
  "ん", "た", "つ", "か",
  "も", "と", "に", "ん",
];
const answer = ["け", "ん", "た", "さ", "ん"];

export default function Home() {
  const router = useRouter();
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
   const passed = localStorage.getItem("quizPassed");

   if (passed === "true") {
     setUnlocked(true);
   }
  }, []);
  
  const [selected, setSelected] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const handleHiraganaClick = (hiragana: string) => {
    const next = [...selected, hiragana];
    setSelected(next);

    const currentIndex = next.length - 1;

    if (next[currentIndex] !== answer[currentIndex]) {
      setMessage("もう一度、呼び方を思い出してください。");
      setSelected([]);
      return;
    }

    if (next.length === answer.length) {
      setMessage("「けんたさん」");

      localStorage.setItem("quizPassed", "true");

      setTimeout(() => {
        setUnlocked(true);
      }, 800);
    }
    };

  if (!unlocked) {
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
            minHeight: "620px",
            borderRadius: "32px",
            background:
              "linear-gradient(180deg, rgba(255,252,244,0.96), rgba(250,242,226,0.96))",
            boxShadow: "0 24px 60px rgba(80, 52, 25, 0.22)",
            border: "1px solid rgba(120, 82, 38, 0.18)",
            padding: "36px 24px",
            boxSizing: "border-box",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              letterSpacing: "0.18em",
              color: "#9a7440",
              marginBottom: "18px",
            }}
          >
            COMANY PHILOSOPHY
          </div>

          <h1
            style={{
              fontSize: "28px",
              lineHeight: 1.4,
              margin: 0,
              fontWeight: 700,
            }}
          >
            理念手帳を開く前に
          </h1>

          <p
            style={{
              marginTop: "22px",
              fontSize: "15px",
              lineHeight: 1.8,
              color: "#6d5840",
            }}
          >
            コマニー内での
            <br />
            社長の呼び方は？
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "12px",
              marginTop: "34px",
            }}
          >
            {hiraganaGrid.map((hiragana) => {
              const isSelected = selected.includes(hiragana);

              return (
                <button
                  key={hiragana}
                  onClick={() => handleHiraganaClick(hiragana)}
                  style={{
                    aspectRatio: "1 / 1",
                    borderRadius: "18px",
                    border: isSelected
                      ? "2px solid #8b5a2b"
                      : "1px solid rgba(120, 82, 38, 0.25)",
                    background: isSelected
                      ? "linear-gradient(135deg, #7a451e, #b17a35)"
                      : "rgba(255, 250, 240, 0.9)",
                    color: isSelected ? "#fffaf0" : "#4b321c",
                    fontSize: "26px",
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: "0 10px 20px rgba(80, 52, 25, 0.12)",
                    fontFamily:
                      '"Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif',
                  }}
                >
                  {hiragana}
                </button>
              );
            })}
          </div>

          <p
            style={{
              minHeight: "28px",
              marginTop: "26px",
              fontSize: "15px",
              color: message === "「けんたさん」" ? "#6d421f" : "#9a7440",
              fontWeight: 700,
            }}
          >
            {message}
          </p>
        </section>
      </main>
    );
  }

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
        <div
          style={{
            position: "absolute",
            inset: "18px",
            border: "1px solid rgba(150, 110, 58, 0.22)",
            borderRadius: "26px",
            pointerEvents: "none",
          }}
        />

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
            コマニー
            <br />
            1988年
          </h1>

          <p
            style={{
              marginTop: "18px",
              fontSize: "15px",
              lineHeight: 1.9,
              color: "#6d5840",
            }}
          >
            コマニー第2創業期
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
            会長が社長を務めていたこの時期、
            コマニーでは「利他の心」を社員一人ひとりへ届け、
            理念を自分自身の言葉として受け止めてもらうための歩みが始まりました。
          </p>

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

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <button
            onClick={() => router.push("/bookshelf")}
            style={mainButtonStyle}
          >
            本を開く
          </button>

          <button
            onClick={() => router.push("/ranking")}
            style={subButtonStyle}
          >
            人気理念ランキング
          </button>

          <button onClick={() => router.push("/quiz")} style={subButtonStyle}>
            理念クイズ王に挑戦！
          </button>

          <button
            onClick={() => router.push("/article")}
            style={subButtonStyle}
          >
            理念インタビュー記事を読む
          </button>
        </div>

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