
"use client";

import { useState } from "react";
import Link from "next/link";

export default function ResetPasswordPage() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage(
      "Reset screen is ready. WhatsApp/SMS OTP delivery will be connected after the backend API is confirmed."
    );
  }

  return (
    <main className="login-page">
      <header className="login-language">
        <Link href="/login">‹ Sign in</Link>
      </header>

      <div className="login-layout reset-layout">
        <section className="login-card">
          <h1>Hengen Campus</h1>

          <h2>Reset your password</h2>

          <p>
            Enter your mobile number. We will send a 6-digit code on WhatsApp.
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="mobileNumber">Mobile number</label>

            <input
              id="mobileNumber"
              name="mobileNumber"
              type="tel"
              placeholder="Enter your mobile number"
              value={mobileNumber}
              onChange={(event) => setMobileNumber(event.target.value)}
              autoComplete="tel"
              pattern="[0-9]{10}"
              maxLength={10}
              title="Enter a valid 10-digit mobile number"
              required
            />

            <button type="submit">Send code</button>
          </form>

          <p className="reset-sms-note">
            No WhatsApp? We can send the code by SMS.
          </p>

          {message && (
            <p className="reset-message" role="status">
              {message}
            </p>
          )}

          <footer>Hengen | Afibas Technologies</footer>
        </section>
      </div>
    </main>
  );
}
