
"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

function LoginForm() {
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/dashboard";

  const [mobileOrEmail, setMobileOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState<"en" | "ta">("en");

  const content = {
    en: {
      brandTitle: "Every parent informed. Every day.",
      brandDescription:
        "Attendance, announcements and fees, with proof that every message arrived.",
      title: "Sign in",
      description: "Use the mobile number or email your school gave you.",
      mobileLabel: "Mobile number or email",
      mobilePlaceholder: "Mobile number or email",
      password: "Password",
      passwordPlaceholder: "Password",
      show: "Show",
      hide: "Hide",
      signIn: "Sign in",
      forgot: "Forgot password?",
    },
    ta: {
      brandTitle: "ஒவ்வொரு பெற்றோருக்கும் தினமும் தகவல்கள்.",
      brandDescription:
        "வருகைப்பதிவு, அறிவிப்புகள் மற்றும் கட்டண விவரங்களை அறிந்து கொள்ளுங்கள்.",
      title: "உள்நுழைய",
      description:
        "பள்ளி வழங்கிய மொபைல் எண் அல்லது மின்னஞ்சலைப் பயன்படுத்தவும்.",
      mobileLabel: "மொபைல் எண் அல்லது மின்னஞ்சல்",
      mobilePlaceholder: "மொபைல் எண் அல்லது மின்னஞ்சல்",
      password: "கடவுச்சொல்",
      passwordPlaceholder: "கடவுச்சொல்",
      show: "காட்டு",
      hide: "மறை",
      signIn: "உள்நுழைய",
      forgot: "கடவுச்சொல் மறந்துவிட்டதா?",
    },
  };

  const t = content[language];

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    alert(
      "Login UI is ready. API integration will be connected after the backend contract is confirmed."
    );
  }

  return (
    <main className="login-page">
      <header className="login-language">
        <button
          type="button"
          onClick={() => setLanguage("en")}
          aria-pressed={language === "en"}
        >
          English
        </button>

        <button
          type="button"
          onClick={() => setLanguage("ta")}
          aria-pressed={language === "ta"}
        >
          தமிழ்
        </button>
      </header>

      <div className="login-layout">
        <section className="login-brand">
          <h1>{t.brandTitle}</h1>
          <p>{t.brandDescription}</p>
        </section>

        <section className="login-card">
          <h1>Hengen Campus</h1>

          <h2>{t.title}</h2>
          <p>{t.description}</p>

          <form onSubmit={handleLogin}>
            <input
              type="hidden"
              name="returnTo"
              value={returnTo}
            />

            <label htmlFor="mobileOrEmail">
              {t.mobileLabel}
            </label>

            <input
              id="mobileOrEmail"
              name="mobileOrEmail"
              type="text"
              placeholder={t.mobilePlaceholder}
              value={mobileOrEmail}
              onChange={(event) => setMobileOrEmail(event.target.value)}
              autoComplete="username"
              required
            />

            <label htmlFor="password">{t.password}</label>

            <div className="password-input-wrapper">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder={t.passwordPlaceholder}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? t.hide : t.show}
              >
                {showPassword ? t.hide : t.show}
              </button>
            </div>

            <button type="submit">{t.signIn}</button>
          </form>

          <a href="/login/reset" className="forgot-password">
            {t.forgot}
          </a>

          <footer>Hengen | Afibas Technologies</footer>
        </section>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<main>Loading login...</main>}>
      <LoginForm />
    </Suspense>
  );
}
