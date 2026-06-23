import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { de } from "date-fns/locale";

const apartments = ["Gamlitzblick", "Waldblick"];

export default function AvailabilityCalendar({ onSelectStay }) {
  const [selectedApartment, setSelectedApartment] = useState("Gamlitzblick");
  const [range, setRange] = useState();

  const handleSelect = (selectedRange) => {
    setRange(selectedRange);

    if (selectedRange?.from && selectedRange?.to) {
      onSelectStay({
        apartment: selectedApartment,
        arrival: format(selectedRange.from, "yyyy-MM-dd"),
        departure: format(selectedRange.to, "yyyy-MM-dd"),
      });
    }
  };

  return (
    <section className="py-20 bg-[#fbfaf6] scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.28em] text-[#7a7065]">
            Verfügbarkeit
          </p>
          <h2 className="font-serif text-3xl md:text-5xl">
            Zeitraum auswählen
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-[#6b6258]">
            Wählen Sie Ihr gewünschtes Apartment sowie Anreise und Abreise. Die
            Daten werden automatisch in die Buchungsanfrage übernommen.
          </p>
        </div>

        <div className="max-w-4xl mx-auto rounded-3xl border border-[#ddd3c2] bg-[#f3efe6] p-6 md:p-8 shadow-sm">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {apartments.map((apartment) => (
              <button
                key={apartment}
                type="button"
                onClick={() => {
                  setSelectedApartment(apartment);
                  setRange(undefined);
                }}
                className={`px-5 py-3 rounded-full border transition ${
                  selectedApartment === apartment
                    ? "bg-[#3f4b3f] text-white border-[#3f4b3f]"
                    : "bg-[#fbfaf6] text-[#2b2b2b] border-[#cbbfae] hover:bg-white"
                }`}
              >
                {apartment}
              </button>
            ))}
          </div>

          <div className="flex justify-center">
            <DayPicker
              mode="range"
              selected={range}
              onSelect={handleSelect}
              numberOfMonths={2}
              locale={de}
              weekStartsOn={1}
              disabled={{ before: new Date() }}
              modifiersClassNames={{
                selected: "weinloft-selected",
                range_start: "weinloft-range-start",
                range_end: "weinloft-range-end",
                range_middle: "weinloft-range-middle",
                disabled: "weinloft-disabled",
              }}
            />
          </div>

          <div className="mt-8 text-center text-sm text-[#6b6258]">
            {range?.from && range?.to ? (
              <p>
                Ausgewählt: <strong>{selectedApartment}</strong> ·{" "}
                {format(range.from, "dd. MMMM yyyy", { locale: de })} bis{" "}
                {format(range.to, "dd. MMMM yyyy", { locale: de })}
              </p>
            ) : (
              <p>Bitte zuerst Anreise und danach Abreise auswählen.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}