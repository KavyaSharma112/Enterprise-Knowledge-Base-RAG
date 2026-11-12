import { useState } from "react";
import ChatPage from "./pages/ChatPage";
import DocumentsPage from "./pages/DocumentsPage";
import GapReportPage from "./pages/GapReportPage";
import { USE_MOCK } from "./services/api";

const TABS = { chat: ["Chat", ChatPage], docs: ["Documents", DocumentsPage], gaps: ["Gap report", GapReportPage] };

export default function App() {
  const [tab, setTab] = useState("chat");
  const Page = TABS[tab][1];
  return (
    <div className="app">
      <header>
        <h1>DocuMind</h1>
        <nav>
          {Object.entries(TABS).map(([key, [label]]) => (
            <button key={key} className={tab === key ? "on" : ""} onClick={() => setTab(key)}>{label}</button>
          ))}
        </nav>
        {USE_MOCK && <span className="mock">Demo data</span>}
      </header>
      <main><Page /></main>
    </div>
  );
}
