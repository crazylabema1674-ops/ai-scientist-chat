import Link from "next/link";
import { scientists } from "@/lib/scientists";

export const metadata = {
  title: "偉人を選ぶ | AI科学者メンター",
  description: "対話する偉人を選んでください。8人の科学者があなたの悩みに答えます。",
};

export default function CharactersPage() {
  return (
    <main className="relative min-h-screen px-6 py-14">
      <div className="max-w-5xl mx-auto">

        {/* 戻るリンク */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm mb-12 transition-opacity opacity-50 hover:opacity-100"
          style={{ color: "var(--accent-gold)" }}
        >
          ← トップへ戻る
        </Link>

        {/* ページヘッダー */}
        <div className="text-center mb-14">
          <p
            className="text-xs tracking-[0.35em] uppercase mb-4 opacity-60"
            style={{ color: "var(--accent-gold)" }}
          >
            Choose Your Mentor
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            偉人を選ぶ
          </h1>
          <p className="text-sm md:text-base opacity-55 leading-relaxed">
            対話したい科学者を選んでください。
            <br className="hidden sm:block" />
            仕事の壁を乗り越えた言葉があなたに届きます。
          </p>
        </div>

        {/* 偉人カードグリッド */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {scientists.map((scientist) => (
            <Link
              key={scientist.id}
              href={`/chat/${scientist.id}`}
              className="scientist-card group relative flex flex-col rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              {/* 分野バッジ */}
              <span
                className="self-start text-xs px-2.5 py-0.5 rounded-full mb-5"
                style={{
                  background: "rgba(201, 168, 76, 0.1)",
                  color: "var(--accent-gold)",
                  border: "1px solid rgba(201, 168, 76, 0.25)",
                }}
              >
                {scientist.field}
              </span>

              {/* 名前 */}
              <div className="flex-1">
                <h2 className="font-bold text-base leading-snug mb-1">
                  {scientist.name}
                </h2>
                <p className="text-xs opacity-35 mb-1">{scientist.nameEn}</p>
                <p className="text-xs opacity-25 mb-5">{scientist.years}</p>

                {/* キャッチコピー */}
                <p
                  className="text-sm italic leading-relaxed"
                  style={{ color: "var(--accent-gold)" }}
                >
                  「{scientist.catchphrase}」
                </p>
              </div>

              {/* ホバーで表示：説明 */}
              <p className="text-xs opacity-0 group-hover:opacity-45 transition-opacity duration-300 mt-4 leading-relaxed">
                {scientist.description}
              </p>

              {/* ホバーで表示：CTAテキスト */}
              <div
                className="mt-4 text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ color: "var(--accent-gold)" }}
              >
                対話する
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>

              {/* ホバー時のボーダーグロー（::after overlay） */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  boxShadow: "inset 0 0 0 1px rgba(201, 168, 76, 0.35), 0 0 24px rgba(201, 168, 76, 0.08)",
                }}
              />
            </Link>
          ))}
        </div>

        {/* フッター補足 */}
        <p className="text-center text-xs opacity-25 mt-14">
          8人の偉人から選択できます。いつでも別の偉人に切り替えられます。
        </p>

      </div>
    </main>
  );
}
