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
  FileText,
  Check,
  Upload,
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
  /** Filename shown in the user bubble when that turn used the thread document (ChatGPT-style). */
  attachmentFilename?: string | null;
};

type Usage = {
  allowed: boolean;
  messagesUsed: number;
  /** null = unlimited chat. */
  messagesLimit: number | null;
  tokensUsed: number;
  tokensLimit: number | null;
  /** Total indexed documents in DocChat (lifetime cap for free tier). */
  documentsUploaded: number;
  /** null = unlimited (Pro). */
  documentsLimit: number | null;
  isPremium: boolean;
};

type AttachmentChip = {
  name: string;
  status: "uploading" | "ready";
};

export function ChatClient() {
  const [convos, setConvos] = useState<Convo[]>([]);
  const [activeDoc, setActiveDoc] = useState<ActiveDoc | null>(null);
  const [activeConvo, setActiveConvo] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [attachmentChip, setAttachmentChip] = useState<AttachmentChip | null>(null);
  const [usage, setUsage] = useState<Usage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const messagesScrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const forceScrollToBottomRef = useRef(true);
  /** Resolves when the current upload (embeddings stored) finishes; ask() must await this first. */
  const uploadInFlightRef = useRef<Promise<void> | null>(null);
  const uploadAbortRef = useRef<AbortController | null>(null);
  /** Document uploaded before any conversation exists — delete from DB if user leaves without sending. */
  const orphanDocumentIdRef = useRef<string | null>(null);

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

  const loadUsage = useCallback(async () => {
    const res = await fetch("/api/chat/usage", { credentials: "include" });
    if (res.ok) {
      const data = await res.json();
      setUsage(data as Usage);
    }
  }, []);

  useEffect(() => {
    if (authed) {
      loadConvos();
      loadUsage();
    }
  }, [authed, loadConvos, loadUsage]);

  const loadMessages = useCallback(async (convoId: string) => {
    const res = await fetch(`/api/chat/messages?conversationId=${convoId}`, {
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      forceScrollToBottomRef.current = true;
      setMessages(
        (data.messages ?? []).map(
          (m: {
            id: string;
            role: string;
            content: string;
            attachment_filename?: string | null;
          }) => ({
            id: m.id,
            role: m.role as "user" | "assistant",
            content: m.content,
            attachmentFilename: m.attachment_filename ?? null,
          })
        )
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

  const abortUpload = useCallback(() => {
    uploadAbortRef.current?.abort();
    uploadAbortRef.current = null;
    uploadInFlightRef.current = null;
    setUploading(false);
    setAttachmentChip(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  /** Remove orphan draft document from DB (new chat, no messages sent). */
  const discardOrphanDocument = useCallback(async () => {
    const id = orphanDocumentIdRef.current;
    if (!id) return;
    orphanDocumentIdRef.current = null;
    try {
      await fetch(`/api/chat/documents?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        credentials: "include",
      });
    } catch {
      /* ignore */
    }
  }, []);

  const startUpload = useCallback(
    (file: File) => {
      uploadAbortRef.current?.abort();
      const ac = new AbortController();
      uploadAbortRef.current = ac;

      setAttachmentChip({ name: file.name, status: "uploading" });
      setUploading(true);
      setError(null);

      const p = (async () => {
        const form = new FormData();
        form.append("file", file);
        if (activeConvo) {
          form.append("conversationId", activeConvo);
        }

        const res = await fetch("/api/chat/upload", {
          method: "POST",
          body: form,
          credentials: "include",
          signal: ac.signal,
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error ?? "Upload failed");
        }
        setActiveDoc({
          id: data.documentId,
          filename: data.filename,
          page_count: data.pageCount,
          chunk_count: data.chunkCount,
        });
        setAttachmentChip({ name: file.name, status: "ready" });
        if (!activeConvo) {
          orphanDocumentIdRef.current = data.documentId as string;
        } else {
          orphanDocumentIdRef.current = null;
        }
        await loadConvos();
        await loadUsage();
      })();

      uploadInFlightRef.current = p;

      p.catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        if (err instanceof Error && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Upload failed");
        setAttachmentChip(null);
        setActiveDoc(null);
        orphanDocumentIdRef.current = null;
      }).finally(() => {
        setUploading(false);
        uploadInFlightRef.current = null;
        uploadAbortRef.current = null;
        if (fileInputRef.current) fileInputRef.current.value = "";
      });
    },
    [activeConvo, loadConvos, loadUsage]
  );

  /** Remove attachment after indexing (or cancel in-flight upload). */
  const removeAttachment = useCallback(async () => {
    if (attachmentChip?.status === "uploading") {
      abortUpload();
      return;
    }
    if (!activeDoc) return;
    const id = activeDoc.id;
    try {
      const res = await fetch(`/api/chat/documents?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Failed to remove file");
      }
      orphanDocumentIdRef.current = null;
      setActiveDoc(null);
      setAttachmentChip(null);
      await loadConvos();
      await loadUsage();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to remove file");
    }
  }, [activeDoc, attachmentChip?.status, abortUpload, loadConvos, loadUsage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    startUpload(file);
  };

  const handleSend = async () => {
    const userMsg = input.trim();
    const hasDoc = !!activeDoc?.id;
    if ((!userMsg && !hasDoc) || sending) return;

    // LLM runs only after embeddings exist: wait for any in-flight upload to finish first.
    const uploadWait = uploadInFlightRef.current;
    if (uploadWait) {
      try {
        await uploadWait;
      } catch {
        return;
      }
    }

    const isFirstInThread = messages.length === 0;
    const attachmentFilenameForTurn =
      hasDoc && (isFirstInThread || userMsg.length === 0)
        ? activeDoc!.filename
        : undefined;

    setInput("");
    setSending(true);
    setError(null);
    forceScrollToBottomRef.current = true;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMsg,
        attachmentFilename: attachmentFilenameForTurn ?? null,
      },
    ]);

    try {
      const payload: {
        conversationId: string | null;
        message: string;
        documentId?: string;
      } = {
        conversationId: activeConvo,
        message: userMsg,
      };
      if (!activeConvo && activeDoc?.id) {
        payload.documentId = activeDoc.id;
      }

      const res = await fetch("/api/chat/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to get response");
        setMessages((prev) => prev.slice(0, -1));
        setInput(userMsg);
        return;
      }
      orphanDocumentIdRef.current = null;
      setAttachmentChip(null);
      setMessages((prev) => [...prev, { role: "assistant", content: data.message.content }]);
      if (data.conversationId && !activeConvo) {
        setActiveConvo(data.conversationId);
        loadConvos();
      }
      await loadUsage();
    } catch {
      setError("Failed to send message. Please try again.");
      setMessages((prev) => prev.slice(0, -1));
      setInput(userMsg);
    } finally {
      setSending(false);
    }
  };

  const openConvo = async (convo: Convo) => {
    await discardOrphanDocument();
    abortUpload();
    if (convo.document_id) {
      setActiveDoc({
        id: convo.document_id,
        filename: convo.filename,
      });
    } else {
      setActiveDoc(null);
    }
    setAttachmentChip(null);
    setActiveConvo(convo.id);
    loadMessages(convo.id);
    setSidebarOpen(false);
  };

  const startGeneralChat = async () => {
    await discardOrphanDocument();
    abortUpload();
    forceScrollToBottomRef.current = true;
    setActiveDoc(null);
    setActiveConvo(null);
    setAttachmentChip(null);
    setMessages([]);
    setSidebarOpen(false);
  };

  /** Tab close / leave site: drop unlinked draft upload only. */
  useEffect(() => {
    const flushOrphan = () => {
      const id = orphanDocumentIdRef.current;
      if (!id) return;
      orphanDocumentIdRef.current = null;
      fetch(`/api/chat/documents?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        credentials: "include",
        keepalive: true,
      }).catch(() => {});
    };
    window.addEventListener("pagehide", flushOrphan);
    return () => {
      window.removeEventListener("pagehide", flushOrphan);
      flushOrphan();
    };
  }, []);

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

  const docUploadBlocked =
    usage !== null &&
    !usage.isPremium &&
    usage.documentsLimit !== null &&
    usage.documentsUploaded >= usage.documentsLimit;

  /** Viewport minus header — constrains flex row so inner panes scroll independently */
  const shellH = "h-[calc(100dvh-3.5rem)] max-h-[calc(100dvh-3.5rem)]";

  return (
    <div
      className={`flex w-full flex-1 flex-row items-stretch gap-3 overflow-hidden bg-[#ececf1] p-2 sm:gap-4 sm:p-4 dark:bg-neutral-950 ${shellH} min-h-0`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Left: chats — own scroll; fixed width; does not shrink with messages */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed left-2 top-14 z-40 flex h-[calc(100dvh-3.5rem)] max-h-[calc(100dvh-3.5rem)] w-[min(100vw-1rem,18rem)] shrink-0 flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-[#f4f4f5] shadow-md transition-transform dark:border-neutral-700 dark:bg-neutral-900 md:static md:h-full md:max-h-full md:translate-x-0 min-h-0`}
      >
        {/*
          min-h-0 on aside: flex items default to min-height:auto and won't shrink below content.
          Grid + minmax(0,1fr): middle row takes remaining height and scrolls; usage stays visible.
        */}
        <div className="grid h-full min-h-0 min-w-0 grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden">
          <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-slate-200 px-4 py-3 dark:border-neutral-800">
            <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">DocChat</h2>
            <button
              type="button"
              onClick={startGeneralChat}
              className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-neutral-600 dark:text-slate-300 dark:hover:bg-neutral-800"
            >
              New chat
            </button>
          </div>

          <div
            className="min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain p-3 [scrollbar-gutter:stable]"
            style={{ WebkitOverflowScrolling: "touch" }}
            aria-label="Chat history"
          >
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
            <div className="shrink-0 space-y-3 border-t border-slate-200 px-3 py-3 dark:border-neutral-800">
              <div>
                <div className="flex items-center justify-between gap-2 text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="h-3.5 w-3.5" aria-hidden />
                    Chat messages
                  </span>
                  <span className="text-[11px] font-semibold normal-case tracking-normal text-emerald-600 dark:text-emerald-400">
                    Unlimited
                  </span>
                </div>
                {usage.messagesUsed > 0 && (
                  <p className="mt-1 text-[10px] text-slate-400 dark:text-slate-500">
                    {usage.messagesUsed.toLocaleString()} sent today
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between gap-2 text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Upload className="h-3.5 w-3.5" aria-hidden />
                    File uploads
                  </span>
                  {usage.isPremium || usage.documentsLimit === null ? (
                    <span className="text-[11px] font-semibold normal-case tracking-normal text-emerald-600 dark:text-emerald-400">
                      Unlimited
                    </span>
                  ) : (
                    <span className="tabular-nums text-slate-700 dark:text-slate-300">
                      {Math.max(0, usage.documentsLimit - usage.documentsUploaded)} left
                    </span>
                  )}
                </div>
                {usage.isPremium || usage.documentsLimit === null ? (
                  <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-500">
                    Pro — Unlimited file uploads
                  </p>
                ) : (
                  <>
                    <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-500">
                      {usage.documentsUploaded} of {usage.documentsLimit} indexed files (lifetime on free)
                    </p>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-neutral-700">
                      <div
                        className="h-full rounded-full bg-slate-600 transition-all dark:bg-slate-400"
                        style={{
                          width: `${Math.min(
                            100,
                            (usage.documentsUploaded / usage.documentsLimit) * 100
                          )}%`,
                        }}
                      />
                    </div>
                  </>
                )}
              </div>

              {docUploadBlocked && (
                <Link
                  href="/pricing"
                  className="block rounded-lg bg-slate-900 px-2 py-1.5 text-center text-[11px] font-semibold text-white shadow-sm hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                >
                  Upgrade for unlimited file uploads
                </Link>
              )}
            </div>
          )}
        </div>
      </aside>

      {/* Right: chat — column fills remaining width; messages scroll inside */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <section
          className="flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-md dark:border-neutral-700 dark:bg-neutral-950"
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
            className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-y-contain"
            style={{ WebkitOverflowScrolling: "touch" }}
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
                  Ask anything—or send a message first, then use{" "}
                  <span className="font-medium text-slate-700 dark:text-slate-300">+</span> to attach a file. Your
                  message is sent after the file is indexed.
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
                      {msg.role === "user" && msg.attachmentFilename && (
                        <div className="mb-2 flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-2.5 py-1.5 text-xs font-medium dark:border-slate-900/20 dark:bg-slate-900/10">
                          <FileText className="h-3.5 w-3.5 shrink-0 opacity-90" />
                          <span className="min-w-0 truncate">{msg.attachmentFilename}</span>
                        </div>
                      )}
                      {msg.content ? (
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      ) : msg.role === "user" && msg.attachmentFilename ? (
                        <p className="text-xs italic opacity-80">No message — summarizing your file</p>
                      ) : null}
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

          {/* Composer + attachment strip */}
          <div className="shrink-0 border-t border-slate-200/90 bg-white px-3 pb-3 pt-3 dark:border-neutral-800 dark:bg-neutral-950 sm:px-4 sm:pb-4">
            <div className="mx-auto w-full max-w-3xl space-y-2">
              {attachmentChip && (
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900">
                  <FileText className="h-4 w-4 shrink-0 text-slate-500 dark:text-slate-400" />
                  <span className="min-w-0 flex-1 truncate text-sm font-medium text-slate-800 dark:text-slate-200">
                    {attachmentChip.name}
                  </span>
                  {attachmentChip.status === "uploading" && (
                    <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Indexing…
                    </span>
                  )}
                  {attachmentChip.status === "ready" && (
                    <span className="flex items-center gap-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                      <Check className="h-3.5 w-3.5" />
                      Ready
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      attachmentChip.status === "uploading" ? abortUpload() : removeAttachment()
                    }
                    className="shrink-0 rounded-md p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-neutral-800 dark:hover:text-slate-200"
                    title={attachmentChip.status === "uploading" ? "Cancel upload" : "Remove attachment"}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              <div className="flex items-end gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading || docUploadBlocked}
                  className="mb-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-neutral-700 dark:bg-neutral-900 dark:text-slate-400 dark:hover:bg-neutral-800"
                  title={
                    docUploadBlocked
                      ? "Free plan file limit reached — upgrade for unlimited uploads"
                      : "Attach PDF or Word (you can attach before or after your first message)"
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
                        ? "Ask about your file, or send empty for a summary…"
                        : "Message DocChat — exam prep, study tips, or anything else…"
                    }
                    rows={1}
                    className="max-h-40 min-h-[36px] min-w-0 flex-1 resize-none bg-transparent px-1 py-2 text-[15px] leading-relaxed text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0 dark:text-slate-100 dark:placeholder:text-slate-500"
                    disabled={sending}
                  />
                  <button
                    type="button"
                    onClick={handleSend}
                    disabled={
                      (!input.trim() && !activeDoc?.id) ||
                      sending ||
                      uploading ||
                      attachmentChip?.status === "uploading"
                    }
                    className="mb-1 mr-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white transition hover:bg-slate-800 disabled:opacity-30 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            <p className="mt-2 text-center text-[11px] text-slate-400 dark:text-slate-500">
              {attachmentChip?.status === "uploading"
                ? "Wait until indexing finishes before sending."
                : activeDoc
                  ? "Replies use your file when indexed. AI can make mistakes."
                  : "Attach a file anytime; send is enabled after indexing completes."}
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
