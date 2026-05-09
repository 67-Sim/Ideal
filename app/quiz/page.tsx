"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { quizzes, Quiz } from "@/app/data/quizzes";

type QuizRanking = {
  name: string;
  score: number;
  createdAt: string;
};

export default function QuizPage() {
  const router = useRouter();

  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [usedQuizIds, setUsedQuizIds] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [showNameModal, setShowNameModal] = useState(false);
  const [nickname, setNickname] = useState("");
  const [ranking, setRanking] = useState<QuizRanking[]>([]);

  useEffect(() => {
    loadRanking();
  }, []);

  const loadRanking = () => {
    const saved = localStorage.getItem("quiz-ranking");
    const parsed: QuizRanking[] = saved ? JSON.parse(saved) : [];
    const sorted = parsed.sort((a, b) => b.score - a.score);
    setRanking(sorted);
  };

  const pickRandomQuiz = (usedIds: number[]) => {
    const available = quizzes.filter((quiz) => !usedIds.includes(quiz.id));

    if (available.length === 0) {
      finishQuiz();
      return;
    }

    const randomIndex = Math.floor(Math.random() * available.length);
    setCurrentQuiz(available[randomIndex]);
  };

  const startQuiz = () => {
    setStarted(true);
    setFinished(false);
    setScore(0);
    setUsedQuizIds([]);
    setMessage("");
    pickRandomQuiz([]);
  };

  const answerQuiz = (selectedIndex: number) => {
    if (!currentQuiz) return;

    const isCorrect = selectedIndex === currentQuiz.answerIndex;
    const nextUsedIds = [...usedQuizIds, currentQuiz.id];

    setUsedQuizIds(nextUsedIds);

    if (isCorrect) {
      setScore((prev) => prev + currentQuiz.point);
      setMessage(`正解！ +${currentQuiz.point}点`);
    } else {
      setScore((prev) => prev - 3);
      setMessage("不正解… -3点");
    }

    setTimeout(() => {
      pickRandomQuiz(nextUsedIds);
      setMessage("");
    }, 700);
  };

  const finishQuiz = () => {
    setFinished(true);
    setStarted(false);
    setCurrentQuiz(null);
    setShowNameModal(true);
  };

  const saveRanking = (name: string) => {
    const saved = localStorage.getItem("quiz-ranking");
    const parsed: QuizRanking[] = saved ? JSON.parse(saved) : [];

    const newRecord: QuizRanking = {
      name,
      score,
      createdAt: new Date().toISOString(),
    };

    const nextRanking = [...parsed, newRecord].sort((a, b) => b.score - a.score);

    localStorage.setItem("quiz-ranking", JSON.stringify(nextRanking));
    setRanking(nextRanking);
    setShowNameModal(false);
    setFinished(true);
  };

  return (
    <main style={containerStyle}>
      <section style={cardStyle}>
        <button onClick={() => router.push("/")} style={backButton}>
          ← 最初の画面へ戻る
        </button>

        <div style={headerStyle}>
          <h1 style={titleStyle}>理念クイズ王</h1>

          {started && (
            <div style={scoreBoxStyle}>
              <span style={scoreLabelStyle}>SCORE</span>
              <span style={scoreNumberStyle}>{score}</span>
            </div>
          )}
        </div>

        {!started && !finished && (
          <section style={tutorialBoxStyle}>
            <h2 style={subTitleStyle}>遊び方</h2>

            <p style={ruleTextStyle}>
              問題に正解すると、右上のスコアが上がります。
            </p>
            <p style={ruleTextStyle}>
              不正解の場合は <strong>-3点</strong> です。
            </p>
            <p style={ruleTextStyle}>
              いつでも「クイズ王に挑戦！」を押して、今の点数でランキングに挑戦できます。
            </p>

            <button onClick={startQuiz} style={mainButtonStyle}>
              クイズを始める
            </button>
          </section>
        )}

        {started && currentQuiz && (
          <section style={quizBoxStyle}>
            <div style={pointBadgeStyle}>{currentQuiz.point}点問題</div>

            <h2 style={questionStyle}>Q. {currentQuiz.question}</h2>

            <div style={optionsStyle}>
              {currentQuiz.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => answerQuiz(index)}
                  style={optionButtonStyle}
                >
                  {index + 1}. {option}
                </button>
              ))}
            </div>

            {message && <p style={messageStyle}>{message}</p>}

            <button onClick={finishQuiz} style={finishButtonStyle}>
              やめてクイズ王に挑戦！
            </button>
          </section>
        )}

        {finished && (
          <section style={rankingBoxStyle}>
            <h2 style={subTitleStyle}>クイズ王ランキング</h2>

            <p style={finalScoreStyle}>あなたのスコア：{score}点</p>

            <div style={rankingListStyle}>
              {ranking.length === 0 && (
                <p style={emptyTextStyle}>まだランキングがありません。</p>
              )}

              {ranking.map((item, index) => (
                <div key={`${item.name}-${item.createdAt}`} style={rankingItemStyle}>
                  <div style={rankNumberStyle}>{index + 1}</div>

                  <div style={rankingNameAreaStyle}>
                    <p style={rankingNameStyle}>
                      {item.name}
                      {index === 0 && <span style={kingBadgeStyle}> クイズ王!</span>}
                    </p>
                  </div>

                  <div style={rankingScoreStyle}>{item.score}点</div>
                </div>
              ))}
            </div>

            <button onClick={startQuiz} style={mainButtonStyle}>
              もう一度挑戦する
            </button>
          </section>
        )}

        {showNameModal && (
          <div style={modalOverlayStyle}>
            <div style={modalStyle}>
              <h2 style={modalTitleStyle}>ランキングに登録しますか？</h2>

              <p style={modalTextStyle}>
                ニックネームで登録するか、匿名で登録できます。
              </p>

              <input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="ニックネームを入力"
                style={inputStyle}
              />

              <button
                onClick={() => saveRanking(nickname.trim() || "匿名")}
                style={mainButtonStyle}
              >
                この名前で登録する
              </button>

              <button
                onClick={() => saveRanking("匿名")}
                style={anonymousButtonStyle}
              >
                匿名で登録する
              </button>
            </div>
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
  position: "relative",
  maxWidth: "520px",
  minHeight: "680px",
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

const headerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
  marginBottom: "20px",
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "28px",
};

const scoreBoxStyle: React.CSSProperties = {
  minWidth: "82px",
  padding: "8px 12px",
  borderRadius: "16px",
  background: "linear-gradient(135deg, #6d421f, #a97634)",
  color: "#fffaf0",
  textAlign: "center",
  boxShadow: "0 10px 20px rgba(100, 61, 26, 0.22)",
};

const scoreLabelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "10px",
  letterSpacing: "0.12em",
};

