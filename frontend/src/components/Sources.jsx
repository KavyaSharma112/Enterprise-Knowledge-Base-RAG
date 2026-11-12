export default function Sources({ sources }) {
  if (!sources.length) return null;
  return (
    <div className="sources">
      <div className="label">Sources</div>
      {sources.map((s, i) => (
        <details key={i}>
          <summary>
            <span className="num">{i + 1}</span>
            {s.document} · {s.section_title || "Untitled"} · p.{s.page_no}
            {s.reranker_score != null && <span className="score">{s.reranker_score.toFixed(2)}</span>}
          </summary>
          <p>{s.chunk_text}</p>
        </details>
      ))}
    </div>
  );
}
