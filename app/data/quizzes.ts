export type Quiz = {
  id: number;
  question: string;
  options: string[];
  answerIndex: number;
  point: number;
  explanation: string;
};

export const quizzes: Quiz[] = [
  {
    id: 1,
    question: "会長が一番好きな理念はどれでしょう？",
    options: [
      "仕事が好きな人になろう",
      "利他の心を判断基準にしよう",
      "高い目標を持とう",
      "素直な心を持とう",
    ],
    answerIndex: 1,
    point: 1,
    explanation:
      "会長が一番好きな理念は「利他の心を判断基準にしよう」です！ちなみに、会長が一番難しいと感じている理念は「素直な心を持とう」です。",
  },

  {
    id: 2,
    question: "クイズ内容",
    options: [
      "選択肢1",
      "選択肢2",
      "選択肢3",
      "選択肢4",
    ],
    answerIndex: 0,
    point: 2,
    explanation: "説明",
  },

  {
    id: 3,
    question: "クイズ内容",
    options: [
      "選択肢1",
      "選択肢2",
      "選択肢3",
      "選択肢4",
    ],
    answerIndex: 0,
    point: 3,
    explanation: "説明",
  },

  {
    id: 4,
    question: "クイズ内容",
    options: [
      "選択肢1",
      "選択肢2",
      "選択肢3",
      "選択肢4",
    ],
    answerIndex: 0,
    point: 4,
    explanation: "説明",
  },

  {
    id: 5,
    question: "クイズ内容",
    options: [
      "選択肢1",
      "選択肢2",
      "選択肢3",
      "選択肢4",
    ],
    answerIndex: 0,
    point: 5,
    explanation: "説明",
  },

  {
    id: 6,
    question: "クイズ内容",
    options: [
      "選択肢1",
      "選択肢2",
      "選択肢3",
      "選択肢4",
    ],
    answerIndex: 0,
    point: 6,
    explanation: "説明",
  },

  {
    id: 7,
    question: "クイズ内容",
    options: [
      "選択肢1",
      "選択肢2",
      "選択肢3",
      "選択肢4",
    ],
    answerIndex: 0,
    point: 7,
    explanation: "説明",
  },

  {
    id: 8,
    question: "クイズ内容",
    options: [
      "選択肢1",
      "選択肢2",
      "選択肢3",
      "選択肢4",
    ],
    answerIndex: 0,
    point: 8,
    explanation: "説明",
  },

  {
    id: 9,
    question: "クイズ内容",
    options: [
      "選択肢1",
      "選択肢2",
      "選択肢3",
      "選択肢4",
    ],
    answerIndex: 0,
    point: 9,
    explanation: "説明",
  },

  {
    id: 10,
    question: "クイズ内容",
    options: [
      "選択肢1",
      "選択肢2",
      "選択肢3",
      "選択肢4",
    ],
    answerIndex: 0,
    point: 10,
    explanation: "説明",
  },
];