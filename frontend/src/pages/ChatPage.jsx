import { useEffect, useRef, useState } from "react";
import Sources from "../components/Sources";
import { askQuestion } from "../services/api";

const EXAMPLES = ["How do I request leave?", "What is the CEO's salary?"];

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);
  useEffect(() => {
  endRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages, loading]);

  async function send(text) {
    const question = text.trim();
    if (!question || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: question }]);
    setLoading(true);
    try {
      const d = await askQuestion(question);
      setMessages((m) => [...m, { role: "bot", text: d.answer, sources: d.sources || [], answered: d.answered }]);
    } catch (e) {
      setMessages((m) => [...m, { role: "bot", text: e.message, sources: [], error: true }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="chat">
      <div className="thread">
        {messages.length === 0 && (
          <div className="empty">
            <p>Ask a question about your company documents.</p>
            <div className="chips">{EXAMPLES.map((q) => <button key={q} onClick={() => send(q)}>{q}</button>)}</div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.role}`}>
            {m.role === "bot" && !m.error && (
              <span className={`badge ${m.answered ? "ok" : "refused"}`}>{m.answered ? "Answered" : "Not answerable"}</span>
            )}
            <p className={m.error ? "err" : ""}>{m.text}</p>
            {m.role === "bot" && <Sources sources={m.sources} />}
          </div>
        ))}
        {loading && <div className="msg bot"><p className="muted">Searching documents…</p></div>}
        <div ref={endRef} />
      </div>
      <form onSubmit={(e) => { e.preventDefault(); send(input); }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask a question…" />
        <button disabled={loading || !input.trim()}>Send</button>
      </form>
    </div>
  );
}
