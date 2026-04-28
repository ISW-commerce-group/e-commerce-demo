"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect to auth endpoint
  };

  const EyeOpen = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

  const EyeOff = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

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
                "Where every petal tells a story of love and elegance."
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
          <div className="login-form-wrapper login-form-wrapper--register">

            {/* Header */}
            <div className="login-form-header">
              <div className="overline login-form-header__overline">Account</div>
              <h1 className="login-form-header__title">Create account</h1>
              <p className="login-form-header__subtitle">
                Join us and discover the art of floral elegance.
              </p>
            </div>

            {/* Form */}
            <form
              id="register-form"
              className="login-form w-form"
              onSubmit={handleSubmit}
              noValidate
            >
              {/* Name row */}
              <div className="login-field-row">
                <div className="login-field-group">
                  <label htmlFor="reg-firstname" className="login-label">
                    First name
                  </label>
                  <input
                    id="reg-firstname"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    placeholder="Jane"
                    className="text-field w-input login-input"
                    value={form.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="login-field-group">
                  <label htmlFor="reg-lastname" className="login-label">
                    Last name
                  </label>
                  <input
                    id="reg-lastname"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    required
                    placeholder="Doe"
                    className="text-field w-input login-input"
                    value={form.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="login-field-group">
                <label htmlFor="reg-email" className="login-label">
                  Email address
                </label>
                <input
                  id="reg-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="your@email.com"
                  className="text-field w-input login-input"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              {/* Password */}
              <div className="login-field-group">
                <label htmlFor="reg-password" className="login-label">
                  Password
                </label>
                <div className="login-password-wrap">
                  <input
                    id="reg-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    placeholder="Min. 8 characters"
                    className="text-field w-input login-input login-input--password"
                    value={form.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    id="reg-toggle-password"
                    className="login-toggle-pw"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword ? <EyeOff /> : <EyeOpen />}
                  </button>
                </div>
                {/* Strength hint */}
                {form.password.length > 0 && (
                  <div className="reg-strength">
                    <div
                      className={`reg-strength__bar ${form.password.length < 6
                        ? "reg-strength__bar--weak"
                        : form.password.length < 10
                          ? "reg-strength__bar--medium"
                          : "reg-strength__bar--strong"
                        }`}
                    />
                    <span className="reg-strength__label caption">
                      {form.password.length < 6
                        ? "Weak"
                        : form.password.length < 10
                          ? "Medium"
                          : "Strong"}
                    </span>
                  </div>
                )}
              </div>

              {/* Confirm password */}
              <div className="login-field-group">
                <label htmlFor="reg-confirm" className="login-label">
                  Confirm password
                </label>
                <div className="login-password-wrap">
                  <input
                    id="reg-confirm"
                    name="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    placeholder="Repeat password"
                    className={`text-field w-input login-input login-input--password ${form.confirmPassword &&
                      form.confirmPassword !== form.password
                      ? "login-input--error"
                      : ""
                      }`}
                    value={form.confirmPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    id="reg-toggle-confirm"
                    className="login-toggle-pw"
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                    onClick={() => setShowConfirm((v) => !v)}
                  >
                    {showConfirm ? <EyeOff /> : <EyeOpen />}
                  </button>
                </div>
                {form.confirmPassword && form.confirmPassword !== form.password && (
                  <span className="reg-error-msg caption">
                    Passwords do not match
                  </span>
                )}
              </div>

              {/* Terms */}
              <div className="login-remember">
                <label className="login-checkbox-label w-form-label">
                  <input
                    id="reg-terms"
                    name="terms"
                    type="checkbox"
                    className="login-checkbox"
                    checked={form.terms}
                    onChange={handleChange}
                  />
                  <span className="login-checkbox-custom" />
                  <span className="caption">
                    I agree to the{" "}
                    <Link href="/terms" className="login-register-link">
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="login-register-link">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
              </div>

              {/* Submit */}
              <button
                id="register-submit"
                type="submit"
                className="primary_button login-submit-btn"
              >
                <div className="wrap-button_text">
                  <div className="button_text">Create account</div>
                  <div className="button_text">Create account</div>
                </div>
              </button>
            </form>

            {/* Footer link */}
            <p className="login-register-prompt caption">
              Already have an account?{" "}
              <Link href="/login" className="login-register-link">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
