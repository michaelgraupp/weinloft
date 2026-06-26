import ICAL from "ical.js";

const CALENDARS = {
  Gamlitzblick: process.env.BOOKING_ICAL_GAMLITZBLICK,
  Waldblick: process.env.BOOKING_ICAL_WALDBLICK,
};

export default async function handler(req, res) {
  try {
    const apartment = req.query.apartment;

    if (!apartment || !CALENDARS[apartment]) {
      return res.status(400).json({ error: "Invalid apartment" });
    }

    const response = await fetch(CALENDARS[apartment]);
    const icsText = await response.text();

    const jcalData = ICAL.parse(icsText);
    const comp = new ICAL.Component(jcalData);
    const events = comp.getAllSubcomponents("vevent");

    const blockedDates = events.map((event) => {
      const vevent = new ICAL.Event(event);

      return {
        start: vevent.startDate.toJSDate().toISOString().slice(0, 10),
        end: vevent.endDate.toJSDate().toISOString().slice(0, 10),
      };
    });

    res.status(200).json({ blockedDates });
  } catch (error) {
    res.status(500).json({ error: "Could not load calendar" });
  }
}