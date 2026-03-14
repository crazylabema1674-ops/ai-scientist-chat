export type Scientist = {
  id: string;
  name: string;
  nameEn: string;
  field: string;
  catchphrase: string;
  description: string;
  years: string;
};

export const scientists: Scientist[] = [
  {
    id: "newton",
    name: "アイザック・ニュートン",
    nameEn: "Isaac Newton",
    field: "物理・数学",
    catchphrase: "孤独な思考が世界を変える",
    description: "ペスト禍の孤独な研究が万有引力の法則を生んだ",
    years: "1643–1727",
  },
  {
    id: "galileo",
    name: "ガリレオ・ガリレイ",
    nameEn: "Galileo Galilei",
    field: "天文・物理",
    catchphrase: "見ようとしないと、始まらない",
    description: "権力に屈しない真実への執念",
    years: "1564–1642",
  },
  {
    id: "einstein",
    name: "アルベルト・アインシュタイン",
    nameEn: "Albert Einstein",
    field: "物理",
    catchphrase: "常識の外に、真理がある",
    description: "特許局員が相対性理論を生んだ逆境の力",
    years: "1879–1955",
  },
  {
    id: "tesla",
    name: "ニコラ・テスラ",
    nameEn: "Nikola Tesla",
    field: "電気工学",
    catchphrase: "認められなくても、前に進め",
    description: "孤独・資金難の中で未来を信じ続けた",
    years: "1856–1943",
  },
  {
    id: "curie",
    name: "マリ・キュリー",
    nameEn: "Marie Curie",
    field: "化学・物理",
    catchphrase: "情熱は、あらゆる壁を溶かす",
    description: "差別と偏見を研究への情熱で突き破った",
    years: "1867–1934",
  },
  {
    id: "faraday",
    name: "マイケル・ファラデー",
    nameEn: "Michael Faraday",
    field: "電磁気学",
    catchphrase: "学歴より、実験する手を持て",
    description: "学歴なし・独学で電磁誘導を発見",
    years: "1791–1867",
  },
  {
    id: "feynman",
    name: "リチャード・ファインマン",
    nameEn: "Richard Feynman",
    field: "物理",
    catchphrase: "面白さが、最高の燃料だ",
    description: "「楽しむことが最強の原動力」という生き様",
    years: "1918–1988",
  },
  {
    id: "davinci",
    name: "レオナルド・ダ・ヴィンチ",
    nameEn: "Leonardo da Vinci",
    field: "万能",
    catchphrase: "好奇心に、終わりはない",
    description: "5世紀先を行く発想を生んだ無限の好奇心",
    years: "1452–1519",
  },
];

export function getScientistById(id: string): Scientist | undefined {
  return scientists.find((s) => s.id === id);
}
