"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ideals } from "@/app/data/ideals";
import { supabase } from "@/lib/supabase";

export default function IdealPage() {
  const router = useRouter();
  const params = useParams();
  const idealId = Number(params.idealId);

  const ideal = ideals.find((item) => item.id === idealId);
  const [voted, setVoted] = useState(false);
  const [isVoting, setIsVoting] = useState(false);

  useEffect(() => {
    if (!ideal) return;

    const checkVote = async () => {
      const voterKey = localStorage.getItem("ideal-voter-key");

      if (!voterKey) return;

      const { data, error } = await supabase
        .from("ideal_votes")
        .select("id")
        .eq("ideal_id", ideal.id)
        .eq("voter_key", voterKey)
        .maybeSingle();

      if (error) {
        console.log(error);
        return;
      }

      if (data) {
        setVoted(true);
      }
    };

    checkVote();
  }, [ideal]);

  if (!ideal) {
    return (
      <main style={containerStyle}>
        <h1>Not Found</h1>
        <button onClick={() => router.push("/bookshelf")} style={backButton}>
          戻る
        </button>
      </main>
    );
  }

  const handleVote = async () => {
    if (!ideal || isVoting || voted) return;

    setIsVoting(true);

    const savedVoterKey = localStorage.getItem("ideal-voter-key");
    const voterKey = savedVoterKey || crypto.randomUUID();

    localStorage.setItem("ideal-voter-key", voterKey);

    const { error } = await supabase.from("ideal_votes").insert({
      ideal_id: ideal.id,
      voter_key: voterKey,
    });

    setIsVoting(false);

    if (error) {
      console.log(error);

      if (error.code === "23505") {
        alert("すでにこの理念に投票しています。");
        setVoted(true);
        return;
      }

      alert("投票に失敗しました。");
      return;
    }

    setVoted(true);
  };

  return (
    <main style={containerStyle}>
      <section style={cardStyle}>
        <button
          onClick={() => router.push(`/chapter/${ideal.chapter}`)}
          style={backButton}
        >
          ← 第{ideal.chapter}章へ戻る
        </button>

        <p style={chapterStyle}>第{ideal.chapter}章</p>

        <div style={numberBadgeStyle}>理念 {ideal.id}</div>

        <h1 style={titleStyle}>{ideal.title}</h1>
        
        <div style={questionBoxStyle}>
          <p style={questionStyle}>この理念に投票しますか？</p>

          <button
            onClick={handleVote}
            disabled={voted || isVoting}
            style={{
              ...voteButtonStyle,
              opacity: voted ? 0.85 : 1,
              transform: voted ? "scale(0.98)" : "scale(1)",
              cursor: voted || isVoting ? "default" : "pointer",
            }}
          >
            {isVoting
              ? "投票中..."
              : voted
              ? "投票しました"
              : "この理念に投票する"}
          </button>
        </div>

        {voted && (
          <div style={completeBoxStyle}>
            <div style={sparkleStyle}>✦</div>
            <p style={completeTitleStyle}>あなたの共感を受け取りました</p>
            <p style={completeTextStyle}>
              投票ありがとうございます。あなたの一票が理念の価値を形にします。
            </p>

            <button
              onClick={() => router.push("/ranking")}
              style={rankingButtonStyle}
            >
              ランキングを見る
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

const containerStyle: React.CSSProperties = {
  minHeight: "100vh",
  padding: "24px",
  background:
    "radial-gradient(circle at top, #fff8e8 0%, #f4ead8 45%, #e8d7bd 100%)",
  fontFamily:
    '"Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif',
  color: "#3b2a1a",
};

const cardStyle: React.CSSProperties = {
  maxWidth: "430px",
  minHeight: "680px",
  margin: "0 auto",
  padding: "28px 24px",
  borderRadius: "32px",
  background:
    "linear-gradient(180deg, rgba(255,252,244,0.96), rgba(250,242,226,0.96))",
  boxShadow: "0 24px 60px rgba(80, 52, 25, 0.22)",
  border: "1px solid rgba(120, 82, 38, 0.18)",
  boxSizing: "border-box",
  textAlign: "center",
};

const backButton: React.CSSProperties = {
  border: "none",
  background: "transparent",
  color: "#8a6b45",
  fontSize: "14px",
  cursor: "pointer",
  marginBottom: "22px",
};

const chapterStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "13px",
  color: "#9a7440",
  letterSpacing: "0.12em",
};

const numberBadgeStyle: React.CSSProperties = {
  width: "92px",
  height: "92px",
  margin: "18px auto 20px",
  borderRadius: "50%",
  background:
    "linear-gradient(180deg, rgba(255,248,232,0.95), rgba(235,214,174,0.95))",
  border: "1px solid rgba(140, 95, 42, 0.25)",
  boxShadow: "0 12px 26px rgba(90, 56, 24, 0.16)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "16px",
  fontWeight: 700,
  color: "#6a4a28",
};

const titleStyle: React.CSSProperties = {
  fontSize: "25px",
  lineHeight: 1.45,
  margin: "0 0 22px",
};

const descriptionStyle: React.CSSProperties = {
  margin: "0 auto 28px",
  maxWidth: "340px",
  fontSize: "15px",
  lineHeight: 1.9,
  color: "#6d5840",
  textAlign: "left",
};

const questionBoxStyle: React.CSSProperties = {
  marginTop: "22px",
  padding: "20px",
  borderRadius: "24px",
  background: "rgba(255, 250, 240, 0.82)",
  border: "1px solid rgba(120, 82, 38, 0.18)",
};

const questionStyle: React.CSSProperties = {
  margin: "0 0 16px",
  fontSize: "16px",
  fontWeight: 700,
};

const voteButtonStyle: React.CSSProperties = {
  width: "100%",
  padding: "16px",
  borderRadius: "999px",
  border: "none",
  background: "linear-gradient(135deg, #6d421f, #a97634)",
  color: "#fffaf0",
  fontSize: "16px",
  fontWeight: 700,
  boxShadow: "0 12px 24px rgba(100, 61, 26, 0.28)",
  transition: "transform 180ms ease, opacity 180ms ease",
};

const completeBoxStyle: React.CSSProperties = {
  marginTop: "22px",
  padding: "20px",
  borderRadius: "24px",
  background:
    "linear-gradient(180deg, rgba(255,248,232,0.95), rgba(236,221,190,0.95))",
  border: "1px solid rgba(150, 110, 58, 0.24)",
  boxShadow: "0 14px 28px rgba(90, 56, 24, 0.14)",
};

const sparkleStyle: React.CSSProperties = {
  fontSize: "28px",
  color: "#a97634",
  marginBottom: "8px",
};

const completeTitleStyle: React.CSSProperties = {
  margin: "0 0 8px",
  fontSize: "16px",
  fontWeight: 700,
};

const completeTextStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "13px",
  lineHeight: 1.7,
  color: "#6d5840",
};

const rankingButtonStyle: React.CSSProperties = {
  marginTop: "16px",
  width: "100%",
  padding: "13px",
  borderRadius: "999px",
  border: "1px solid rgba(110, 72, 34, 0.28)",
  background: "rgba(255, 252, 244, 0.9)",
  color: "#6d421f",
  fontSize: "14px",
  fontWeight: 700,
  cursor: "pointer",
};