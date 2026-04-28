"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect to auth endpoint
  };

  return (
    <div className="login-page">
      {/* ── LEFT PANEL – decorative ── */}
      <div className="container">
        <div className="login-panel-left">
          <div className="login-panel-left__inner">
            {/* Brand */}
            <div className="login-brand">
              <Link href="/" className="login-brand__link">
                <span className="login-brand__name">Kyiv</span>
                <span className="login-brand__sub">Luxe Bouquets®</span>
              </Link>
            </div>

            {/* Decorative quote */}
            <div className="login-quote">
              <p className="login-quote__text">
                &quot;A single flower can say what a thousand words cannot.&quot;
              </p>
              <span className="login-quote__author overline">— Kyiv Luxe</span>
            </div>

            {/* Bottom decorative lines */}
            <div className="login-panel-lines" aria-hidden="true">
              <div className="login-panel-line" />
              <div className="login-panel-line login-panel-line--delay" />
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL – form ── */}
      <div className="container">
        <div className="login-panel-right">
          <div className="login-form-wrapper">

            {/* Header */}
            <div className="login-form-header">
              <div className="overline login-form-header__overline">Account</div>
              <h1 className="login-form-header__title">Sign in</h1>
              <p className="login-form-header__subtitle">
                Welcome back. Enter your details to continue.
              </p>
            </div>

            {/* Form */}
            <form
              id="login-form"
              className="login-form w-form"
              onSubmit={handleSubmit}
              noValidate
            >
              {/* Email */}
              <div className="login-field-group">
                <label htmlFor="login-email" className="login-label">
                  Email address
                </label>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="your@email.com"
                  className="text-field w-input login-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password */}
              <div className="login-field-group">
                <div className="login-label-row">
                  <label htmlFor="login-password" className="login-label">
                    Password
                  </label>
                  <Link href="/forgot-password" className="login-forgot caption">
                    Forgot password?
                  </Link>
                </div>
                <div className="login-password-wrap">
                  <input
                    id="login-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    placeholder="••••••••"
                    className="text-field w-input login-input login-input--password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    id="toggle-password"
                    className="login-toggle-pw"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div className="login-remember">
                <label className="login-checkbox-label w-form-label">
                  <input
                    id="login-remember"
                    type="checkbox"
                    className="login-checkbox"
                  />
                  <span className="login-checkbox-custom" />
                  <span className="caption">Remember me</span>
                </label>
              </div>

              {/* Submit */}
              <button
                id="login-submit"
                type="submit"
                className="primary_button login-submit-btn"
              >
                <div className="wrap-button_text">
                  <div className="button_text">Sign in</div>
                  <div className="button_text">Sign in</div>
                </div>
              </button>

              {/* Divider */}
              <div className="login-divider" aria-hidden="true">
                <span className="login-divider__line" />
                <span className="login-divider__text caption">or</span>
                <span className="login-divider__line" />
              </div>

              {/* Guest checkout */}
              <Link
                href="/category"
                id="login-guest"
                className="second_button login-guest-btn w-inline-block"
              >
                <div className="wrap-button_text">
                  <div className="button_text">Continue as guest</div>
                  <div className="button_text">Continue as guest</div>
                </div>
              </Link>
            </form>

            {/* Footer link */}
            <p className="login-register-prompt caption">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="login-register-link">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
