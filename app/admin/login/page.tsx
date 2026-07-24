"use client";

import Link from "next/link";
import { useState } from "react";

export default function AdminLoginPage() {
  const [status, setStatus] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Verificando…");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: form.get("password") }),
    });
    if (!response.ok) {
      setStatus("La contraseña no es válida.");
      return;
    }
    const returnTo = new URLSearchParams(window.location.search).get("return_to");
    window.location.href = returnTo?.startsWith("/") && !returnTo.startsWith("//") ? returnTo : "/admin";
  }

  return (
    <main className="admin-login-page">
      <form onSubmit={submit}>
        <Link className="logo" href="/" aria-label="IMIMED, inicio"><span><strong>IMIMED</strong><small>Ingeniería médica</small></span></Link>
        <p className="eyebrow">Administración</p>
        <h1>Acceso al CMS</h1>
        <p>Este acceso se utiliza sólo en despliegues independientes. En ChatGPT Sites, la identidad se valida automáticamente.</p>
        <label><span>Contraseña de administración</span><input name="password" type="password" autoComplete="current-password" required /></label>
        <button className="button button-dark" type="submit">Ingresar</button>
        <div className="form-status" role="status">{status}</div>
      </form>
    </main>
  );
}
