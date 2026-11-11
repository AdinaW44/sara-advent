/* ==========================================================
   Adventskalender – Logik
   Inhalte werden in inhalt.js gepflegt, hier muss man
   normalerweise nichts ändern.
   ========================================================== */
(function () {
  'use strict';

  var K = window.KALENDER || {};
  var TUEREN = K.tueren || {};
  var JAHR = K.jahr || new Date().getFullYear();
  var SPEICHER_KEY = 'adventskalender-' + JAHR + '-' + (K.name || 'gast').toLowerCase();

  /* Anordnung im Raster: [Spalte, Zeile, Breite, Höhe, Tag]
     4 Spalten × 10 Zeilen, unregelmässige Reihenfolge. */
  var LAYOUT = [
    [1, 1, 2, 2, 24], [3, 1, 1, 1, 7], [4, 1, 1, 2, 13], [3, 2, 1, 1, 2],
    [1, 3, 2, 1, 18], [3, 3, 1, 1, 5], [4, 3, 1, 1, 21], [1, 4, 1, 1, 10],
    [2, 4, 1, 2, 3], [3, 4, 2, 2, 15], [1, 5, 1, 1, 22], [1, 6, 2, 1, 1],
    [3, 6, 2, 1, 9], [1, 7, 1, 2, 16], [2, 7, 1, 1, 4], [3, 7, 2, 1, 12],
    [2, 8, 1, 1, 20], [3, 8, 1, 1, 8], [4, 8, 1, 1, 11], [1, 9, 2, 1, 6],
    [3, 9, 1, 2, 19], [4, 9, 1, 1, 14], [1, 10, 2, 1, 23], [4, 10, 1, 1, 17]
  ];
  var RADIEN = ['22px', '16px 26px 16px 26px', '26px 16px 26px 16px', '20px'];
  var FLAECHEN = ['rgba(255,194,216,.14)', 'rgba(255,255,255,.08)', 'rgba(255,194,216,.22)', 'rgba(255,255,255,.12)'];

  /* ---------- Icons ---------- */
  var ICON = {
    schloss: '<path d="M8 11V8a4 4 0 0 1 8 0v3"/><rect x="5" y="11" width="14" height="10" rx="2"/>',
    haken: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    kreuz: '<path d="M7 7l10 10M17 7L7 17"/>',
    stern: '<path d="M12 2 L13.8 10.2 L22 12 L13.8 13.8 L12 22 L10.2 13.8 L2 12 L10.2 10.2 Z"/>',
    quiz: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6"/><path d="M12 17h.01"/>',
    herz: '<path d="M12 20s-7-4.4-8.8-8.6C1.8 8 4 5 7 5c2 0 3.4 1 5 2.8C13.6 6 15 5 17 5c3 0 5.2 3 3.8 6.4C19 15.6 12 20 12 20z"/>',
    kamera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
    ticket: '<path d="M3 8a2 2 0 0 0 0 4v0a2 2 0 0 1 0 4v2h18v-2a2 2 0 0 1 0-4 2 2 0 0 1 0-4V6H3z"/><path d="M14 6v12" stroke-dasharray="2 2"/>',
    ort: '<path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z"/><circle cx="12" cy="10" r="2.2"/>',
    kalender: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>',
    uhr: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    link: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    anfuehrung: '<path d="M4 22c0-7 3-12 9-14l1 3c-3 1.5-4.5 4-4.5 6H14v9H4zM20 22c0-7 3-12 9-14l1 3c-3 1.5-4.5 4-4.5 6H30v9H20z"/>'
  };
  function svg(name, opts) {
    opts = opts || {};
    var gefuellt = name === 'stern' || name === 'anfuehrung' || opts.fill;
    var box = name === 'anfuehrung' ? '0 0 34 30' : '0 0 24 24';
    return '<svg class="' + (opts.cls || '') + '" viewBox="' + box + '" aria-hidden="true" ' +
      (gefuellt ? 'fill="currentColor"' : 'fill="none" stroke="currentColor" stroke-width="' + (opts.sw || 2) + '" stroke-linecap="round" stroke-linejoin="round"') +
      '>' + ICON[name] + '</svg>';
  }

  /* ---------- kleine DOM-Hilfe ---------- */
  function el(tag, attrs, kinder) {
    var e = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v === null || v === undefined || v === false) return;
        if (k === 'text') e.textContent = v;
        else if (k === 'html') e.innerHTML = v;
        else if (k === 'class') e.className = v;
        else if (k.indexOf('on') === 0) e.addEventListener(k.slice(2), v);
        else e.setAttribute(k, v === true ? '' : v);
      });
    }
    (kinder || []).forEach(function (c) {
      if (c === null || c === undefined || c === false) return;
      e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return e;
  }

  /* ---------- Speicher (geöffnete Türchen, Quiz-Antworten) ---------- */
  function laden() {
    try {
      var s = JSON.parse(localStorage.getItem(SPEICHER_KEY) || '{}');
      return { offen: s.offen || [], quiz: s.quiz || {} };
    } catch (e) { return { offen: [], quiz: {} }; }
  }
  function speichern() {
    try { localStorage.setItem(SPEICHER_KEY, JSON.stringify(zustand)); } catch (e) { /* privat-Modus: egal */ }
  }

  var params = new URLSearchParams(location.search);
  if (params.has('reset')) {
    try { localStorage.removeItem(SPEICHER_KEY); } catch (e) {}
  }
  var zustand = laden();

  /* ---------- Welcher Tag ist heute? ---------- */
  function ermittleHeute() {
    var vorschau = null;
    if (params.has('tag')) vorschau = parseInt(params.get('tag'), 10);
    else if (K.testTag) vorschau = K.testTag;
    if (vorschau !== null && !isNaN(vorschau)) {
      return { tag: Math.max(0, Math.min(25, vorschau)), vorschau: true, bisStart: vorschau < 1 ? 1 : 0 };
    }
    var jetzt = new Date();
    var start = new Date(JAHR, 11, 1);
    if (jetzt < start) {
      var heuteMitternacht = new Date(jetzt.getFullYear(), jetzt.getMonth(), jetzt.getDate());
      var tage = Math.round((start - heuteMitternacht) / 86400000);
      return { tag: 0, vorschau: false, bisStart: tage };
    }
    if (jetzt.getFullYear() > JAHR) return { tag: 25, vorschau: false, bisStart: 0 };
    return { tag: Math.min(jetzt.getDate(), 25), vorschau: false, bisStart: 0 };
  }
  var HEUTE = ermittleHeute();

  function istOffen(tag) { return zustand.offen.indexOf(tag) !== -1; }
  function zustandVon(tag) {
    if (tag > HEUTE.tag) return 'gesperrt';
    if (istOffen(tag)) return 'offen';
    if (tag === HEUTE.tag) return 'heute';
    return 'nachholen';
  }

  /* ---------- Kopfbereich ---------- */
  function kopfFuellen() {
    var titel = K.titel || ((K.name || 'Mein') + 's');
    document.getElementById('titel-name').textContent = titel;
    document.title = titel + ' Adventskalender';
    document.getElementById('gruss').textContent = K.begruessung || '';
    document.getElementById('signatur').textContent = K.von ? (K.grussformel || 'Deine') + ' ' + K.von : '';
    if (K.fusszeile) document.getElementById('fuss').textContent = K.fusszeile;

    var label = document.getElementById('stat-heute-label');
    var wert = document.getElementById('stat-heute');
    if (HEUTE.tag === 0) {
      label.textContent = 'Start';
      wert.textContent = HEUTE.bisStart === 1 ? 'morgen' : 'in ' + HEUTE.bisStart + ' Tagen';
    } else if (HEUTE.tag >= 25) {
      label.textContent = 'Heute';
      wert.textContent = 'Frohe Weihnachten';
    } else {
      label.textContent = 'Heute';
      wert.textContent = HEUTE.tag + '. Dezember';
    }
    document.getElementById('stat-offen').textContent = zustand.offen.length + ' von 24';

    var vh = document.getElementById('vorschau-hinweis');
    if (HEUTE.vorschau) {
      vh.hidden = false;
      vh.textContent = 'Vorschau: simuliert wird der ' + HEUTE.tag + '. Dezember';
    }
  }

  /* ---------- Raster ---------- */
  function rasterZeichnen() {
    var raster = document.getElementById('raster');
    raster.textContent = '';
    LAYOUT.forEach(function (p, i) {
      var tag = p[4];
      var gross = p[2] === 2 && p[3] === 2;
      var mittel = !gross && (p[2] === 2 || p[3] === 2);
      var z = zustandVon(tag);
      var labels = {
        gesperrt: 'noch verschlossen',
        heute: 'heute öffnen',
        nachholen: 'jetzt öffnen',
        offen: 'bereits geöffnet, nochmals ansehen'
      };
      var inner = '<span class="nr">' + tag + '</span>';
      if (z === 'gesperrt') inner += svg('schloss', { cls: 'symbol' });
      if (z === 'offen') inner += svg('haken', { cls: 'symbol', sw: 2.4 });
      if (z === 'heute') inner += '<span class="label">Heute</span>' + svg('stern', { cls: 'stern stern-1' }) + svg('stern', { cls: 'stern stern-2' });
      if (z === 'nachholen') inner += '<span class="label">wartet</span>';

      var btn = el('button', {
        type: 'button',
        class: 'tuer ist-' + z + (gross ? ' gr-gross' : mittel ? ' gr-mittel' : ''),
        'data-tag': tag,
        'aria-label': 'Türchen ' + tag + ', ' + labels[z],
        html: inner
      });
      btn.style.gridColumn = p[0] + ' / span ' + p[2];
      btn.style.gridRow = p[1] + ' / span ' + p[3];
      btn.style.borderRadius = gross ? '32px' : RADIEN[i % 4];
      if (z === 'gesperrt') btn.style.background = FLAECHEN[i % 4];
      btn.addEventListener('click', function () { tuerAntippen(tag, btn); });
      raster.appendChild(btn);
    });
  }

  /* ---------- Dialoge ---------- */
  var karte = document.getElementById('karte');
  var hinweis = document.getElementById('hinweis');
  var zuletztFokus = null;

  function oeffneDialog(d) {
    zuletztFokus = document.activeElement;
    document.documentElement.classList.add('dialog-offen');
    if (typeof d.showModal === 'function') d.showModal();
    else d.setAttribute('open', '');
  }
  function schliesseDialog(d) {
    if (typeof d.close === 'function') d.close();
    else d.removeAttribute('open');
  }
  [karte, hinweis].forEach(function (d) {
    d.addEventListener('close', function () {
      document.documentElement.classList.remove('dialog-offen');
      if (zuletztFokus) {
        var tag = zuletztFokus.getAttribute && zuletztFokus.getAttribute('data-tag');
        var ziel = tag ? document.querySelector('.tuer[data-tag="' + tag + '"]') : zuletztFokus;
        if (ziel) ziel.focus({ preventScroll: true });
      }
    });
    d.addEventListener('click', function (e) {
      if (e.target === d) schliesseDialog(d); // Klick auf den Hintergrund
      if (e.target.closest && e.target.closest('[data-schliessen]')) schliesseDialog(d);
    });
  });

  function tuerAntippen(tag, btn) {
    if (tag > HEUTE.tag) return zuFrueh(tag);
    var neu = !istOffen(tag);
    if (neu) {
      zustand.offen.push(tag);
      speichern();
    }
    karteZeigen(tag, neu);
    rasterZeichnen();
    kopfFuellen();
  }

  /* ---------- Hinweis: zu früh ---------- */
  var HINWEISE = K.zuFruehTexte || [
    { titel: 'Psst, noch nicht!', text: 'Dieses Türchen schläft noch tief und fest im Feenstaub.' },
    { titel: 'Geduld, kleine Fee', text: 'Hier wird noch heimlich gezaubert. Bis dahin: ein Matcha und eine Runde Bachata?' },
    { titel: 'Nicht schummeln!', text: 'Die Sterne haben dieses Türchen noch fest verschlossen.' }
  ];
  function zuFrueh(tag) {
    var h = HINWEISE[tag % HINWEISE.length];
    var tage = tag - HEUTE.tag;
    document.getElementById('hinweis-titel').textContent = h.titel;
    document.getElementById('hinweis-text').textContent = h.text + ' Türchen ' + tag + ' öffnet sich am ' + tag + '. Dezember.';
    document.getElementById('hinweis-countdown').textContent = HEUTE.tag === 0
      ? 'Noch ' + (HEUTE.bisStart + tag - 1) + ' Tage'
      : (tage === 1 ? 'Morgen ist es so weit' : 'Noch ' + tage + ' Tage');
    oeffneDialog(hinweis);
  }

  /* ---------- Karte: Inhalt je nach Typ ---------- */
  var TYPEN = {
    quiz: { label: 'Quiz', icon: 'quiz' },
    botschaft: { label: 'Botschaft', icon: 'herz' },
    zitat: { label: 'Zitat', icon: 'herz' },
    foto: { label: 'Erinnerung', icon: 'kamera' },
    screenshot: { label: 'Erinnerung', icon: 'kamera' },
    gutschein: { label: 'Gutschein', icon: 'ticket' }
  };

  function karteZeigen(tag, neu) {
    var inhalt = TUEREN[tag] || { typ: 'botschaft', text: 'Hier versteckt sich bald etwas Schönes …' };
    var typ = TYPEN[inhalt.typ] ? inhalt.typ : 'botschaft';
    var info = TYPEN[typ];
    var ziel = document.getElementById('karte-inhalt');
    ziel.textContent = '';

    ziel.appendChild(el('div', { class: 'karte-kopf' }, [
      el('span', { class: 'chip', html: svg('stern') + ' Türchen ' + tag }),
      el('span', { class: 'chip chip-typ', html: svg(info.icon) + ' ' + (inhalt.label || info.label) })
    ]));

    var bauer = { quiz: baueQuiz, botschaft: baueBotschaft, zitat: baueBotschaft, foto: baueFoto, screenshot: baueFoto, gutschein: baueGutschein }[typ];
    ziel.appendChild(bauer(inhalt, tag));

    oeffneDialog(karte);
    document.getElementById('karte-innen').scrollTop = 0;
    if (neu) funken();
  }

  function baueQuiz(q, tag) {
    var box = el('div', { class: 'quiz' });
    box.appendChild(el('h2', { id: 'karte-titel', text: q.frage || 'Frage' }));
    if (q.hinweis) box.appendChild(el('p', { class: 'fliess', text: q.hinweis, style: 'margin-bottom:12px;color:var(--karte-text-leise)' }));

    var liste = el('div', { class: 'antworten', role: 'group', 'aria-label': 'Antworten' });
    var feedback = el('div', { class: 'feedback', 'aria-live': 'polite' });
    var antworten = q.antworten || [];
    var richtig = typeof q.richtig === 'number' ? q.richtig : 0;
    var knoepfe = antworten.map(function (a, i) {
      var b = el('button', {
        type: 'button',
        class: 'antwort',
        onclick: function () { waehlen(i); }
      }, [
        el('span', { class: 'buchstabe', text: String.fromCharCode(65 + i) }),
        el('span', { class: 'antwort-text', text: a }),
        el('span', { class: 'ergebnis' })
      ]);
      liste.appendChild(b);
      return b;
    });

    function zeigen(i) {
      knoepfe.forEach(function (b, j) {
        b.disabled = true;
        var erg = b.querySelector('.ergebnis');
        if (j === richtig) { b.classList.add('richtig'); erg.innerHTML = svg('haken', { sw: 2.6 }); b.setAttribute('aria-label', antworten[j] + ' – richtige Antwort'); }
        else if (j === i) { b.classList.add('falsch'); erg.innerHTML = svg('kreuz', { sw: 2.6 }); b.setAttribute('aria-label', antworten[j] + ' – deine Antwort, leider falsch'); }
        else b.classList.add('gedimmt');
      });
      var ok = i === richtig;
      feedback.className = 'feedback ' + (ok ? 'ist-richtig' : 'ist-falsch');
      feedback.textContent = '';
      feedback.appendChild(el('strong', { text: ok ? (q.richtigTitel || 'Richtig!') : (q.falschTitel || 'Knapp daneben') }));
      feedback.appendChild(document.createTextNode(ok
        ? (q.richtigText || 'Du kennst uns einfach.')
        : (q.falschText || 'Richtig wäre: ' + antworten[richtig] + '.')));
    }
    function waehlen(i) {
      zustand.quiz[tag] = i;
      speichern();
      zeigen(i);
    }

    box.appendChild(liste);
    box.appendChild(feedback);
    if (typeof zustand.quiz[tag] === 'number') zeigen(zustand.quiz[tag]);
    return box;
  }

  function baueBotschaft(b) {
    var box = el('div', { class: 'botschaft' });
    box.innerHTML = svg('anfuehrung', { cls: 'anfuehrung' });
    if (b.titel) box.appendChild(el('h2', { id: 'karte-titel', text: b.titel }));
    box.appendChild(el('p', { class: 'botschaft-text', id: b.titel ? null : 'karte-titel', text: b.text || '' }));
    if (b.quelle) box.appendChild(el('p', { class: 'quelle', text: '– ' + b.quelle }));
    if (b.zusatz) box.appendChild(el('p', { class: 'zusatz fliess', text: b.zusatz }));
    if (b.bild) box.appendChild(el('div', { class: 'gutschein-bild' }, [bild(b.bild, b.alt || '')]));
    return box;
  }

  function bild(src, alt) {
    var img = el('img', { src: src, alt: alt || '', loading: 'lazy', decoding: 'async' });
    img.addEventListener('error', function () {
      var ersatz = el('div', { class: 'bild-fehlt', text: 'Bild nicht gefunden: ' + src });
      img.replaceWith(ersatz);
    });
    return img;
  }

  function baueFoto(f) {
    var box = el('div', { class: 'foto' });
    var liste = f.bilder || (f.bild ? [f.bild] : []);
    var handy = f.typ === 'screenshot' || f.rahmen === 'handy';
    var galerie = el('div', { class: 'galerie' });
    liste.forEach(function (eintrag, i) {
      var src = typeof eintrag === 'string' ? eintrag : eintrag.src;
      var alt = typeof eintrag === 'string' ? (f.alt || f.unterschrift || '') : (eintrag.alt || '');
      var rahmen = el('div', { class: handy ? 'rahmen-handy' : 'rahmen-foto' + (f.format === 'hochkant' ? ' hochkant' : '') }, [bild(src, alt)]);
      galerie.appendChild(el('figure', { 'aria-label': 'Bild ' + (i + 1) + ' von ' + liste.length }, [rahmen]));
    });
    box.appendChild(galerie);

    if (liste.length > 1) {
      var punkte = el('div', { class: 'punkte', 'aria-hidden': 'true' });
      liste.forEach(function (_, i) { punkte.appendChild(el('span', { class: i === 0 ? 'aktiv' : '' })); });
      galerie.addEventListener('scroll', function () {
        var schritt = (galerie.firstChild ? galerie.firstChild.offsetWidth : galerie.clientWidth) + 12;
        var idx = Math.round(galerie.scrollLeft / schritt);
        Array.prototype.forEach.call(punkte.children, function (p, j) { p.className = j === idx ? 'aktiv' : ''; });
      }, { passive: true });
      box.appendChild(punkte);
    }
    box.appendChild(el('h2', { class: 'bildunterschrift', id: 'karte-titel', text: f.unterschrift || 'Erinnerung' }));
    if (f.text) box.appendChild(el('p', { class: 'bildtext', text: f.text }));
    return box;
  }

  function baueGutschein(g, tag) {
    var box = el('div', { class: 'gutschein' });
    var fakten = el('ul', { class: 'ticket-fakten' });
    if (g.ort) fakten.appendChild(el('li', { html: svg('ort') }, [g.ort]));
    if (g.datum) fakten.appendChild(el('li', { html: svg('kalender') }, [g.datum]));
    if (g.zeit) fakten.appendChild(el('li', { html: svg('uhr') }, [g.zeit]));

    var ticket = el('div', { class: 'ticket' }, [
      el('div', { class: 'ticket-haupt' }, [
        el('span', { class: 'ticket-label', html: svg('stern') + ' Gutschein' }),
        el('h2', { class: 'ticket-titel', id: 'karte-titel', text: g.titel || 'Gutschein' }),
        fakten.children.length ? fakten : null,
        g.text ? el('p', { class: 'ticket-text', text: g.text }) : null
      ]),
      el('div', { class: 'ticket-abriss' }, [
        el('span', { text: 'Nr. ' + (tag < 10 ? '0' + tag : tag) + (g.gueltig ? ' · gültig ' + g.gueltig : '') }),
        g.code ? el('span', { class: 'ticket-code', text: g.code }) : el('span', { text: 'Einlösbar bei ' + (K.von || 'mir') })
      ])
    ]);
    box.appendChild(ticket);

    if (g.bild) box.appendChild(el('div', { class: 'gutschein-bild' }, [bild(g.bild, g.alt || 'Gutschein')]));
    if (g.link) {
      box.appendChild(el('a', {
        class: 'link-knopf',
        href: g.link,
        target: '_blank',
        rel: 'noopener',
        html: svg('link') + '<span></span>'
      }));
      box.lastChild.querySelector('span').textContent = g.linkText || 'Gutschein öffnen';
    }
    return box;
  }

  /* ---------- Funken beim ersten Öffnen ---------- */
  function funken() {
    var innen = document.getElementById('karte-innen');
    for (var i = 0; i < 12; i++) {
      var f = el('span', { class: 'funke', html: svg('stern') });
      var winkel = (Math.PI * 2 * i) / 12;
      var weite = 70 + Math.random() * 60;
      f.style.left = '50%';
      f.style.top = '60px';
      f.style.setProperty('--dx', Math.cos(winkel) * weite + 'px');
      f.style.setProperty('--dy', Math.sin(winkel) * weite + 'px');
      f.style.color = i % 3 === 0 ? '#B9862E' : i % 3 === 1 ? '#F28DB3' : '#E0B25A';
      f.style.animationDelay = (Math.random() * 0.15) + 's';
      innen.appendChild(f);
      setTimeout(function (n) { n.remove(); }.bind(null, f), 1400);
    }
  }

  /* ---------- Sternenhimmel ---------- */
  function himmelZeichnen() {
    var h = document.getElementById('himmel');
    var punkte = '';
    var farben = ['#FFFFFF', '#FFFFFF', '#F0CF85', '#FFC2D8'];
    var seed = 7;
    function zufall() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
    for (var i = 0; i < 70; i++) {
      var x = (zufall() * 100).toFixed(2), y = (zufall() * 100).toFixed(2);
      var r = (0.6 + zufall() * 1.1).toFixed(2);
      var funkelt = i % 4 === 0;
      punkte += '<circle ' + (funkelt ? 'class="s" style="animation-delay:' + (zufall() * 3).toFixed(2) + 's" ' : '') +
        'cx="' + x + '%" cy="' + y + '%" r="' + r + '" fill="' + farben[i % 4] + '" opacity="' + (0.5 + zufall() * 0.5).toFixed(2) + '"/>';
    }
    h.insertAdjacentHTML('beforeend', '<svg xmlns="http://www.w3.org/2000/svg">' + punkte + '</svg>');
  }

  /* ---------- Start ---------- */
  himmelZeichnen();
  kopfFuellen();
  rasterZeichnen();

  // Direktlink auf ein Türchen, z. B. index.html#tag-5
  var m = location.hash.match(/^#tag-(\d{1,2})$/);
  if (m) {
    var t = parseInt(m[1], 10);
    if (t >= 1 && t <= 24) tuerAntippen(t);
  }
})();
