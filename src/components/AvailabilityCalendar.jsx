import { useEffect, useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { supabase } from "../lib/supabase";

const apartments = ["Gamlitzblick", "Waldblick"];

const toLocalDate = (dateString) => {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const addDays = (date, days) => {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
};

const expandBlockedDates = (blockedRanges) => {
  const dates = [];

  blockedRanges.forEach(({ start, end }) => {
    let currentDate = addDays(toLocalDate(start), 1);
    const endDate = toLocalDate(end);

    while (currentDate < endDate) {
      dates.push(new Date(currentDate));
      currentDate = addDays(currentDate, 1);
    }
  });

  return dates;
};

export default function AvailabilityCalendar({ onSelectStay }) {
  const [selectedApartment, setSelectedApartment] = useState("Gamlitzblick");
  const [range, setRange] = useState();
  const [blockedRanges, setBlockedRanges] = useState([]);
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false);
  const [availabilityError, setAvailabilityError] = useState("");

  const blockedDates = useMemo(
    () => expandBlockedDates(blockedRanges),
    [blockedRanges]
  );

  useEffect(() => {
  const loadAvailability = async () => {
    setIsLoadingAvailability(true);
    setAvailabilityError("");

    let bookingBlockedDates = [];
    let manualBlockedDates = [];

    try {
      const bookingResponse = await fetch(
        `/api/availability?apartment=${encodeURIComponent(selectedApartment)}`
      );

      if (bookingResponse.ok) {
        const bookingData = await bookingResponse.json();
        bookingBlockedDates = bookingData.blockedDates || [];
      }
    } catch (error) {
      console.warn("Booking.com-Verfügbarkeit lokal nicht geladen:", error);
    }

    try {
      const { data: manualBlocks, error } = await supabase
        .from("public_manual_blocks")
        .select("arrival, departure")
        .eq("apartment", selectedApartment);

      if (error) {
        throw error;
      }

      manualBlockedDates = (manualBlocks || []).map((block) => ({
        start: block.arrival,
        end: block.departure,
      }));
    } catch (error) {
      console.error("Supabase-Sperren konnten nicht geladen werden:", error);
      setAvailabilityError(
        "Die privaten Sperren konnten momentan nicht geladen werden."
      );
    }

    setBlockedRanges([...bookingBlockedDates, ...manualBlockedDates]);
    setIsLoadingAvailability(false);
  };

  loadAvailability();
}, [selectedApartment]);

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
    <section id="verfuegbarkeit" className="pt-10 pb-20 bg-[#fbfaf6] scroll-mt-24">
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

          {isLoadingAvailability && (
            <p className="mb-4 text-center text-sm text-[#6b6258]">
              Verfügbarkeit wird geladen …
            </p>
          )}

          {availabilityError && (
            <p className="mb-4 text-center text-sm text-red-700">
              {availabilityError}
            </p>
          )}

          <div className="flex justify-center">
            <DayPicker
              mode="range"
              selected={range}
              onSelect={handleSelect}
              numberOfMonths={2}
              locale={de}
              weekStartsOn={1}
              disabled={[{ before: new Date() }, ...blockedDates]}
              excludeDisabled={false}
              modifiers={{ booked: blockedDates }}
              modifiersClassNames={{
                booked: "weinloft-booked",
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
              <p>Wählen Sie Anreise und Abreise im Kalender aus.</p>
            )}

            <div className="mt-6 rounded-2xl bg-[#fbfaf6] border border-[#ddd3c2] px-5 py-4 text-sm text-[#4f4a43] text-center">
              <p>
                Mindestaufenthalt: <strong>3 Nächte</strong>
              </p>
              <p className="mt-1">
                Ab <strong>7 Nächten</strong> erhalten Sie{" "}
                <strong>10 % Rabatt</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}