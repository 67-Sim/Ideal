export type Quiz = {
  id: number;
  question: string;
  options: string[];
  answerIndex: number;
  point: number;
};

export const quizzes: Quiz[] = [
  {
    id: 1,
    question: "焼いても食べられないパンは？",
    options: [
      "メロンパン",
      "クリームパン",
      "フライパン",
      "カレーパン",
    ],
    answerIndex: 2,
    point: 1,
  },

  {
    id: 2,
    question: "四角いボールってなーんだ？",
    options: [
      "サッカーボール",
      "野球ボール",
      "段ボール",
      "バスケットボール",
    ],
    answerIndex: 2,
    point: 2,
  },

  {
    id: 3,
    question: "ひっくり返すと軽くなる動物は？",
    options: [
      "パンダ",
      "イルカ",
      "ゾウ",
      "キリン",
    ],
    answerIndex: 1,
    point: 3,
  },

  {
    id: 4,
    question: "冷蔵庫の中にいる動物は？",
    options: [
      "ゾウ",
      "ライオン",
      "ウサギ",
      "サル",
    ],
    answerIndex: 0,
    point: 4,
  },

  {
    id: 5,
    question: "学校の中でどんどん歳を取る場所は？",
    options: [
      "教室",
      "体育館",
      "廊下",
      "図書室",
    ],
    answerIndex: 2,
    point: 5,
  },
];