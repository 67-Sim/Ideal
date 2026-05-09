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
    question: "パンはパンでも、食べられないパンは？",
    options: [
      "メロンパン",
      "フライパン",
      "カレーパン",
      "クリームパン",
    ],
    answerIndex: 1,
    point: 1,
  },

  {
    id: 2,
    question: "いつも空にある野菜は？",
    options: [
      "トマト",
      "にんじん",
      "かぼちゃ",
      "レタス",
    ],
    answerIndex: 2,
    point: 2,
  },

  {
    id: 3,
    question: "逆立ちすると軽くなる動物は？",
    options: [
      "パンダ",
      "イルカ",
      "ラクダ",
      "カンガルー",
    ],
    answerIndex: 2,
    point: 3,
  },

  {
    id: 4,
    question: "寝ても寝ても眠い花は？",
    options: [
      "チューリップ",
      "バラ",
      "スイセン",
      "ひまわり",
    ],
    answerIndex: 2,
    point: 4,
  },

  {
    id: 5,
    question: "いつも文句を言っている鳥は？",
    options: [
      "カラス",
      "フクロウ",
      "ブンチョウ",
      "スズメ",
    ],
    answerIndex: 2,
    point: 5,
  },
];