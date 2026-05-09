"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ideals } from "@/app/data/ideals";
import { supabase } from "@/lib/supabase";

type RankingItem = {
  id: number;
  chapter: number;
  title: string;
  votes: number;
};

type VoteRow = {
  ideal_id: number;
};

export default function RankingPage() {
  const router = useRouter();
  const [ranking, setRanking] = useState<RankingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRanking = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("ideal_votes")
        .select("ideal_id");

      if (error) {
        console.log(error);
        setLoading(false);
        return;
      }

      const voteRows = (data || []) as VoteRow[];

      const voteCountMap = voteRows.reduce<Record<number, number>>(
        (acc, row) => {
          acc[row.ideal_id] = (acc[row.ideal_id] || 0) + 1;
          return acc;
        },
        {}
      );

      const result = ideals
        .map((ideal) => {
          return {
            ...ideal,
            votes: voteCountMap[ideal.id] || 0,
          };
        })
        .sort((a, b) => b.votes - a.votes);

      setRanking(result);
      setLoading(false);
    };

    fetchRanking();
  }, []);

  return (
    <main style={containerStyle}>
      <section style={cardStyle}>
        <button onClick={() => router.push("/")} style={backButton}>
          ← 最初の画面へ戻る
        </button>

        <h1 style={titleStyle}>人気理念ランキング</h1>

        <p style={leadStyle}>
          投票数が多い理念から順番に表示されています。
        </p>

        {loading ? (
          <p style={loadingStyle}>ランキングを読み込み中...</p>
        ) : (
          <div style={listStyle}>
            {ranking.map((ideal, index) => (
              <button
                key={ideal.id}
                onClick={() => router.push(`/ideal/${ideal.id}`)}
                style={itemStyle}
              >
                <div style={rankStyle}>{index + 1}</div>

                <div style={textAreaStyle}>
                  <p style={idealTitleStyle}>{ideal.title}</p>
                  <p style={metaStyle}>
                    第{ideal.chapter}章・理念 {ideal.id}
                  </p>
                </div>

                <div style={voteStyle}>{ideal.votes}票</div>
              </button>
            ))}
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
  maxWidth: "520px",
  margin: "0 auto",
  padding: "28px 20px",
  borderRadius: "32px",
  background:
    "linear-gradient(180deg, rgba(255,252,244,0.96), rgba(250,242,226,0.96))",
  boxShadow: "0 24px 60px rgba(80, 52, 25, 0.22)",
  border: "1px solid rgba(120, 82, 38, 0.18)",
  boxSizing: "border-box",
};

const backButton: React.CSSProperties = {
  border: "none",
  background: "transparent",
  color: "#8a6b45",
  fontSize: "14px",
  cursor: "pointer",
  marginBottom: "18px",
};

const titleStyle: React.CSSProperties = {
  margin: "0 0 10px",
  textAlign: "center",
  fontSize: "28px",
};

const leadStyle: React.CSSProperties = {
  margin: "0 0 24px",
  textAlign: "center",
  fontSize: "14px",
  color: "#7a6247",
};

const loadingStyle: React.CSSProperties = {
  textAlign: "center",
  fontSize: "14px",
  color: "#8a6b45",
  padding: "24px 0",
};

const listStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const itemStyle: React.CSSProperties = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "14px",
  borderRadius: "18px",
  border: "1px solid rgba(120, 82, 38, 0.16)",
  background: "rgba(255, 250, 240, 0.88)",
  cursor: "pointer",
  textAlign: "left",
  boxShadow: "0 8px 20px rgba(80, 52, 25, 0.08)",
};

const rankStyle: React.CSSProperties = {
  minWidth: "38px",
  height: "38px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #6d421f, #a97634)",
  color: "#fffaf0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 700,
};

const textAreaStyle: React.CSSProperties = {
  flex: 1,
};

const idealTitleStyle: React.CSSProperties = {
  margin: "0 0 4px",
  fontSize: "15px",
  fontWeight: 700,
  color: "#3b2a1a",
};

const metaStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "12px",
  color: "#8a6b45",
};

const voteStyle: React.CSSProperties = {
  minWidth: "42px",
  textAlign: "right",
  fontSize: "14px",
  fontWeight: 700,
  color: "#6d421f",
};