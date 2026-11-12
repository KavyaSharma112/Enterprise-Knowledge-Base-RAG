import { GAPS } from "../services/api";

export default function GapReportPage() {
  return (
    <div className="gaps">
      <div className="note">Sample data. Gap clustering is not implemented in the backend yet.</div>
      <table>
        <thead><tr><th>Topic</th><th>Unanswered</th><th>Avg confidence</th><th>Example questions</th></tr></thead>
        <tbody>
          {GAPS.map((g) => (
            <tr key={g.topic}>
              <td>{g.topic}</td>
              <td>{g.count}</td>
              <td><div className="bar"><i style={{ width: `${g.confidence * 100}%` }} /></div>{g.confidence.toFixed(2)}</td>
              <td>{g.examples.join(" · ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
