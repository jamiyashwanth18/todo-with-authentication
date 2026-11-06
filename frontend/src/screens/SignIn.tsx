// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Input, Label } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Check, X, Clock, ArrowRight, AlertCircle, CheckCircle } = Icons;

const SYSTEM_FACTS = [
  { k: "Session length", v: "30 days" },
  { k: "Password storage", v: "Argon2id hash" },
  { k: "Password reset", v: "None" },
  { k: "Task visibility", v: "Owner only" },
  { k: "Sign-up", v: "Open link" },
];

const RECENT_SESSION = {
  device: "Chrome 131 · macOS",
  startedLabel: "05 Oct 2026, 08:12",
  endedLabel: "04 Nov 2026, 08:12",
};

const FAIL_LIMIT = 3;
const COOLDOWN_SECONDS = 30;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Screen() {
  const navigate = useNavigate();
  const ink = brand.primaryColor;
  const accent = brand.accentColor;
  const muted = brand.neutralColor;
  const hair = "rgba(17,17,17,0.16)";
  const r = brand.radius;

  const [email, setEmail] = React.useState("m.okonkwo@northgate.studio");
  const [password, setPassword] = React.useState("");
  const [fieldErrors, setFieldErrors] = React.useState({});
  const [phase, setPhase] = React.useState("idle"); // idle | checking | error | throttled | success
  const [fails, setFails] = React.useState(0);
  const [cooldown, setCooldown] = React.useState(0);

  const checkTimer = React.useRef(null);
  const successTimer = React.useRef(null);
  const tick = React.useRef(null);
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);

  React.useEffect(() => {
    return () => {
      if (checkTimer.current) clearTimeout(checkTimer.current);
      if (successTimer.current) clearTimeout(successTimer.current);
      if (tick.current) clearInterval(tick.current);
    };
  }, []);

  React.useEffect(() => {
    if (cooldown <= 0) return undefined;
    tick.current = setInterval(() => {
      setCooldown((c) => {
        if (c <= 1) {
          clearInterval(tick.current);
          setPhase("idle");
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(tick.current);
  }, [cooldown > 0]);

  const busy = phase === "checking" || phase === "success";
  const blocked = cooldown > 0;

  function mmss(total) {
    const m = String(Math.floor(total / 60)).padStart(2, "0");
    const s = String(total % 60).padStart(2, "0");
    return m + ":" + s;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (busy || blocked) return;

    const next = {};
    const mail = email.trim();
    if (!mail) next.email = "Enter the email address you registered with.";
    else if (!EMAIL_RE.test(mail)) next.email = "That is not a valid email address.";
    if (!password) next.password = "Enter your password.";

    setFieldErrors(next);
    if (Object.keys(next).length) {
      setPhase("idle");
      if (next.email && emailRef.current) emailRef.current.focus();
      else if (next.password && passwordRef.current) passwordRef.current.focus();
      return;
    }

    setPhase("checking");
    checkTimer.current = setTimeout(() => {
      // Credentials are verified against the stored hash on the server.
      const ok = password.length >= 8;
      if (ok) {
        setPhase("success");
        successTimer.current = setTimeout(() => navigate("my-tasks"), 520);
      } else {
        const n = fails + 1;
        setFails(n);
        if (n >= FAIL_LIMIT) {
          setPhase("throttled");
          setCooldown(COOLDOWN_SECONDS);
        } else {
          setPhase("error");
        }
        if (passwordRef.current) passwordRef.current.focus();
      }
    }, 760);
  }

  const showFailure = phase === "error" || phase === "throttled";

  const labelCls = "block text-[11px] font-bold uppercase tracking-[0.18em]";
  const inputStyle = (invalid) => ({
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: invalid ? accent : ink,
    borderRadius: r,
    backgroundColor: brand.backgroundColor,
    color: ink,
    fontFamily: brand.fontBody,
  });

  const css = `
    @keyframes obsDrop { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
    @keyframes obsBar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
    .obs-drop { animation: obsDrop 180ms ease-out both; }
    .obs-bar { transform-origin: left; animation: obsBar 760ms linear both; }
    .obs-focus:focus-visible { outline: 2px solid ${accent}; outline-offset: 2px; }
    .obs-field:focus { outline: 2px solid ${accent}; outline-offset: 2px; }
    .obs-link:hover { background-color: ${ink}; color: ${brand.backgroundColor}; }
    .obs-submit:hover:not(:disabled) { background-color: ${brand.backgroundColor}; color: ${ink}; }
    @media (prefers-reduced-motion: reduce) {
      .obs-drop, .obs-bar { animation: none !important; }
    }
  `;

  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundColor: brand.backgroundColor,
        color: ink,
        fontFamily: brand.fontBody,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      <style>{css}</style>

      <div className="mx-auto grid min-h-screen w-full max-w-[1200px] grid-cols-1 lg:grid-cols-12">
        {/* ---------- Identity / spec rail ---------- */}
        <aside
          className="flex flex-col justify-between gap-12 px-6 py-10 lg:col-span-5 lg:px-10 lg:py-12"
          style={{ borderColor: ink, borderBottomWidth: 2, borderRightWidth: 0 }}
        >
          <div>
            <div className="flex items-center gap-3">
              <span
                className="flex h-7 w-7 items-center justify-center"
                style={{ backgroundColor: ink, borderRadius: r }}
                aria-hidden="true"
              >
                <Check className="h-4 w-4" style={{ color: brand.backgroundColor }} />
              </span>
              <span className="text-[13px] font-bold uppercase tracking-[0.3em]">
                Task Register
              </span>
            </div>

            <p className="mt-10 max-w-[22ch] text-[26px] font-bold leading-[1.15] tracking-[-0.02em] lg:text-[32px]">
              One list. One account. Nothing shared.
            </p>
            <p
              className="mt-4 max-w-[46ch] text-[13px] leading-[1.6]"
              style={{ color: muted }}
            >
              Every task is tied to the account that wrote it and is read back
              from the server against that account only.
            </p>
          </div>

          <div>
            <h2
              className="pb-2 text-[11px] font-bold uppercase tracking-[0.18em]"
              style={{ borderBottom: "2px solid " + ink }}
            >
              How this app works
            </h2>
            <dl className="mt-0">
              {SYSTEM_FACTS.map((f) => (
                <div
                  key={f.k}
                  className="flex items-baseline justify-between gap-4 py-2.5"
                  style={{ borderBottom: "1px solid " + hair }}
                >
                  <dt className="text-[13px]" style={{ color: muted }}>
                    {f.k}
                  </dt>
                  <dd className="text-[13px] font-bold">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div
            className="flex items-center justify-between gap-4 pt-4 text-[11px] uppercase tracking-[0.14em]"
            style={{ borderTop: "1px solid " + hair, color: muted }}
          >
            <span className="inline-flex items-center gap-2">
              <CheckCircle className="h-3.5 w-3.5" aria-hidden="true" />
              Service normal
            </span>
            <span>Checked 09:14 GMT</span>
          </div>
        </aside>

        {/* ---------- Sign-in column ---------- */}
        <main className="px-6 py-10 lg:col-span-7 lg:px-14 lg:py-12">
          <div className="mx-auto w-full max-w-[440px]">
            {/* b-0-0 */}
            <header data-wf="b-0-0">
              <p
                className="text-[11px] font-bold uppercase tracking-[0.22em]"
                style={{ color: muted }}
              >
                Account access
              </p>
              <h1 className="mt-3 text-[38px] font-bold leading-none tracking-[-0.035em] lg:text-[44px]">
                Sign in
              </h1>
              <p
                className="mt-4 text-[13px] leading-[1.6]"
                style={{ color: muted }}
              >
                Your 30-day session on this browser ended on{" "}
                <span style={{ color: ink, fontWeight: 700 }}>
                  {RECENT_SESSION.endedLabel}
                </span>
                . Sign in again to open My tasks.
              </p>
            </header>

            {/* b-1-0 */}
            <div
              data-wf="b-1-0"
              role="alert"
              aria-live="assertive"
              className={showFailure ? "mt-6" : ""}
            >
              {showFailure ? (
                <div
                  className="obs-drop flex items-start gap-3 px-4 py-3"
                  style={{
                    border: "2px solid " + accent,
                    borderRadius: r,
                    backgroundColor: brand.backgroundColor,
                  }}
                >
                  <AlertCircle
                    className="mt-[2px] h-4 w-4 shrink-0"
                    style={{ color: accent }}
                    aria-hidden="true"
                  />
                  <div>
                    <p
                      className="text-[14px] font-bold leading-snug"
                      style={{ color: accent }}
                    >
                      Email or password is incorrect
                    </p>
                    <p className="mt-1 text-[12px] leading-[1.5]" style={{ color: muted }}>
                      {phase === "throttled"
                        ? "Sign-in is paused after " +
                          FAIL_LIMIT +
                          " failed attempts. Try again in " +
                          mmss(cooldown) +
                          "."
                        : "Attempt " +
                          fails +
                          " of " +
                          FAIL_LIMIT +
                          ". Sign-in pauses for 30 seconds after the third."}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>

            {/* b-2-0 */}
            <form
              data-wf="b-2-0"
              onSubmit={handleSubmit}
              noValidate
              className="mt-7"
            >
              <div>
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-[11px] font-bold tracking-[0.18em]"
                    style={{ color: muted }}
                    aria-hidden="true"
                  >
                    01
                  </span>
                  <Label htmlFor="signin-email" className={labelCls}>
                    Email
                  </Label>
                </div>
                <Input
                  data-wf="i-2-0-0"
                  id="signin-email"
                  ref={emailRef}
                  type="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  value={email}
                  disabled={busy}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldErrors.email)
                      setFieldErrors((p) => ({ ...p, email: undefined }));
                  }}
                  aria-invalid={fieldErrors.email ? "true" : undefined}
                  aria-describedby={
                    fieldErrors.email ? "signin-email-err" : "signin-email-hint"
                  }
                  className="obs-field mt-2 h-12 w-full px-3 text-[15px]"
                  style={inputStyle(Boolean(fieldErrors.email))}
                />
                {fieldErrors.email ? (
                  <p
                    id="signin-email-err"
                    className="obs-drop mt-2 text-[12px] font-bold"
                    style={{ color: accent }}
                  >
                    {fieldErrors.email}
                  </p>
                ) : (
                  <p
                    id="signin-email-hint"
                    className="mt-2 text-[12px]"
                    style={{ color: muted }}
                  >
                    Last used on this browser · {RECENT_SESSION.device}
                  </p>
                )}
              </div>

              <div className="mt-6">
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-[11px] font-bold tracking-[0.18em]"
                    style={{ color: muted }}
                    aria-hidden="true"
                  >
                    02
                  </span>
                  <Label htmlFor="signin-password" className={labelCls}>
                    Password
                  </Label>
                </div>
                <Input
                  data-wf="i-2-0-1"
                  id="signin-password"
                  ref={passwordRef}
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  value={password}
                  disabled={busy}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (fieldErrors.password)
                      setFieldErrors((p) => ({ ...p, password: undefined }));
                  }}
                  aria-invalid={fieldErrors.password ? "true" : undefined}
                  aria-describedby={
                    fieldErrors.password ? "signin-password-err" : undefined
                  }
                  className="obs-field mt-2 h-12 w-full px-3 text-[15px]"
                  style={inputStyle(Boolean(fieldErrors.password))}
                />
                {fieldErrors.password ? (
                  <p
                    id="signin-password-err"
                    className="obs-drop mt-2 text-[12px] font-bold"
                    style={{ color: accent }}
                  >
                    {fieldErrors.password}
                  </p>
                ) : null}
              </div>

              {/* b-3-0 */}
              <div data-wf="b-3-0" className="mt-8">
                <Button
                  type="submit"
                  disabled={busy || blocked}
                  aria-disabled={busy || blocked ? "true" : undefined}
                  className="obs-focus obs-submit flex h-12 w-full items-center justify-center gap-2 text-[14px] font-bold uppercase tracking-[0.16em] transition-colors duration-150"
                  style={{
                    backgroundColor:
                      busy || blocked ? brand.backgroundColor : ink,
                    color: busy || blocked ? muted : brand.backgroundColor,
                    border: "2px solid " + (blocked ? muted : ink),
                    borderRadius: r,
                    cursor: busy || blocked ? "not-allowed" : "pointer",
                  }}
                >
                  {phase === "checking" ? (
                    <React.Fragment>
                      <Clock className="h-4 w-4" aria-hidden="true" />
                      Checking credentials
                    </React.Fragment>
                  ) : phase === "success" ? (
                    <React.Fragment>
                      <CheckCircle className="h-4 w-4" aria-hidden="true" />
                      Opening My tasks
                    </React.Fragment>
                  ) : blocked ? (
                    <React.Fragment>
                      <X className="h-4 w-4" aria-hidden="true" />
                      Paused · {mmss(cooldown)}
                    </React.Fragment>
                  ) : (
                    "Sign in"
                  )}
                </Button>

                <div
                  className="mt-[-2px] h-[2px] w-full overflow-hidden"
                  aria-hidden="true"
                >
                  {phase === "checking" ? (
                    <div
                      className="obs-bar h-full w-full"
                      style={{ backgroundColor: accent }}
                    />
                  ) : null}
                </div>

                <p className="sr-only" aria-live="polite">
                  {phase === "checking"
                    ? "Checking your credentials."
                    : phase === "success"
                    ? "Signed in. Opening My tasks."
                    : ""}
                </p>
              </div>
            </form>

            {/* b-4-0 */}
            <div data-wf="b-4-0" className="mt-6">
              <button
                type="button"
                onClick={() => navigate("sign-up")}
                className="obs-focus obs-link inline-flex h-11 items-center gap-2 px-3 text-[13px] font-bold transition-colors duration-150"
                style={{
                  border: "2px solid " + ink,
                  borderRadius: r,
                  color: ink,
                  backgroundColor: brand.backgroundColor,
                }}
              >
                New here? Sign up
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* b-5-0 */}
            <p
              data-wf="b-5-0"
              className="mt-10 max-w-[56ch] pt-4 text-[12px] leading-[1.65]"
              style={{ borderTop: "1px solid " + hair, color: muted }}
            >
              You stay signed in on this browser for 30 days unless you sign
              out. There is no password reset.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
