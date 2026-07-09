import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function AdminBlocks() {
  const [form, setForm] = useState({
    apartment: "Gamlitzblick",
    arrival: "",
    departure: "",
    type: "Privatbuchung",
    note: "",
  });

  const saveBlock = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("manual_blocks").insert(form);

   if (error) {
  console.log(error);
  alert(JSON.stringify(error));
  return;
}

    alert("Zeitraum gespeichert.");
    setForm({
      apartment: "Gamlitzblick",
      arrival: "",
      departure: "",
      type: "Privatbuchung",
      note: "",
    });
  };

  return (
    <section className="min-h-screen bg-[#fbfaf6] py-20 px-4">
      <div className="max-w-xl mx-auto rounded-3xl bg-[#f3efe6] border border-[#ddd3c2] p-8">
        <h1 className="font-serif text-4xl mb-6">Weinloft Admin</h1>

        <form onSubmit={saveBlock} className="space-y-4">
          <div>
            <label className="block mb-1">Apartment</label>
            <select
              className="w-full border border-[#cbbfae] rounded-xl px-3 py-3"
              value={form.apartment}
              onChange={(e) =>
                setForm({ ...form, apartment: e.target.value })
              }
            >
              <option value="Gamlitzblick">Gamlitzblick</option>
              <option value="Waldblick">Waldblick</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Anreise / Von</label>
            <input
              type="date"
              required
              className="w-full border border-[#cbbfae] rounded-xl px-3 py-3"
              value={form.arrival}
              onChange={(e) => setForm({ ...form, arrival: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1">Abreise / Bis</label>
            <input
              type="date"
              required
              className="w-full border border-[#cbbfae] rounded-xl px-3 py-3"
              value={form.departure}
              onChange={(e) =>
                setForm({ ...form, departure: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block mb-1">Art</label>
            <select
              className="w-full border border-[#cbbfae] rounded-xl px-3 py-3"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option>Privatbuchung</option>
              <option>Eigenbedarf</option>
              <option>Reinigung</option>
              <option>Wartung</option>
              <option>Gesperrt</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Notiz</label>
            <textarea
              className="w-full border border-[#cbbfae] rounded-xl px-3 py-3"
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-[#3f4b3f] text-white px-6 py-3"
          >
            Zeitraum speichern
          </button>
        </form>
      </div>
    </section>
  );
}