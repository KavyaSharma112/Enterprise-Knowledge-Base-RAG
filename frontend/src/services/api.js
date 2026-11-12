// Set VITE_USE_MOCK=false in frontend/.env to talk to the real backend.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function request(path, options) {
  const res = await fetch(`${API_URL}${path}`, options);
  if (!res.ok) {
    const detail = await res.json().then((j) => j.detail).catch(() => null);
    throw new Error(detail || `Server error (${res.status})`);
  }
  return res.json();
}

const MOCK_SOURCES = [
  { document: "hr_policy.pdf", source: "x", page_no: 4, section_title: "Leave Policy", reranker_score: 0.91,
    chunk_text: "Employees may request leave through the HR portal at least five working days in advance. Manager approval is required." },
  { document: "hr_policy.pdf", source: "y", page_no: 5, section_title: "Leave Policy", reranker_score: 0.74,
    chunk_text: "Unplanned sick leave must be reported to the reporting manager before 10:00 AM on the day of absence." },
];
let mockDocs = [{ id: "1", filename: "hr_policy.pdf", status: "ready", chunk_count: 42 }];

export async function askQuestion(question) {
  if (!USE_MOCK) {
    return request("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question }) });
  }
  await wait(900);
  if (/salary|lunch|ceo/i.test(question)) return { answer: "I don't know based on the provided documents.", answered: false, sources: [] };
  return {
    answer: "Leave requests are submitted through the HR portal at least five working days in advance and need manager approval. For unplanned sick leave, inform your manager before 10:00 AM that day.",
    answered: true, sources: MOCK_SOURCES,
  };
}

export async function listDocuments() {
  return USE_MOCK ? mockDocs : request("/api/documents");
}

export async function uploadDocument(file) {
  if (USE_MOCK) {
    await wait(500);
    const doc = { id: String(Date.now()), filename: file.name, status: "ready", chunk_count: 10 };
    mockDocs = [doc, ...mockDocs];
    return doc;
  }
  const form = new FormData();
  form.append("file", file);
  return request("/api/documents", { method: "POST", body: form });
}

// Sample data only: gap clustering is not built yet.
export const GAPS = [
  { topic: "Reimbursement and expense claims", count: 18, confidence: 0.21, examples: ["How do I claim travel expenses?", "Is there a per-diem limit?"] },
  { topic: "Work-from-home eligibility", count: 11, confidence: 0.34, examples: ["Can I work remotely on Fridays?"] },
  { topic: "Onboarding checklist", count: 7, confidence: 0.48, examples: ["What do I do in my first week?"] },
];
