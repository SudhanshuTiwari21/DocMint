"use client";

import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
} from "react";
import Link from "next/link";
import {
  Send,
  MessageSquare,
  Plus,
  Loader2,
  AlertCircle,
  X,
  BookOpen,
  ChevronLeft,
} from "lucide-react";

type ActiveDoc = {
  id: string;
  filename: string;
  page_count?: number;
  chunk_count?: number;
};

type Convo = {
  id: string;
  document_id: string | null;
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
  const [convos, setConvos] = useState<Convo[]>([]);
  const [activeDoc, setActiveDoc] = useState<ActiveDoc | null>(null);
  const [activeConvo, setActiveConvo] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [usage, setUsage] = useState<Usage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const messagesScrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const forceScrollToBottomRef = useRef(true);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setAuthed(!!d?.user))
      .catch(() => setAuthed(false));
  }, []);

  const loadConvos = useCallback(async () => {
    const res = await fetch("/api/chat/conversations", { credentials: "include" });
    if (res.ok) {
      const data = await res.json();
      setConvos(data.conversations ?? []);
    }
  }, []);

  useEffect(() => {
    if (authed) loadConvos();
  }, [authed, loadConvos]);

  const loadMessages = useCallback(async (convoId: string) => {
    const res = await fetch(`/api/chat/messages?conversationId=${convoId}`, {
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      forceScrollToBottomRef.current = true;
      setMessages(
        (data.messages ?? []).map((m: { id: string; role: string; content: string }) => ({
          id: m.id,
          role: m.role as "user" | "assistant",
          content: m.content,
        }))
      );
    }
  }, []);

  useLayoutEffect(() => {
    const el = messagesScrollRef.current;
    if (!el) return;
    if (messages.length === 0 && !sending) return;

    const scrollToEnd = () => {
      el.scrollTo({ top: el.scrollHeight, behavior: "auto" });
    };

    if (forceScrollToBottomRef.current) {
      forceScrollToBottomRef.current = false;
      scrollToEnd();
      requestAnimationFrame(scrollToEnd);
      return;
    }

    const gap = el.scrollHeight - el.scrollTop - el.clientHeight;
    const nearBottom = gap < 100;
    if (nearBottom) {
      scrollToEnd();
      requestAnimationFrame(scrollToEnd);
    }
  }, [messages, sending]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!activeConvo) {
      setError("Send a message first to start the chat, then you can attach a file.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setUploading(true);
    setError(null);

    const form = new FormData();
    form.append("file", file);
    form.append("conversationId", activeConvo);

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
      setActiveDoc({
        id: data.documentId,
        filename: data.filename,
        page_count: data.pageCount,
        chunk_count: data.chunkCount,
      });
      await loadConvos();
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSend = async () => {
    if (!input.trim() || sending) return;
    if (usage !== null && !usage.allowed) return;
    const userMsg = input.trim();
    setInput("");
    setSending(true);
    setError(null);
    forceScrollToBottomRef.current = true;

    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);

    try {
      const res = await fetch("/api/chat/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
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

  const openConvo = (convo: Convo) => {
    if (convo.document_id) {
      setActiveDoc({
        id: convo.document_id,
        filename: convo.filename,
      });
    } else {
      setActiveDoc(null);
    }
    setActiveConvo(convo.id);
    loadMessages(convo.id);
    setSidebarOpen(false);
  };

  const startGeneralChat = () => {
    forceScrollToBottomRef.current = true;
    setActiveDoc(null);
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
          DocChat
        </h1>
        <p className="mt-3 max-w-md text-center text-slate-600 dark:text-slate-400">
          General chat or upload PDFs and Word (.docx) in any thread—after you send your first message.
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

  const chatTitle =
    activeDoc?.filename ??
    (activeConvo ? "Chat" : "DocChat");

  return (
    <div className="flex h-full min-h-[calc(100dvh-3.5rem)] flex-1 flex-row gap-2 overflow-hidden bg-[#ececf1] p-2 sm:gap-3 sm:p-3 md:gap-4 md:p-4 dark:bg-neutral-950">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="hidden"
        onChange={handleUpload}
      />

      {/* Left: chats list */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-14 left-2 z-40 flex w-[min(100vw-1rem,18rem)] shrink-0 flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-[#f4f4f5] shadow-md transition-transform dark:border-neutral-700 dark:bg-neutral-900 md:static md:inset-auto md:h-full md:w-72 md:max-w-none md:translate-x-0`}
      >
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 px-4 py-3 dark:border-neutral-800">
            <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">DocChat</h2>
            <button
              type="button"
              onClick={startGeneralChat}
              className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-neutral-600 dark:text-slate-300 dark:hover:bg-neutral-800"
            >
              New chat
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            {convos.length > 0 ? (
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
            ) : (
              <div className="mt-8 text-center">
                <MessageSquare className="mx-auto h-10 w-10 text-slate-300 dark:text-slate-600" />
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                  No chats yet. Say hello in the main panel to start.
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

      {/* Right: chat box */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <section
          className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-md dark:border-neutral-700 dark:bg-neutral-950"
          aria-label="Chat"
        >
          <div className="flex shrink-0 items-center gap-2 border-b border-slate-200 px-3 py-2.5 dark:border-neutral-800 md:px-4 md:py-3">
            <button
              type="button"
              onClick={() => setSidebarOpen((o) => !o)}
              className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-neutral-800 md:hidden"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5 rotate-180" />}
            </button>
            <span className="truncate text-sm font-semibold text-slate-800 dark:text-slate-200">
              {chatTitle}
            </span>
          </div>

          <div
            ref={messagesScrollRef}
            className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden overscroll-contain"
            onScroll={() => {
              const el = messagesScrollRef.current;
              if (!el) return;
              const gap = el.scrollHeight - el.scrollTop - el.clientHeight;
              if (gap > 120) {
                forceScrollToBottomRef.current = false;
              }
            }}
          >
            {messages.length === 0 ? (
              <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-4 py-10 text-center">
                <BookOpen className="h-16 w-16 shrink-0 text-slate-200 dark:text-slate-700" />
                <h2 className="mt-6 text-xl font-bold text-slate-900 dark:text-slate-100">
                  Welcome to DocChat
                </h2>
                <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
                  Ask anything—or send a message first, then use the{" "}
                  <span className="font-medium text-slate-700 dark:text-slate-300">+</span> button to attach a PDF or
                  Word file to this chat.
                </p>
              </div>
            ) : (
              <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 pb-10">
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
              </div>
            )}
          </div>

          {error && (
            <div className="mx-3 mb-0 flex shrink-0 items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300 sm:mx-4">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span className="flex-1">{error}</span>
              <button type="button" onClick={() => setError(null)}>
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          <div className="shrink-0 border-t border-slate-200/90 bg-white px-3 pb-3 pt-3 dark:border-neutral-800 dark:bg-neutral-950 sm:px-4 sm:pb-4">
            <div className="mx-auto flex w-full max-w-3xl items-end gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading || !activeConvo}
                className="mb-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-neutral-700 dark:bg-neutral-900 dark:text-slate-400 dark:hover:bg-neutral-800"
                title={
                  activeConvo
                    ? "Attach PDF or Word to this chat"
                    : "Send a message first, then attach a file"
                }
              >
                {uploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Plus className="h-5 w-5" />}
              </button>
              <div className="relative flex min-h-[52px] min-w-0 flex-1 flex-row items-end gap-1 rounded-[26px] border border-slate-200/90 bg-white px-3 py-2 shadow-[0_0_0_1px_rgba(0,0,0,0.04)] dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-none">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder={
                    activeDoc
                      ? "Ask about your uploaded file, or anything else…"
                      : "Message DocChat — exam prep, study tips, or anything else…"
                  }
                  rows={1}
                  className="max-h-40 min-h-[36px] min-w-0 flex-1 resize-none bg-transparent px-1 py-2 text-[15px] leading-relaxed text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0 dark:text-slate-100 dark:placeholder:text-slate-500"
                  disabled={sending || (usage !== null && !usage.allowed)}
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!input.trim() || sending || (usage !== null && !usage.allowed)}
                  className="mb-1 mr-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white transition hover:bg-slate-800 disabled:opacity-30 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="mt-2 text-center text-[11px] text-slate-400 dark:text-slate-500">
              {activeDoc
                ? "Replies can use your uploaded file. AI can make mistakes."
                : "General chat — after your first message, use + to add a file."}
            </p>
          </div>
        </section>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
