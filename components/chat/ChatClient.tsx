"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  Upload,
  Send,
  FileText,
  MessageSquare,
  Plus,
  Trash2,
  Loader2,
  AlertCircle,
  X,
  BookOpen,
  ChevronLeft,
} from "lucide-react";

type Doc = {
  id: string;
  filename: string;
  chunk_count: number;
  page_count: number;
  created_at: string;
};

type Convo = {
  id: string;
  document_id: string;
  title: string;
  filename: string;
  message_count: string;
  created_at: string;
  updated_at: string;
};

type Msg = {
  id?: string;
  role: "user" | "assistant";
  content: string;
};

type Usage = {
  allowed: boolean;
  messagesUsed: number;
  messagesLimit: number;
  tokensUsed: number;
  tokensLimit: number | null;
};

export function ChatClient() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [convos, setConvos] = useState<Convo[]>([]);
  const [activeDoc, setActiveDoc] = useState<Doc | null>(null);
  const [activeConvo, setActiveConvo] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [usage, setUsage] = useState<Usage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setAuthed(!!d?.user))
      .catch(() => setAuthed(false));
  }, []);

  const loadDocs = useCallback(async () => {
    const res = await fetch("/api/chat/documents", { credentials: "include" });
    if (res.ok) {
      const data = await res.json();
      setDocs(data.documents ?? []);
    }
  }, []);

  const loadConvos = useCallback(async () => {
    const res = await fetch("/api/chat/conversations", { credentials: "include" });
    if (res.ok) {
      const data = await res.json();
      setConvos(data.conversations ?? []);
    }
  }, []);

  useEffect(() => {
    if (authed) {
      loadDocs();
      loadConvos();
    }
  }, [authed, loadDocs, loadConvos]);

  const loadMessages = useCallback(async (convoId: string) => {
    const res = await fetch(`/api/chat/messages?conversationId=${convoId}`, {
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      setMessages(
        (data.messages ?? []).map((m: { id: string; role: string; content: string }) => ({
          id: m.id,
          role: m.role as "user" | "assistant",
          content: m.content,
        }))
      );
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);

    const form = new FormData();
    form.append("file", file);

    try {
      const res = await fetch("/api/chat/upload", {
        method: "POST",
        body: form,
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Upload failed");
        return;
      }
      await loadDocs();
      const newDoc: Doc = {
        id: data.documentId,
        filename: data.filename,
        chunk_count: data.chunkCount,
        page_count: data.pageCount,
        created_at: new Date().toISOString(),
      };
      setActiveDoc(newDoc);
      setActiveConvo(null);
      setMessages([]);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !activeDoc || sending) return;
    const userMsg = input.trim();
    setInput("");
    setSending(true);
    setError(null);

    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);

    try {
      const res = await fetch("/api/chat/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentId: activeDoc.id,
          conversationId: activeConvo,
          message: userMsg,
        }),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to get response");
        return;
      }
      setMessages((prev) => [...prev, { role: "assistant", content: data.message.content }]);
      if (data.conversationId && !activeConvo) {
        setActiveConvo(data.conversationId);
        loadConvos();
      }
      if (data.usage) setUsage(data.usage);
    } catch {
      setError("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const handleDeleteDoc = async (docId: string) => {
    try {
      await fetch(`/api/chat/documents?id=${docId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (activeDoc?.id === docId) {
        setActiveDoc(null);
        setActiveConvo(null);
        setMessages([]);
      }
      loadDocs();
      loadConvos();
    } catch {
      setError("Failed to delete document");
    }
  };

  const openConvo = (convo: Convo) => {
    const doc = docs.find((d) => d.id === convo.document_id);
    if (doc) setActiveDoc(doc);
    setActiveConvo(convo.id);
    loadMessages(convo.id);
    setSidebarOpen(false);
  };

  const startNewChat = (doc: Doc) => {
    setActiveDoc(doc);
    setActiveConvo(null);
    setMessages([]);
    setSidebarOpen(false);
  };

  if (authed === null) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
        <BookOpen className="h-16 w-16 text-slate-300 dark:text-slate-600" />
        <h1 className="mt-6 text-2xl font-bold text-slate-900 dark:text-slate-100">
          DocChat — AI PDF Q&A
        </h1>
        <p className="mt-3 max-w-md text-center text-slate-600 dark:text-slate-400">
          Upload study materials and ask questions about them. Perfect for exam preparation — UPSC, SSC, banking exams, and more.
        </p>
        <div className="mt-8 flex gap-3">
          <Link
            href="/login?redirect=/chat"
            className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
          >
            Login
          </Link>
          <Link
            href="/signup?redirect=/chat"
            className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 dark:border-neutral-600 dark:text-slate-100 dark:hover:bg-neutral-800"
          >
            Sign up free
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-14 left-0 z-40 w-72 border-r border-slate-200 bg-slate-50 transition-transform dark:border-neutral-800 dark:bg-neutral-950 md:relative md:inset-y-0 md:translate-x-0`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-neutral-800">
            <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">DocChat</h2>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800 disabled:opacity-50 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
            >
              {uploading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Upload className="h-3.5 w-3.5" />
              )}
              Upload PDF
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleUpload}
            />
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            {docs.length > 0 && (
              <div>
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Documents
                </h3>
                <ul className="space-y-1">
                  {docs.map((doc) => (
                    <li
                      key={doc.id}
                      className={`group flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm cursor-pointer transition ${
                        activeDoc?.id === doc.id
                          ? "bg-slate-200 text-slate-900 dark:bg-neutral-800 dark:text-slate-100"
                          : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-neutral-900"
                      }`}
                    >
                      <FileText className="h-4 w-4 shrink-0" />
                      <button
                        type="button"
                        className="flex-1 truncate text-left"
                        onClick={() => startNewChat(doc)}
                        title={doc.filename}
                      >
                        {doc.filename}
                      </button>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleDeleteDoc(doc.id); }}
                        className="hidden shrink-0 rounded p-0.5 text-slate-400 hover:bg-red-100 hover:text-red-600 group-hover:block dark:hover:bg-red-900/30"
                        title="Delete document"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {convos.length > 0 && (
              <div>
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Conversations
                </h3>
                <ul className="space-y-1">
                  {convos.map((c) => (
                    <li key={c.id}>
                      <button
                        type="button"
                        className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition ${
                          activeConvo === c.id
                            ? "bg-slate-200 text-slate-900 dark:bg-neutral-800 dark:text-slate-100"
                            : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-neutral-900"
                        }`}
                        onClick={() => openConvo(c)}
                      >
                        <MessageSquare className="h-4 w-4 shrink-0" />
                        <span className="flex-1 truncate">{c.title}</span>
                        <span className="shrink-0 text-xs text-slate-400">{c.message_count}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {docs.length === 0 && convos.length === 0 && (
              <div className="mt-8 text-center">
                <Upload className="mx-auto h-10 w-10 text-slate-300 dark:text-slate-600" />
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                  Upload a PDF to get started
                </p>
              </div>
            )}
          </div>

          {usage && (
            <div className="border-t border-slate-200 px-4 py-3 dark:border-neutral-800">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>
                  {usage.messagesUsed}/{usage.messagesLimit} messages today
                </span>
                {usage.tokensLimit !== null && (
                  <span>
                    {usage.tokensUsed}/{usage.tokensLimit} tokens
                  </span>
                )}
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-neutral-700">
                <div
                  className="h-full rounded-full bg-slate-900 transition-all dark:bg-slate-100"
                  style={{
                    width: `${Math.min(100, (usage.messagesUsed / usage.messagesLimit) * 100)}%`,
                  }}
                />
              </div>
              {!usage.allowed && (
                <Link
                  href="/pricing"
                  className="mt-2 block text-center text-xs font-medium text-slate-900 underline dark:text-slate-100"
                >
                  Upgrade to Pro for more
                </Link>
              )}
            </div>
          )}
        </div>
      </aside>

      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col">
        {/* Mobile sidebar toggle */}
        <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-2 dark:border-neutral-800 md:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen((o) => !o)}
            className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-neutral-800"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5 rotate-180" />}
          </button>
          <span className="truncate text-sm font-medium text-slate-700 dark:text-slate-300">
            {activeDoc ? activeDoc.filename : "DocChat"}
          </span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {!activeDoc ? (
            <div className="flex h-full flex-col items-center justify-center px-4">
              <BookOpen className="h-16 w-16 text-slate-200 dark:text-slate-700" />
              <h2 className="mt-6 text-xl font-bold text-slate-900 dark:text-slate-100">
                Welcome to DocChat
              </h2>
              <p className="mt-2 max-w-sm text-center text-sm text-slate-500 dark:text-slate-400">
                Upload a PDF from the sidebar and start asking questions. Ideal for studying textbooks, previous year papers, and reference material for competitive exams.
              </p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 disabled:opacity-50 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
              >
                {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                Upload your first PDF
              </button>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center px-4">
              <FileText className="h-12 w-12 text-slate-300 dark:text-slate-600" />
              <h3 className="mt-4 font-semibold text-slate-900 dark:text-slate-100">
                {activeDoc.filename}
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {activeDoc.page_count} pages &middot; {activeDoc.chunk_count} chunks indexed
              </p>
              <p className="mt-4 max-w-sm text-center text-sm text-slate-500 dark:text-slate-400">
                Ask anything about this document. Try &quot;Summarize the key points&quot; or &quot;What are the important topics for revision?&quot;
              </p>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl px-4 py-6 space-y-6">
              {messages.map((msg, i) => (
                <div
                  key={msg.id ?? i}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">
                      <BookOpen className="h-4 w-4" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                        : "bg-slate-100 text-slate-800 dark:bg-neutral-800 dark:text-slate-200"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              {sending && (
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div className="rounded-2xl bg-slate-100 px-4 py-3 dark:bg-neutral-800">
                    <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="mx-4 mb-2 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span className="flex-1">{error}</span>
            <button type="button" onClick={() => setError(null)}>
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Input */}
        {activeDoc && (
          <div className="border-t border-slate-200 bg-white px-4 py-3 dark:border-neutral-800 dark:bg-black">
            <div className="mx-auto flex max-w-3xl items-end gap-2">
              <button
                type="button"
                onClick={() => startNewChat(activeDoc)}
                className="mb-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-neutral-700 dark:text-slate-400 dark:hover:bg-neutral-900"
                title="New chat with this document"
              >
                <Plus className="h-5 w-5" />
              </button>
              <div className="relative flex-1">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask a question about your document..."
                  rows={1}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 pr-12 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-0 dark:border-neutral-700 dark:bg-neutral-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-neutral-600"
                  disabled={sending || (usage !== null && !usage.allowed)}
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!input.trim() || sending || (usage !== null && !usage.allowed)}
                  className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white transition hover:bg-slate-800 disabled:opacity-30 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="mt-1.5 text-center text-[11px] text-slate-400 dark:text-slate-500">
              DocChat uses AI to answer questions from your document. Answers may not always be perfect.
            </p>
          </div>
        )}
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
