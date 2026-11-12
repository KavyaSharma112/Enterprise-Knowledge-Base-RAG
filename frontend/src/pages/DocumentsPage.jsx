import { useEffect, useState } from "react";
import { listDocuments, uploadDocument } from "../services/api";

export default function DocumentsPage() {
  const [docs, setDocs] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const refresh = () => listDocuments().then(setDocs).catch((e) => setError(e.message));
  useEffect(() => { refresh(); const t = setInterval(refresh, 3000); return () => clearInterval(t); }, []);

  async function onPick(e) {
    const file = e.target.files[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true); setError("");
    try { await uploadDocument(file); await refresh(); } catch (err) { setError(err.message); } finally { setBusy(false); }
  }

  return (
    <div className="gaps">
      <label className="upload">{busy ? "Uploading…" : "Upload PDF"}<input type="file" accept=".pdf" onChange={onPick} disabled={busy} /></label>
      {error && <div className="note">{error}</div>}
      <table>
        <thead><tr><th>Document</th><th>Status</th><th>Chunks</th></tr></thead>
        <tbody>
          {docs.map((d) => (
            <tr key={d.id}>
              <td>{d.filename}</td>
              <td><span className={`pill ${d.status}`} title={d.error || ""}>{d.status}</span></td>
              <td>{d.chunk_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
