// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Input, Label, Avatar, Empty } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Plus, Check, Clock, Trash, Edit, AlertCircle } = Icons;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const stamp = (d) =>
  `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}, ${String(d.getHours()).padStart(2, "0")}:${String(
    d.getMinutes()
  ).padStart(2, "0")}`;

const clock = (d) => `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;

const hexToRgba = (hex, a) => {
  const h = String(hex || "#111111").replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
};

const ACCOUNT = { name: "Maya Okonkwo", email: "maya.okonkwo@fieldnote.co" };

const SESSION = { signedInAt: "9 Oct 2026, 07:41", expires: "8 Nov 2026, 07:41" };

const SEED_TASKS = [
  {
    id: "t-1194",
    wf: "i-3-0-0",
    title: "Book the dentist",
    completed: false,
    created_at: "2026-11-06T09:12",
    created_label: "6 Nov 2026, 09:12",
  },
  {
    id: "t-1188",
    wf: "i-3-0-1",
    title: "Email the landlord about the boiler",
    completed: false,
    created_at: "2026-11-05T18:40",
    created_label: "5 Nov 2026, 18:40",
  },
  {
    id: "t-1181",
    wf: "i-3-0-2",
    title: "Buy milk and coffee",
    completed: true,
    created_at: "2026-11-05T08:03",
    created_label: "5 Nov 2026, 08:03",
  },
  {
    id: "t-1166",
    wf: "i-3-0-3",
    title: "Renew library books",
    completed: true,
    created_at: "2026-11-03T20:55",
    created_label: "3 Nov 2026, 20:55",
  },
];

export default function Screen() {
  const ink = brand.primaryColor;
  const accent = brand.accentColor;
  const muted = brand.neutralColor;
  const bg = brand.backgroundColor;
  const hairline = hexToRgba(ink, 0.15);
  const radius = brand.radius || "2px";

  const [phase, setPhase] = React.useState("loading"); // loading | ready
  const [syncedAt, setSyncedAt] = React.useState(null);
  const [tasks, setTasks] = React.useState(SEED_TASKS);
  const [title, setTitle] = React.useState("");
  const [formState, setFormState] = React.useState({ kind: "idle" });
  const [adding, setAdding] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [draft, setDraft] = React.useState("");
  const [editError, setEditError] = React.useState("");
  const [confirmId, setConfirmId] = React.useState(null);
  const [busyId, setBusyId] = React.useState(null);
  const [announcement, setAnnouncement] = React.useState("");

  const timers = React.useRef([]);
  const inputRef = React.useRef(null);
  const confirmBtnRef = React.useRef(null);
  const returnFocusRef = React.useRef(null);

  const later = React.useCallback((fn, ms) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  }, []);

  React.useEffect(() => {
    const id = setTimeout(() => {
      setPhase("ready");
      setSyncedAt(clock(new Date()));
    }, 650);
    timers.current.push(id);
    return () => timers.current.forEach(clearTimeout);
  }, []);

  React.useEffect(() => {
    if (!confirmId) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") closeConfirm();
    };
    document.addEventListener("keydown", onKey);
    const id = setTimeout(() => confirmBtnRef.current && confirmBtnRef.current.focus(), 20);
    timers.current.push(id);
    return () => document.removeEventListener("keydown", onKey);
  }, [confirmId]);

  const openTasks = tasks.filter((t) => !t.completed).length;
  const doneTasks = tasks.length - openTasks;
  const trimmed = title.trim();
  const overBy = trimmed.length - 255;

  function closeConfirm() {
    setConfirmId(null);
    const el = returnFocusRef.current;
    if (el && el.focus) later(() => el.focus(), 10);
  }

  function handleAdd(e) {
    e.preventDefault();
    if (adding) return;
    if (!trimmed) {
      setFormState({ kind: "required" });
      if (inputRef.current) inputRef.current.focus();
      return;
    }
    if (trimmed.length > 255) {
      // Client limit is deliberately not enforced by maxLength: the server rejects it and the text is kept.
      setFormState({ kind: "rejected", length: trimmed.length });
      if (inputRef.current) inputRef.current.focus();
      return;
    }
    setFormState({ kind: "idle" });
    setAdding(true);
    later(() => {
      const now = new Date();
      const task = {
        id: "t-" + Math.floor(1200 + Math.random() * 800),
        wf: null,
        title: trimmed,
        completed: false,
        created_at: now.toISOString(),
        created_label: stamp(now),
        fresh: true,
      };
      setTasks((prev) => [task, ...prev]);
      setTitle("");
      setAdding(false);
      setSyncedAt(clock(now));
      setAnnouncement(`Added “${trimmed}” to the top of your list.`);
      if (inputRef.current) inputRef.current.focus();
    }, 420);
  }

  function toggle(task) {
    setBusyId(task.id);
    later(() => {
      setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, completed: !t.completed, fresh: false } : t)));
      setBusyId(null);
      setSyncedAt(clock(new Date()));
      setAnnouncement(
        task.completed ? `“${task.title}” moved back to open.` : `“${task.title}” marked complete.`
      );
    }, 220);
  }

  function startEdit(task) {
    setEditingId(task.id);
    setDraft(task.title);
    setEditError("");
  }

  function cancelEdit() {
    setEditingId(null);
    setDraft("");
    setEditError("");
    setAnnouncement("Edit cancelled. The original title was kept.");
  }

  function saveEdit(task) {
    const next = draft.trim();
    if (!next) {
      setEditError("A title is required. The previous title is still saved.");
      return;
    }
    if (next.length > 255) {
      setEditError(`Titles are limited to 255 characters — this one is ${next.length}. The previous title is still saved.`);
      return;
    }
    setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, title: next } : t)));
    setEditingId(null);
    setDraft("");
    setEditError("");
    setSyncedAt(clock(new Date()));
    setAnnouncement(`Title saved as “${next}”.`);
  }

  function confirmDelete() {
    const task = tasks.find((t) => t.id === confirmId);
    if (!task) return;
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
    setConfirmId(null);
    setSyncedAt(clock(new Date()));
    setAnnouncement(`Deleted “${task.title}”. There is no undo.`);
    const el = returnFocusRef.current;
    if (el && el.focus) later(() => el.focus(), 10);
  }

  const labelCls = "text-[11px] font-bold uppercase tracking-[0.14em]";
  const actionBase =
    "ob-act inline-flex items-center gap-1.5 h-11 sm:h-8 px-2.5 text-[12px] font-semibold tracking-tight bg-transparent";

  const pendingTask = tasks.find((t) => t.id === confirmId);

  const css = `
    .ob-root :focus-visible { outline: 2px solid ${accent}; outline-offset: 2px; }
    .ob-act { border: 1px solid transparent; color: ${ink}; border-radius: ${radius}; transition: background-color .12s ease, border-color .12s ease, color .12s ease; }
    .ob-act:hover:not(:disabled) { border-color: ${ink}; background: ${hexToRgba(ink, 0.05)}; }
    .ob-act:active:not(:disabled) { background: ${hexToRgba(ink, 0.11)}; }
    .ob-act:disabled { opacity: .4; cursor: not-allowed; }
    .ob-del:hover:not(:disabled) { border-color: ${accent}; color: ${accent}; background: ${hexToRgba(accent, 0.06)}; }
    .ob-primary { transition: opacity .12s ease, background-color .12s ease; }
    .ob-primary:hover:not(:disabled) { opacity: .86; }
    .ob-primary:disabled { opacity: .38; cursor: not-allowed; }
    .ob-row { transition: background-color .12s ease; }
    .ob-row:hover { background: ${hexToRgba(ink, 0.025)}; }
    .ob-enter { animation: obSlide .26s ease-out both; }
    .ob-overlay { animation: obFade .14s ease-out both; }
    .ob-dialog { animation: obPop .18s cubic-bezier(.2,.8,.3,1) both; }
    .ob-skel { animation: obPulse 1.1s ease-in-out infinite; }
    @keyframes obSlide { from { opacity: 0; transform: translateY(-7px); } to { opacity: 1; transform: none; } }
    @keyframes obFade { from { opacity: 0; } to { opacity: 1; } }
    @keyframes obPop { from { opacity: 0; transform: translateY(6px) scale(.985); } to { opacity: 1; transform: none; } }
    @keyframes obPulse { 0%, 100% { opacity: .5; } 50% { opacity: .18; } }
    @media (prefers-reduced-motion: reduce) {
      .ob-enter, .ob-overlay, .ob-dialog, .ob-skel { animation: none !important; }
      .ob-act, .ob-primary, .ob-row { transition: none !important; }
    }
  `;

  return (
    <div
      className="ob-root min-h-full w-full"
      style={{ backgroundColor: bg, color: ink, fontFamily: brand.fontBody }}
    >
      <style>{css}</style>

      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Row 1 — page title */}
        <div
          className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-b-2 pb-4"
          style={{ borderColor: ink }}
        >
          <div data-wf="b-0-0">
            <p className={labelCls} style={{ color: muted }}>
              Private list · {ACCOUNT.name}
            </p>
            <h1
              className="mt-1.5 text-[34px] sm:text-[40px] font-bold leading-[0.95] tracking-[-0.025em]"
              style={{ fontFamily: brand.fontHeading }}
            >
              My tasks
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Avatar name={ACCOUNT.name} className="hidden sm:block" />
            <div className="hidden sm:block text-right leading-tight">
              <p className="text-[13px] font-semibold tracking-tight">{ACCOUNT.name}</p>
              <p className="text-[12px]" style={{ color: muted }}>
                {ACCOUNT.email}
              </p>
            </div>
          </div>
        </div>

        {/* Session / sync strip */}
        <div
          className="flex flex-wrap items-center gap-x-6 gap-y-1 border-b py-2.5 text-[11px] uppercase tracking-[0.12em]"
          style={{ borderColor: hairline, color: muted, fontVariantNumeric: "tabular-nums" }}
        >
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            Session ends {SESSION.expires}
          </span>
          <span>Signed in {SESSION.signedInAt}</span>
          <span className="inline-flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5"
              style={{ backgroundColor: phase === "ready" ? ink : hexToRgba(ink, 0.3) }}
            />
            {phase === "ready" ? `Synced ${syncedAt}` : "Syncing…"}
          </span>
        </div>

        {/* Row 2 — add task */}
        <form onSubmit={handleAdd} noValidate className="mt-7">
          <div className="grid grid-cols-12 gap-x-4 gap-y-3 items-end">
            <div className="col-span-12 sm:col-span-9" data-wf="b-1-0">
              <div className="flex items-baseline justify-between gap-3">
                <Label htmlFor="task-title" className={labelCls} style={{ color: ink }}>
                  Task title (max 255 characters)
                </Label>
                <span
                  className="text-[11px] font-semibold"
                  style={{
                    color: overBy > 0 ? accent : muted,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {trimmed.length} / 255
                </span>
              </div>
              <Input
                id="task-title"
                ref={inputRef}
                name="title"
                type="text"
                autoComplete="off"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (formState.kind !== "idle") setFormState({ kind: "idle" });
                }}
                placeholder="e.g. Call the plumber back about Thursday"
                aria-describedby="task-title-help"
                aria-invalid={formState.kind !== "idle"}
                className="mt-2 w-full h-12 px-3 text-[15px]"
                style={{
                  borderWidth: "2px",
                  borderStyle: "solid",
                  borderColor: formState.kind === "idle" ? ink : accent,
                  borderRadius: radius,
                  backgroundColor: bg,
                  color: ink,
                }}
              />
            </div>

            <div className="col-span-12 sm:col-span-3" data-wf="b-1-1">
              <Button
                type="submit"
                disabled={adding}
                className="ob-primary inline-flex w-full items-center justify-center gap-2 h-12 px-4 text-[13px] font-bold uppercase tracking-[0.12em]"
                style={{ backgroundColor: ink, color: bg, borderRadius: radius, border: `2px solid ${ink}` }}
              >
                {adding ? null : <Plus className="h-4 w-4" aria-hidden="true" />}
                {adding ? "Adding…" : "Add task"}
              </Button>
            </div>
          </div>

          {/* Row 3 — helper / validation / server rejection */}
          <div id="task-title-help" data-wf="b-2-0" className="mt-2.5 min-h-[20px]">
            {formState.kind === "idle" && (
              <p className="text-[12px] leading-5" style={{ color: muted }}>
                Title is required and must be 255 characters or fewer.
              </p>
            )}
            {formState.kind === "required" && (
              <p className="flex items-start gap-1.5 text-[12px] font-semibold leading-5" style={{ color: accent }} role="alert">
                <AlertCircle className="mt-[2px] h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                Title is required and must be 255 characters or fewer. Nothing was saved.
              </p>
            )}
            {formState.kind === "rejected" && (
              <p className="flex items-start gap-1.5 text-[12px] font-semibold leading-5" style={{ color: accent }} role="alert">
                <AlertCircle className="mt-[2px] h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                The server rejected this task: titles are limited to 255 characters and yours is {formState.length}. Your
                text is still in the box — trim it and add again.
              </p>
            )}
          </div>
        </form>

        {/* Row 4 — list */}
        <section className="mt-8" data-wf="b-3-0" aria-busy={phase === "loading"}>
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1 border-b-2 pb-2" style={{ borderColor: ink }}>
            <h2 className="text-[15px] font-bold tracking-tight" style={{ fontFamily: brand.fontHeading, fontVariantNumeric: "tabular-nums" }}>
              {phase === "loading" ? "Loading your list…" : `${tasks.length} ${tasks.length === 1 ? "task" : "tasks"}, newest first`}
            </h2>
            {phase === "ready" && tasks.length > 0 && (
              <p className="text-[11px] uppercase tracking-[0.12em]" style={{ color: muted, fontVariantNumeric: "tabular-nums" }}>
                {openTasks} open · {doneTasks} completed
              </p>
            )}
          </div>

          <p role="status" aria-live="polite" className="mt-2 min-h-[18px] text-[12px]" style={{ color: muted }}>
            {announcement}
          </p>

          {phase === "loading" && (
            <ul className="mt-1">
              {[0, 1, 2, 3].map((i) => (
                <li key={i} className="flex items-center gap-3 border-b py-4" style={{ borderColor: hairline }}>
                  <span className="ob-skel block h-4 w-4 shrink-0" style={{ backgroundColor: hexToRgba(ink, 0.5) }} aria-hidden="true" />
                  <span
                    className="ob-skel block h-3"
                    style={{ backgroundColor: hexToRgba(ink, 0.5), width: `${58 - i * 9}%`, animationDelay: `${i * 90}ms` }}
                    aria-hidden="true"
                  />
                </li>
              ))}
              <li className="sr-only">Loading your tasks</li>
            </ul>
          )}

          {phase === "ready" && tasks.length === 0 && (
            <div data-wf="b-5-0" className="mt-1 border-b py-2" style={{ borderColor: hairline }}>
              <Empty
                title="No tasks yet"
                description="Add your first task above — one line is all it takes. Your list is private to this account."
              />
            </div>
          )}

          {phase === "ready" && tasks.length > 0 && (
            <ul className="mt-1">
              {tasks.map((task) => {
                const editing = editingId === task.id;
                const busy = busyId === task.id;
                return (
                  <li
                    key={task.id}
                    data-wf={task.wf || undefined}
                    className={`ob-row border-b ${task.fresh ? "ob-enter" : ""}`}
                    style={{ borderColor: hairline }}
                  >
                    <div className="flex flex-wrap items-start gap-x-3 gap-y-2 py-3">
                      <input
                        type="checkbox"
                        id={`done-${task.id}`}
                        checked={task.completed}
                        disabled={editing || busy}
                        onChange={() => toggle(task)}
                        aria-label={`Mark “${task.title}” ${task.completed ? "not complete" : "complete"}`}
                        className="mt-[5px] h-[18px] w-[18px] shrink-0 cursor-pointer"
                        style={{ accentColor: ink }}
                      />

                      <div className="min-w-0 flex-1 basis-[55%]">
                        {editing ? (
                          <div>
                            <Label htmlFor={`edit-${task.id}`} className={labelCls} style={{ color: muted }}>
                              Edit title
                            </Label>
                            <div className="mt-1.5 flex flex-wrap items-center gap-2">
                              <Input
                                id={`edit-${task.id}`}
                                autoFocus
                                value={draft}
                                onChange={(e) => {
                                  setDraft(e.target.value);
                                  if (editError) setEditError("");
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    saveEdit(task);
                                  }
                                  if (e.key === "Escape") {
                                    e.preventDefault();
                                    cancelEdit();
                                  }
                                }}
                                aria-invalid={Boolean(editError)}
                                aria-describedby={editError ? `edit-err-${task.id}` : undefined}
                                className="h-11 min-w-0 flex-1 px-2.5 text-[15px]"
                                style={{
                                  borderWidth: "2px",
                                  borderStyle: "solid",
                                  borderColor: editError ? accent : ink,
                                  borderRadius: radius,
                                  backgroundColor: bg,
                                  color: ink,
                                }}
                              />
                              <Button
                                type="button"
                                onClick={() => saveEdit(task)}
                                className="ob-primary h-11 px-3 text-[12px] font-bold uppercase tracking-[0.12em]"
                                style={{ backgroundColor: ink, color: bg, borderRadius: radius, border: `2px solid ${ink}` }}
                              >
                                Save title
                              </Button>
                              <Button
                                type="button"
                                onClick={cancelEdit}
                                className="ob-act h-11 px-3 text-[12px] font-bold uppercase tracking-[0.12em]"
                                style={{ borderRadius: radius }}
                              >
                                Cancel
                              </Button>
                            </div>
                            {editError && (
                              <p
                                id={`edit-err-${task.id}`}
                                role="alert"
                                className="mt-1.5 flex items-start gap-1.5 text-[12px] font-semibold"
                                style={{ color: accent }}
                              >
                                <AlertCircle className="mt-[2px] h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                                {editError}
                              </p>
                            )}
                          </div>
                        ) : (
                          <>
                            <label
                              htmlFor={`done-${task.id}`}
                              className={`block cursor-pointer text-[15px] leading-6 tracking-tight ${
                                task.completed ? "line-through" : ""
                              }`}
                              style={{ color: task.completed ? muted : ink }}
                            >
                              {task.title}
                            </label>
                            <p
                              className="mt-1 text-[11px] uppercase tracking-[0.11em]"
                              style={{ color: muted, fontVariantNumeric: "tabular-nums" }}
                            >
                              Added {task.created_label}
                              <span aria-hidden="true"> · </span>
                              <span className="inline-flex items-center gap-1 font-bold" style={{ color: task.completed ? muted : ink }}>
                                {task.completed && <Check className="h-3 w-3" aria-hidden="true" />}
                                {busy ? "Saving…" : task.completed ? "Completed" : "Open"}
                              </span>
                            </p>
                          </>
                        )}
                      </div>

                      {!editing && (
                        <div className="flex w-full flex-wrap items-center justify-start gap-1 sm:w-auto sm:justify-end">
                          <Button
                            type="button"
                            data-wf="b-4-0"
                            onClick={() => toggle(task)}
                            disabled={busy}
                            className={actionBase}
                            style={{ borderRadius: radius }}
                          >
                            <Check className="h-3.5 w-3.5" aria-hidden="true" />
                            {task.completed ? "Mark not complete" : "Mark complete"}
                          </Button>
                          <Button
                            type="button"
                            data-wf="b-4-1"
                            onClick={() => startEdit(task)}
                            disabled={busy}
                            className={actionBase}
                            style={{ borderRadius: radius }}
                          >
                            <Edit className="h-3.5 w-3.5" aria-hidden="true" />
                            Edit title inline
                          </Button>
                          <Button
                            type="button"
                            data-wf="b-4-2"
                            onClick={(e) => {
                              returnFocusRef.current = e.currentTarget;
                              setConfirmId(task.id);
                            }}
                            disabled={busy}
                            className={`${actionBase} ob-del`}
                            style={{ borderRadius: radius }}
                          >
                            <Trash className="h-3.5 w-3.5" aria-hidden="true" />
                            Delete
                          </Button>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          <p className="mt-4 text-[11px] uppercase tracking-[0.12em]" style={{ color: muted }}>
            Completed tasks stay in place, struck through. Deleting is permanent — there is no trash.
          </p>
        </section>
      </div>

      {/* Row 7 — delete confirmation */}
      {pendingTask && (
        <div
          data-wf="b-6-0"
          className="ob-overlay fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
          style={{ backgroundColor: hexToRgba(ink, 0.5) }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeConfirm();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-title"
            aria-describedby="delete-desc"
            className="ob-dialog w-full max-w-md p-6"
            style={{ backgroundColor: bg, border: `2px solid ${ink}`, borderRadius: radius }}
          >
            <p className={labelCls} style={{ color: accent }}>
              Permanent action
            </p>
            <h2
              id="delete-title"
              className="mt-2 text-[20px] font-bold leading-tight tracking-tight"
              style={{ fontFamily: brand.fontHeading }}
            >
              Delete “{pendingTask.title}”?
            </h2>
            <p id="delete-desc" className="mt-2 text-[13px] leading-6" style={{ color: muted }}>
              This cannot be undone. The task is removed from your list and from the database, and there is no undo or
              trash in this app.
            </p>
            <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
              <Button
                type="button"
                onClick={closeConfirm}
                className="ob-act h-11 px-4 text-[12px] font-bold uppercase tracking-[0.12em]"
                style={{ border: `2px solid ${ink}`, borderRadius: radius, color: ink, backgroundColor: "transparent" }}
              >
                Cancel
              </Button>
              <Button
                type="button"
                ref={confirmBtnRef}
                onClick={confirmDelete}
                className="ob-primary inline-flex items-center justify-center gap-2 h-11 px-4 text-[12px] font-bold uppercase tracking-[0.12em]"
                style={{ backgroundColor: accent, color: "#ffffff", border: `2px solid ${accent}`, borderRadius: radius }}
              >
                <Trash className="h-4 w-4" aria-hidden="true" />
                Delete task
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