const scoreNumberStyle: React.CSSProperties = {
  display: "block",
  fontSize: "22px",
  fontWeight: 700,
};

const tutorialBoxStyle: React.CSSProperties = {
  padding: "24px 18px",
  borderRadius: "26px",
  background: "rgba(255, 250, 240, 0.86)",
  border: "1px solid rgba(120, 82, 38, 0.16)",
};

const subTitleStyle: React.CSSProperties = {
  margin: "0 0 18px",
  fontSize: "22px",
  textAlign: "center",
};

const ruleTextStyle: React.CSSProperties = {
  margin: "0 0 12px",
  fontSize: "15px",
  lineHeight: 1.8,
  color: "#6d5840",
};

const mainButtonStyle: React.CSSProperties = {
  width: "100%",
  marginTop: "18px",
  padding: "15px",
  borderRadius: "999px",
  border: "none",
  background: "linear-gradient(135deg, #6d421f, #a97634)",
  color: "#fffaf0",
  fontSize: "16px",
  fontWeight: 700,
  cursor: "pointer",
  boxShadow: "0 12px 24px rgba(100, 61, 26, 0.24)",
};

const quizBoxStyle: React.CSSProperties = {
  padding: "22px 18px",
  borderRadius: "26px",
  background: "rgba(255, 250, 240, 0.88)",
  border: "1px solid rgba(120, 82, 38, 0.16)",
};

