"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getScientistById } from "@/lib/scientists";

type Message = {
  role: "user" | "scientist";
  content: string;
};

const PRESET_QUESTIONS = [
  "仕事の壁を乗り越えるには？",
  "モチベーションをどう保ちましたか？",
  "あなたの信念を教えてください",
  "失敗したときはどうしましたか？",
];

export default function ChatPage() {
  const params = useParams();
  const id = params.id as string;
  const scientist = getScientistById(id);

  const [messages, setMessages] = useState<Message[]>(() => [
    {
      role: "scientist",
      content: scientist
        ? `${scientist.name}です。仕事の壁、信念、モチベーション…何でも聞いてください。同じ技術者として、正直に話しましょう。`
        : "こんにちは。",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!scientist) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="opacity-60 mb-4">偉人が見つかりませんでした</p>
          <Link href="/characters" style={{ color: "var(--accent-gold)" }}>
            ← 偉人選択へ戻る
          </Link>
        </div>
      </main>
    );
  }

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content };
    const updatedMessages = [...messages, userMessage];

    // Show user message + empty placeholder for streaming
    setMessages([...updatedMessages, { role: "scientist", content: "" }]);
    setInput("");
    setIsLoading(true);

    try {
      // Build API history: skip initial greeting (index 0), map roles
      const apiMessages = updatedMessages
        .slice(1)
        .map((m) => ({
          role: m.role === "scientist" ? ("assistant" as const) : ("user" as const),
          content: m.content,
        }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scientistId: id, messages: apiMessages }),
      });

      if (!response.ok || !response.body) {
        throw new Error(`API error: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          updated[updated.length - 1] = {
            ...last,
            content: last.content + chunk,
          };
          return updated;
        });
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          content: "申し訳ありません。エラーが発生しました。もう一度お試しください。",
        };
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const initial = scientist.nameEn[0].toUpperCase();

  return (
    <div className="flex flex-col h-dvh">
      {/* ヘッダー */}
      <header
        className="flex-shrink-0 flex items-center gap-4 px-6 py-4 border-b"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        <Link
          href="/characters"
          className="text-sm whitespace-nowrap transition-opacity opacity-50 hover:opacity-100"
          style={{ color: "var(--accent-gold)" }}
        >
          ← 偉人を選ぶ
        </Link>

        <div className="w-px h-8 opacity-20" style={{ background: "var(--border)" }} />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(201, 168, 76, 0.1)",
                color: "var(--accent-gold)",
                border: "1px solid rgba(201, 168, 76, 0.25)",
              }}
            >
              {scientist.field}
            </span>
            <h1 className="font-bold text-sm md:text-base truncate">
              {scientist.name}
            </h1>
          </div>
          <p
            className="text-xs italic opacity-55 truncate"
            style={{ color: "var(--accent-gold)" }}
          >
            「{scientist.catchphrase}」
          </p>
        </div>
      </header>

      {/* メッセージエリア */}
      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-5 max-w-3xl w-full mx-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            {/* 偉人アバター */}
            {msg.role === "scientist" && (
              <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  background: "rgba(201, 168, 76, 0.12)",
                  color: "var(--accent-gold)",
                  border: "1px solid rgba(201, 168, 76, 0.3)",
                }}
              >
                {initial}
              </div>
            )}

            {/* メッセージバブル */}
            <div
              className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "scientist" ? "rounded-tl-sm" : "rounded-tr-sm"
              }`}
              style={
                msg.role === "scientist"
                  ? {
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                    }
                  : {
                      background: "rgba(201, 168, 76, 0.1)",
                      border: "1px solid rgba(201, 168, 76, 0.2)",
                    }
              }
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* タイピングインジケーター */}
        {isLoading && (
          <div className="flex gap-3">
            <div
              className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style={{
                background: "rgba(201, 168, 76, 0.12)",
                color: "var(--accent-gold)",
                border: "1px solid rgba(201, 168, 76, 0.3)",
              }}
            >
              {initial}
            </div>
            <div
              className="rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              {[0, 150, 300].map((delay) => (
                <span
                  key={delay}
                  className="w-1.5 h-1.5 rounded-full animate-bounce"
                  style={{
                    background: "var(--accent-gold)",
                    opacity: 0.5,
                    animationDelay: `${delay}ms`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </main>

      {/* 下部：プリセット質問 + 入力フォーム */}
      <div
        className="flex-shrink-0 border-t px-4 pt-3 pb-safe-4 pb-4 space-y-3"
        style={{ borderColor: "var(--border)", background: "var(--background)" }}
      >
        {/* プリセット質問ボタン */}
        <div className="flex flex-wrap gap-2 max-w-3xl mx-auto">
          {PRESET_QUESTIONS.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              disabled={isLoading}
              className="text-xs px-3 py-1.5 rounded-full transition-all duration-200 opacity-55 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed"
              style={{
                border: "1px solid var(--border)",
                background: "var(--surface)",
                color: "var(--foreground)",
              }}
            >
              {q}
            </button>
          ))}
        </div>

        {/* テキスト入力 */}
        <form
          onSubmit={handleSubmit}
          className="flex gap-2 max-w-3xl mx-auto"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`${scientist.name}に質問する…`}
            disabled={isLoading}
            className="flex-1 rounded-full px-4 py-2.5 text-sm outline-none transition-colors disabled:opacity-50"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
            }}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-200 hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{
              background: "linear-gradient(135deg, #c9a84c, #f0d080)",
              color: "#0d0d1a",
            }}
          >
            →
          </button>
        </form>
      </div>
    </div>
  );
}
