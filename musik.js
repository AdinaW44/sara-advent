/* ============================================================
   MUSIK IM ADVENTSKALENDER
   Hier legst du fest, welches Türchen welchen Song bekommt.
   Link in Spotify kopieren: Song → Teilen → Link kopieren.
   Funktioniert bei jedem Türchentyp, ein Song pro Türchen.
   Optional: bild: 'bilder/datei.jpg' zeigt ein Foto zum Song.
   Optional: notiz: 'Text' zeigt eine kurze Zeile unter dem Titel.
   ============================================================ */
window.KALENDER_MUSIK = {
  1:  { titel: 'Thunder', kuenstler: 'Imagine Dragons', link: 'https://open.spotify.com/track/1zB4vmk8tFRmM9UULNzbLB' },
  2:  { titel: 'Durch den Monsun', kuenstler: 'Tokio Hotel', link: 'https://open.spotify.com/track/41YOS7VuxHEEwYHLfa7VWM', bild: 'bilder/tokio-hotel-konzert.jpg' },
  3:  { titel: 'Big Jet Plane (Animal Trainer Remix)', kuenstler: 'Jan Blomqvist, Animal Trainer', link: 'https://open.spotify.com/track/3muUPwXeJ4ffC1cSBizE4I' },
  4:  { titel: '079', kuenstler: 'Lo & Leduc', notiz: 'Heitere Open Air, diesen Sommer', link: 'https://open.spotify.com/track/3dfCKQy9JY2ixI58zTeUn9' },
  5:  { titel: 'Die Da!?!', kuenstler: 'Die Fantastischen Vier', link: 'https://open.spotify.com/track/0LFq9xNDSgspBQlmaFfpat' },
  6:  { titel: 'I Adore You', kuenstler: 'HUGEL, Topic, Arash, Daecolm', link: 'https://open.spotify.com/track/5nPbKG04fhLkIAjcPFaZq7', bild: 'bilder/hugel-konzert.jpg' },
  7:  { titel: 'Bring Me To Life', kuenstler: 'Evanescence', link: 'https://open.spotify.com/track/0COqiPhxzoWICwFCS4eZcp' },
  8:  { titel: 'Mexico', kuenstler: 'Mar Malade', link: 'https://open.spotify.com/track/3z6Xfoc4LyHtElmcHmtK2J', bild: 'bilder/mexiko.jpg' },
  9:  { titel: 'Shake It Off', kuenstler: 'Taylor Swift', link: 'https://open.spotify.com/track/0cqRj7pUJDkTCEsJkx8snD' },
  10: { titel: "I'm Not The Only One", kuenstler: 'Sam Smith', link: 'https://open.spotify.com/track/7795WJLVKJoAyVoOtCWqXN', bild: 'bilder/sam-smith-konzert.jpg' },
  11: { titel: 'Einmal um die Welt', kuenstler: 'CRO', link: 'https://open.spotify.com/track/6gQAyT7B7cYGTRBOiFdQUS' },
  12: { titel: "Giselle, Act I: No 4, Giselle's Waltz", kuenstler: 'Adolphe Adam, Robert Irving, Philharmonia Orchestra', link: 'https://open.spotify.com/track/4IA9eWLMoJyJslu030tuxf', bild: 'bilder/budapest-giselle-ballett.jpg' },
  13: { titel: 'Believer', kuenstler: 'Imagine Dragons', link: 'https://open.spotify.com/track/0pqnGHJpmpxLKifKRmU6WP' },
  14: { titel: 'Boulevard of Broken Dreams', kuenstler: 'Green Day', link: 'https://open.spotify.com/track/0U87auHx1iZTEFcq9KVdmO' },
  15: { titel: 'Poetry (Edit)', kuenstler: 'Stella Bossi, Auk.', link: 'https://open.spotify.com/track/5sbW84zLB10R64fqiukiEa' },
  16: { titel: 'If I Could I Would', kuenstler: 'Dirty Doering', link: 'https://open.spotify.com/track/1x20Z90kzwAdj5iyFxwW9w', bild: 'bilder/dirty-doering-festival-selfie.jpg' },
  17: { titel: 'Use My Voice', kuenstler: 'Evanescence', link: 'https://open.spotify.com/track/1iq9l4NaAnrMP52qv5iYva', bild: 'bilder/evanescence-konzert.jpg' },
  18: { titel: 'arschloch', kuenstler: 'LUNA', link: 'https://open.spotify.com/track/0DNAisWcJwei0pu3t8TyMM' },
  19: { titel: "White Horse (Taylor's Version)", kuenstler: 'Taylor Swift', link: 'https://open.spotify.com/track/5YL553x8sHderRBDlm3NM3' },
  20: { titel: 'champagne problems', kuenstler: 'Taylor Swift', link: 'https://open.spotify.com/track/0sY6ZUTh4yoctD8VIXz339' },
  21: { titel: 'Look What You Made Me Do', kuenstler: 'Taylor Swift', link: 'https://open.spotify.com/track/1P17dC1amhFzptugyAO7Il' },
  22: { titel: 'Scheiße baut sich nicht von alleine', kuenstler: 'SDP, 257ers', link: 'https://open.spotify.com/track/4daSAdZjC8W0u4VDVKrsXg' },
  23: { titel: 'Fata Morgana', kuenstler: 'Nina Chuba', link: 'https://open.spotify.com/track/1v1cijv1qjMJ5o9OvMWACS', bild: 'bilder/nina-chuba-festival.jpg' },
  24: { titel: 'Rave Harder Techno Bass', kuenstler: 'Mark Dekoda', link: 'https://open.spotify.com/track/1tkS8yt5NwTZkqFvZMxM0F', bild: 'bilder/mark-dekoda-rave.jpg' }
};

