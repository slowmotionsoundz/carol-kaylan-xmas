'use strict';

const days = {
  d23: {
    title: "Wheels up. See you tomorrow.",
    sub: "Nashville → Keflavík, overnight across the Atlantic.",
    pill: "WEDNESDAY / THE TRAVEL DAY",
    items: [
      ["AFTERNOON", "17:30", "Wheels up from Nashville.", "Icelandair, overnight across the Atlantic. Dinner in the air, sleep if they can, breakfast over Europe.", "https://www.flightradar24.com/data/flights/fi204", "Follow the trip ↗"],
      ["MEANWHILE", "Home side", "Everything ready before they board.", "Beds made, van fueled, plan set. Everything on this side is in place before they leave."]
    ],
    note: "The overnight flight lands at 11:45 on Christmas Eve morning, and the plan keeps that first day easy on purpose."
  },
  d24: {
    title: "Land. Exhale. Christmas Eve.",
    sub: "CPH → the city → dinner with the family.",
    pill: "THURSDAY / CHRISTMAS EVE",
    items: [
      ["MORNING", "11:45", "Land at CPH.", "Overnight from Nashville via Keflavík. Cory is waiting at Terminal 2 arrivals with the van. No trains, no dragging bags."],
      ["MIDDAY", "~20 min", "Into the city.", "One hotel near the center for the night. Check in, exhale."],
      ["AFTERNOON", "Rest", "A real break for Carol.", "Coffee at the hotel, maybe a first look at the lights along Strøget. Nothing else on the clock."],
      ["EVENING", "Christmas Eve", "Dinner with the family.", "Most likely at Cory and Rose's own house, with Rose's grandmother's or her aunt's as the alternatives. In Scandinavia the celebration and the gifts happen tonight. If dinner is in Sweden, the van runs everyone over the bridge, about an hour each way."]
    ],
    note: "Almost everything is closed on the 24th in both countries: shops, museums and Tivoli. The day is built around family and the table, not sights."
  },
  d25: {
    title: "Christmas Day. The crossing is the outing.",
    sub: "Copenhagen → Helsingør → the ferry → Helsingborg.",
    pill: "FRIDAY / CHRISTMAS DAY",
    items: [
      ["MORNING", "No rush", "Late breakfast.", "Tivoli opens again today after its Christmas Eve closure, and the market is a short stroll from the hotel if anyone wants an hour of lights. Then bags to the van.", "https://www.tivoligardens.dk/", "Tivoli ↗"],
      ["MIDDAY", "~50 min", "The coast road to Helsingør.", "Kronborg castle, Hamlet's castle, watches over the harbor where the ferry berths.", "https://www.google.com/maps/search/?api=1&query=Kronborg+Castle", "Kronborg on the map ↗"],
      ["THE CROSSING", "20 min", "The ferry.", "The van boards with everyone in it, Cory's clip card covers the car. Twenty minutes across the strait: coffee or lunch on board, seats by the window, elevators between decks.", "https://www.oresundslinjen.com/timetable", "Ferry timetable ↗"],
      ["AFTERNOON", "Steps away", "Off the ferry, into the hotel.", "The Helsingborg base sits right at the terminal. Check in, then a quiet Christmas afternoon. Family in Landskrona is about 25 minutes away in the van."]
    ],
    note: "Christmas Day closes restaurants and shops in both countries, so meals need a plan: the ferry, the hotel or family. The ferry sails every day, and the holiday timetable gets confirmed closer to the date. The crossing could also move to the 26th, still to choose."
  },
  d26: {
    title: "Sweden wakes up again.",
    sub: "Lund, Malmö, or stay close. Family dinner to finish.",
    pill: "SATURDAY / BOXING DAY",
    items: [
      ["OPTION 1", "~45 min", "Lund.", "The 900-year-old cathedral, cobbled old town and cafés. Mostly flat once there.", "https://www.google.com/maps/search/?api=1&query=Lund+Cathedral", "Lund on the map ↗"],
      ["OPTION 2", "~50 min", "Malmö.", "The old town, the castle grounds and the waterfront under Turning Torso.", "https://www.google.com/maps/search/?api=1&query=Malm%C3%B6", "Malmö on the map ↗"],
      ["OPTION 3", "Stay close", "Helsingborg or Landskrona.", "Helsingborg's harbor walk and old town on foot, or Landskrona's citadel grounds with the family, about 25 minutes in the van."],
      ["EVENING", "Family dinner", "Everyone around the table.", "Over in Landskrona, about 25 minutes each way."]
    ],
    note: "For Kaylan: December 26 opens the rea, Sweden's Boxing Day sales. Malmö and Lund both deliver."
  },
  d27: {
    title: "One slow goodbye.",
    sub: "Breakfast, bags and the bridge to the airport.",
    pill: "SUNDAY / HOME VIA KEFLAVÍK",
    items: [
      ["MORNING", "~09:30", "A civilized start.", "The flight home is at 12:55, so the morning is built backward from that. Breakfast, bags in the van, no rush and no middle-of-the-night alarm."],
      ["THE DRIVE", "~1 hr 10", "Over the bridge to CPH.", "The Øresund Bridge, door to departures. No changes, no stairs."],
      ["AT THE AIRPORT", "By ~10:45", "Time for bags and a breather.", "Aim for Terminal 2 about two hours before the flight."],
      ["FLIGHT", "12:55", "Home via Keflavík.", "FI205 to Keflavík, land 15:25. Then FI825 at 17:10, into Nashville at 18:45 local. Christmas in two countries, done.", "https://www.flightradar24.com/data/flights/fi205", "Track FI205 ↗"]
    ],
    note: "This replaced the old 06:25 departure, so no more 03:30 airport run. Leave times get a final check against traffic the day before."
  }
};