const pointBadgeStyle: React.CSSProperties = {
  display: "inline-block",
  marginBottom: "16px",
  padding: "6px 12px",
  borderRadius: "999px",
  background: "rgba(169, 118, 52, 0.16)",
  color: "#7a4d21",
  fontSize: "13px",
  fontWeight: 700,
};

const questionStyle: React.CSSProperties = {
  margin: "0 0 20px",
  fontSize: "21px",
  lineHeight: 1.6,
};

const optionsStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const optionButtonStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  borderRadius: "16px",
  border: "1px solid rgba(120, 82, 38, 0.18)",
  background: "rgba(255, 252, 244, 0.92)",
  color: "#3b2a1a",
  fontSize: "15px",
  textAlign: "left",
  cursor: "pointer",
};

const messageStyle: React.CSSProperties = {
  margin: "16px 0 0",
  textAlign: "center",
  fontSize: "16px",
  fontWeight: 700,
  color: "#7a4d21",
};

const finishButtonStyle: React.CSSProperties = {
  width: "100%",
  marginTop: "22px",
  padding: "14px",
  borderRadius: "999px",
  border: "1px solid rgba(110, 72, 34, 0.28)",
  background: "rgba(255, 252, 244, 0.92)",
  color: "#6d421f",
  fontSize: "15px",
  fontWeight: 700,
  cursor: "pointer",
};

const rankingBoxStyle: React.CSSProperties = {
  padding: "22px 16px",
  borderRadius: "26px",
  background: "rgba(255, 250, 240, 0.88)",
  border: "1px solid rgba(120, 82, 38, 0.16)",
};

const finalScoreStyle: React.CSSProperties = {
  textAlign: "center",
  fontSize: "18px",
  fontWeight: 700,
  color: "#6d421f",
};

const rankingListStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  marginTop: "18px",
};

const rankingItemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "12px",
  borderRadius: "16px",
  background: "rgba(255, 252, 244, 0.9)",
  border: "1px solid rgba(120, 82, 38, 0.14)",
};

const rankNumberStyle: React.CSSProperties = {
  width: "34px",
  height: "34px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #6d421f, #a97634)",
  color: "#fffaf0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 700,
};

const rankingNameAreaStyle: React.CSSProperties = {
  flex: 1,
};

const rankingNameStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "15px",
  fontWeight: 700,
};

const kingBadgeStyle: React.CSSProperties = {
  color: "#a97634",
  fontSize: "13px",
};

const rankingScoreStyle: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: 700,
  color: "#6d421f",
};

const emptyTextStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#8a6b45",
};

const modalOverlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(30, 20, 10, 0.38)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "24px",
  zIndex: 50,
};

const modalStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "380px",
  padding: "24px",
  borderRadius: "28px",
  background: "#fffaf0",
  boxShadow: "0 24px 60px rgba(30, 20, 10, 0.28)",
  border: "1px solid rgba(120, 82, 38, 0.18)",
};

const modalTitleStyle: React.CSSProperties = {
  margin: "0 0 10px",
  textAlign: "center",
  fontSize: "21px",
};

const modalTextStyle: React.CSSProperties = {
  margin: "0 0 16px",
  textAlign: "center",
  fontSize: "14px",
  color: "#6d5840",
  lineHeight: 1.7,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "13px",
  borderRadius: "14px",
  border: "1px solid rgba(120, 82, 38, 0.22)",
  background: "#fff",
  color: "#3b2a1a",
  fontSize: "16px",
  boxSizing: "border-box",
};

const anonymousButtonStyle: React.CSSProperties = {
  width: "100%",
  marginTop: "10px",
  padding: "14px",
  borderRadius: "999px",
  border: "1px solid rgba(110, 72, 34, 0.28)",
  background: "rgba(255, 252, 244, 0.92)",
  color: "#6d421f",
  fontSize: "15px",
  fontWeight: 700,
  cursor: "pointer",
};