/* Ab hier muss normalerweise nichts geändert werden. */
(function () {
  'use strict';

  var karte = document.getElementById('karte');
  var ziel = document.getElementById('karte-inhalt');
  if (!karte || !ziel) return;

  var stil = document.createElement('style');
  stil.textContent =
    '.musik{margin-top:18px;padding-top:16px;border-top:1.5px dashed var(--karte-linie)}' +
    '.musik-titel{margin:0 0 10px;text-align:center;font-weight:700;color:var(--karte-text-leise)}' +
    '.musik-bild{display:block;width:100%;aspect-ratio:4/3;object-fit:cover;object-position:center 30%;margin:14px 0 0;border-radius:16px}' +
    '.gutschein-bild img{max-height:240px;object-fit:contain;background:var(--karte-flaeche)}' +
    '.musik iframe{display:block;width:100%;height:152px;border:0;border-radius:12px}' +
    '.musik .link-knopf{margin-top:10px}';
  document.head.appendChild(stil);

  function trackId(link) {
    var treffer = /\/track\/([A-Za-z0-9]+)/.exec(link || '');
    return treffer ? treffer[1] : null;
  }

  function musikBauen(song) {
    var box = document.createElement('div');
    box.className = 'musik';

    var titel = document.createElement('p');
    titel.className = 'musik-titel';
    titel.textContent = 'Zusammen live erlebt: ' + song.titel + (song.kuenstler ? ' – ' + song.kuenstler : '');
    box.appendChild(titel);

    if (song.notiz) {
      var notiz = document.createElement('p');
      notiz.className = 'musik-titel';
      notiz.textContent = song.notiz;
      box.appendChild(notiz);
    }

    var id = trackId(song.link);
    if (id) {
      var player = document.createElement('iframe');
      player.src = 'https://open.spotify.com/embed/track/' + id;
      player.title = 'Spotify-Player: ' + song.titel;
      player.loading = 'lazy';
      player.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
      box.appendChild(player);
    }

    var knopf = document.createElement('a');
    knopf.className = 'link-knopf';
    knopf.href = song.link;
    knopf.target = '_blank';
    knopf.rel = 'noopener';
    knopf.textContent = 'In Spotify öffnen';
    box.appendChild(knopf);

    if (song.bild) {
      var foto = document.createElement('img');
      foto.className = 'musik-bild';
      foto.src = song.bild;
      foto.alt = 'Erinnerungsfoto zu ' + song.titel;
      foto.loading = 'lazy';
      box.appendChild(foto);
    }
    return box;
  }

  function musikEinfuegen() {
    if (!karte.open || ziel.querySelector('.musik')) return;
    var chip = ziel.querySelector('.chip');
    var nr = chip ? /Türchen\s+(\d+)/.exec(chip.textContent) : null;
    var song = nr ? window.KALENDER_MUSIK[nr[1]] : null;
    if (song) ziel.appendChild(musikBauen(song));
  }

  new MutationObserver(musikEinfuegen).observe(ziel, { childList: true });
  new MutationObserver(musikEinfuegen).observe(karte, { attributes: true, attributeFilter: ['open'] });

  // Beim Schliessen den Player entfernen, damit die Musik stoppt.
  karte.addEventListener('close', function () {
    var alt = ziel.querySelector('.musik');
    if (alt) alt.remove();
  });
})();
