import Link from "next/link";

const scientistNames = [
  "Newton", "Galileo", "Einstein", "Tesla",
  "Curie", "Faraday", "Feynman", "da Vinci",
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-6 py-16 overflow-hidden">
      {/* 背景グロー */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #c9a84c 0%, transparent 70%)" }}
      />

      {/* メインコンテンツ */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <p
          className="text-sm tracking-[0.3em] uppercase mb-6 opacity-60"
          style={{ color: "var(--accent-gold)" }}
        >
          AI Scientist Mentor
        </p>

        <h1
          className="text-4xl md:text-5xl font-bold leading-tight mb-6"
          style={{ color: "var(--foreground)" }}
        >
          偉人と対話して、
          <br />
          仕事の壁を乗り越えよう
        </h1>

        <p className="text-base md:text-lg opacity-70 leading-relaxed mb-12">
          ニュートン、ガリレオ、テスラ…
          <br />
          歴史を変えた科学者たちが、あなたの悩みに応えます。
          <br className="hidden md:block" />
          同じ技術者として、困難を乗り越えた言葉を届けます。
        </p>

        <Link
          href="/characters"
          className="inline-block px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105"
          style={{
            background: "linear-gradient(135deg, #c9a84c, #f0d080)",
            color: "#0d0d1a",
            boxShadow: "0 0 30px rgba(201,168,76,0.3)",
          }}
        >
          偉人を選ぶ →
        </Link>
      </div>

      {/* 偉人名バッジ */}
      <div className="relative z-10 mt-20 flex flex-wrap justify-center gap-3 max-w-xl opacity-40 text-sm">
        {scientistNames.map((name) => (
          <span
            key={name}
            className="px-3 py-1 rounded-full border"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          >
            {name}
          </span>
        ))}
      </div>
    </main>
  );
}
