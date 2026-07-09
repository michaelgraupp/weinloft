import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import AdminBlocks from "./AdminBlocks";

export default function ProtectedAdmin() {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        window.location.href = "/login";
        return;
      }

      setSession(data.session);
      setIsLoading(false);
    };

    checkSession();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fbfaf6] flex items-center justify-center">
        Adminbereich wird geladen …
      </div>
    );
  }

  return (
    <div>
      <div className="bg-[#3f4b3f] text-white px-6 py-3 flex justify-between items-center">
        <span>Weinloft Admin</span>
        <button onClick={handleLogout} className="underline">
          Logout
        </button>
      </div>

      <AdminBlocks />
    </div>
  );
}