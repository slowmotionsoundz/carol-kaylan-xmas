/* ==========================================================================
   TRIP CONFIG - edit this block to reuse the booklet for another journey.
   Everything below the config renders and animates itself.
   ========================================================================== */
var TRIP = {
  start: '2026-12-23T00:00:00+01:00',
  end:   '2026-12-27T23:59:59+01:00',
  stops: [
    { mode: 'Arrival',  name: 'Copenhagen Airport', when: 'Dec 23', detail: 'Carol and Kaylan land from Huntsville. Cory meets them at arrivals with the van - no trains, no transfers, bags straight in.' },
    { mode: 'Van \u00b7 ~20 min', name: 'Copenhagen', when: 'Dec 23-24', detail: 'Two nights at one hotel in the city, near Tivoli. Christmas market on the first evening, everything close and flat.' },
    { mode: 'Van \u00b7 ~50 min', name: 'Helsing\u00f8r', when: 'Dec 25', detail: 'Up the coast road past Louisiana to Helsing\u00f8r, where Kronborg castle - Hamlet\u2019s castle - stands over the harbor.' },
    { mode: 'Ferry \u00b7 20 min', name: 'The \u00d8resund crossing', when: 'Dec 25', detail: 'The van boards the \u00d8resundslinjen ferry - Cory\u2019s clip card covers the car. Coffee on deck while Sweden appears ahead. Elevators between decks, seats by the window.' },
    { mode: 'Steps away', name: 'Helsingborg', when: 'Dec 25-27', detail: 'Land in Sweden and the hotel is right at the terminal - one hotel for both Swedish nights. Family in Landskrona is ~25 minutes away in the van; on the 27th the van runs door to departures at CPH (~1 hr 10 over the bridge).' }
  ]
};
/* ========================================================================== */

(function(){
  // ---- journey route strip ----
  var route = document.getElementById('route');
  var detail = document.getElementById('route-detail');
  if (route && detail) {
    TRIP.stops.forEach(function(s, i){
      var b = document.createElement('button');
      b.className = 'stop' + (i === 0 ? ' active' : '');
      b.type = 'button';
      b.innerHTML = '<span class="mode">' + s.mode + '</span><span class="name">' + s.name + '</span><span class="when">' + s.when + '</span>';
      b.addEventListener('click', function(){
        route.querySelectorAll('.stop').forEach(function(x){ x.classList.remove('active'); });
        b.classList.add('active');
        detail.innerHTML = '<b>' + s.name + ' · ' + s.when + '.</b> ' + s.detail;
      });
      route.appendChild(b);
    });
    var s0 = TRIP.stops[0];
    detail.innerHTML = '<b>' + s0.name + ' · ' + s0.when + '.</b> ' + s0.detail;
  }

  // ---- countdown / trip status ----
  var cd = document.getElementById('countdown');
  var start = new Date(TRIP.start), end = new Date(TRIP.end);
  function tick(){
    var now = new Date();
    if (!cd) return;
    if (now < start) {
      var ms = start - now;
      var d = Math.floor(ms / 86400000);
      var h = Math.floor(ms % 86400000 / 3600000);
      var m = Math.floor(ms % 3600000 / 60000);
      cd.innerHTML = '<span class="lbl">Until Carol &amp; Kaylan land</span>' +
        d + (d === 1 ? ' day ' : ' days ') + h + ' hours ' + m + ' minutes';
      document.querySelectorAll('.today-tag').forEach(function(t){ t.classList.remove('on'); });
    } else if (now <= end) {
      var dayNum = Math.floor((now - start) / 86400000) + 1;
      var names = ['Arrival in Copenhagen','Christmas Eve','The crossing','Sweden day','Homeward'];
      cd.innerHTML = '<span class="lbl">Right now</span>Day ' + dayNum + ' of 5 · ' + names[dayNum-1];
      document.querySelectorAll('.today-tag').forEach(function(t){
        t.classList.toggle('on', now.getDate() === +t.getAttribute('data-day') && now.getMonth() === 11);
      });
    } else {
      cd.innerHTML = '<span class="lbl">Christmas 2026</span>What a trip it was.';
      document.querySelectorAll('.today-tag').forEach(function(t){ t.classList.remove('on'); });
    }
  }
  tick(); setInterval(tick, 30000);

  // ---- scroll reveal ----
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  // ---- nav: solid after cover + progress bar ----
  var nav = document.getElementById('topnav');
  var prog = document.getElementById('progress');
  var cover = document.getElementById('cover');
  function onScroll(){
    var y = window.scrollY;
    nav.classList.toggle('solid', y > (cover.offsetHeight - 80));
    var h = document.documentElement.scrollHeight - window.innerHeight;
    prog.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // ---- accordion: close others ----
  document.querySelectorAll('#accordion details').forEach(function(d){
    d.addEventListener('toggle', function(){
      if (d.open) document.querySelectorAll('#accordion details').forEach(function(o){ if (o !== d) o.open = false; });
    });
  });
})();