const sourceData = [
  ["Ferry timetable", "https://www.oresundslinjen.com/timetable", "Helsingør–Helsingborg, about 20 minutes. The van boards; holiday timetable confirmed closer to the date."],
  ["Tivoli Gardens", "https://www.tivoligardens.dk/", "Closed on Dec 24, reopens Christmas Day."],
  ["Kronborg castle", "https://www.google.com/maps/search/?api=1&query=Kronborg+Castle", "Hamlet's castle, above the ferry harbor in Helsingør."],
  ["Icelandair flight status", "https://www.icelandair.com/flight-status/", "Official updates for FI204, FI205 and FI825."],
  ["Modern villa, Landskrona", "https://www.airbnb.com/rooms/49067595", "13,947 kr, Dec 24–27. Ground-floor bedroom and shower. Free cancellation to Dec 23."],
  ["Segerhill, Vallåkra", "https://www.airbnb.com/rooms/1256633230226547638", "7,170 kr, Dec 24–27. No ground-floor shower."],
  ["Garden home, Gentofte", "https://www.airbnb.com/rooms/1784753000806627504", "9,377 kr, Dec 24–27. Free cancellation ends Nov 24."],
  ["Ven island house", "https://www.airbnb.com/rooms/1467195354697263515", "18,022 kr, Dec 24–27. Passenger ferry only; beds upstairs and in the basement."]
];

const content = document.getElementById('day-content');
function showDay(day) {
  document.querySelectorAll('.day').forEach(b => {
    const on = b.dataset.day === day;
    b.classList.toggle('active', on);
    b.setAttribute('aria-pressed', String(on));
  });
  const d = days[day];
  content.classList.remove('fade-in');
  content.innerHTML = '<div class="day-header"><div><h3>' + d.title + '</h3><p>' + d.sub + '</p></div><span class="pill">' + d.pill + '</span></div>' +
    d.items.map(i => '<article class="timeline-item"><div class="timeline-time">' + i[0] + '<b>' + i[1] + '</b></div><div class="timeline-body"><h4>' + i[2] + '</h4><p>' + i[3] + '</p>' + (i[4] ? '<a href="' + i[4] + '" target="_blank" rel="noopener noreferrer">' + i[5] + '</a>' : '') + '</div></article>').join('') +
    '<p class="inset-note">' + d.note + '</p>';
  void content.offsetWidth;
  content.classList.add('fade-in');
}
document.querySelectorAll('.day').forEach(b => b.addEventListener('click', () => showDay(b.dataset.day)));
document.getElementById('ferry-link').addEventListener('click', () => {
  showDay('d25');
  document.getElementById('journey').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
});
showDay('d23');

const dialog = document.getElementById('sources');
document.getElementById('source-list').innerHTML = sourceData.map(s => '<div class="source-row"><a href="' + s[1] + '" target="_blank" rel="noopener noreferrer">' + s[0] + ' ↗</a><p>' + s[2] + '</p></div>').join('');
document.getElementById('source-open').addEventListener('click', () => dialog.showModal());
document.getElementById('source-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => {
  if (e.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
  }
});

const wheelsDown = new Date('2026-12-24T11:45:00+01:00').getTime();
const cd = document.getElementById('countdown');
function tick() {
  const diff = wheelsDown - Date.now();
  if (diff <= 0) { cd.innerHTML = '<span class="cd-label">THEY ARE HERE. GOD JUL.</span>'; return; }
  const d = Math.floor(diff / 86400000), h = Math.floor(diff / 3600000) % 24, m = Math.floor(diff / 60000) % 60, s = Math.floor(diff / 1000) % 60;
  cd.innerHTML = '<span class="cd-label">UNTIL WHEELS DOWN AT CPH</span>' +
    '<div class="cd"><b>' + d + '</b><span>DAYS</span></div>' +
    '<div class="cd"><b>' + h + '</b><span>HOURS</span></div>' +
    '<div class="cd"><b>' + m + '</b><span>MIN</span></div>' +
    '<div class="cd"><b>' + s + '</b><span>SEC</span></div>';
}
tick();
setInterval(tick, 1000);
