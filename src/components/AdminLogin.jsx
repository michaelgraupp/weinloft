import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("error.message");
      return;
    }

    window.location.href = "/admin";
  };

  return (
    <section className="min-h-screen bg-[#fbfaf6] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl bg-[#f3efe6] border border-[#ddd3c2] p-8 shadow-sm">
        <h1 className="font-serif text-4xl mb-6 text-center">
          Weinloft Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            required
            placeholder="E-Mail"
            className="w-full border border-[#cbbfae] rounded-xl px-3 py-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            required
            placeholder="Passwort"
            className="w-full border border-[#cbbfae] rounded-xl px-3 py-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full rounded-full bg-[#3f4b3f] text-white px-6 py-3"
          >
            Einloggen
          </button>
        </form>
      </div>
    </section>
  );
}