/* ==========================================================
   INHALTE DES ADVENTSKALENDERS
   Nur diese Datei musst du bearbeiten.

   Typen pro Türchen:
     quiz        – frage, antworten (2–4), richtig (0 = erste Antwort),
                   optional: richtigText, falschText, richtigTitel, falschTitel, hinweis
     botschaft   – text, optional: titel, quelle, zusatz, bild
     zitat       – wie botschaft (nur anderes Label)
     foto        – bild ODER bilder: [...], unterschrift, optional: text, alt,
                   format: 'hochkant'
     screenshot  – wie foto, aber im Handy-Rahmen (für Chat-/App-Screenshots)
     gutschein   – titel, optional: ort, datum, zeit, text, code, gueltig,
                   bild (z. B. Foto/QR-Code des echten Gutscheins),
                   link + linkText (z. B. PDF in gutscheine/ oder Ticket-Link)

   Alles in [eckigen Klammern] sind Platzhalter zum Ersetzen.
   Zeilenumbruch im Text: \n
   ========================================================== */

window.KALENDER = {
  jahr: 2026,
  name: 'Sara',
  titel: 'Saras',
  von: 'Adina',
  grussformel: 'Deine',
  begruessung: 'Liebe Sara, wenn es draussen früh dunkel wird, leuchtet hier jeden Abend ein neues Sternchen für dich – mit Erinnerungen, Rätseln und kleinen Abenteuern zu zweit.',
  fusszeile: 'Ein Sternchen pro Tag, bis Heiligabend',

  // Zum Testen einen Tag erzwingen (z. B. 12). Vor dem Verschenken auf null lassen!
  // Alternativ im Browser: index.html?tag=12
  testTag: null,

  tueren: {
    1: {
      typ: 'botschaft',
      titel: 'Willkommen im Feenwald',
      text: 'Ab heute gibt es 24 Tage lang jeden Tag ein kleines Stück Zauber – nur für dich.',
      zusatz: 'Tipp: Speichere dir die Seite auf dem Homescreen, dann ist dein Kalender immer nur einen Fingertipp entfernt.'
    },

    2: {
      typ: 'quiz',
      frage: 'Wo haben wir uns zum ersten Mal getroffen?',
      antworten: ['Auf einem Festival', 'Beim Probetanzkurs in Horgen', 'In der Bakery Bakery am Zürich HB', 'Im Zug nach Zug'],
      richtig: 1,
      richtigText: 'Genau! Beim Probetanzkurs in Horgen hat alles angefangen.',
      falschText: 'Fast! Angefangen hat alles beim Probetanzkurs in Horgen.'
    },

    3: {
      typ: 'foto',
      bild: 'bilder/flughafen-warten.jpg',
      unterschrift: 'Warten am Flughafen: So fängt jedes unserer Abenteuer an'
    },

    4: {
      typ: 'gutschein',
      titel: 'Kaffee in Basel',
      ort: 'Kaffeemacher Café, Bahnhof SBB, oder Café frühling',
      datum: 'Wann du magst',
      text: 'Kaffee oder was du magst: Bei deiner nächsten Ankunft in Basel geht ein Getränk auf mich.',
      code: 'Im Päckli',
      bild: 'gutscheine/kaffeemacher.jpg',
      alt: 'Foto des Gutscheins'
    },

    5: {
      typ: 'quiz',
      frage: 'Womit wird Matcha traditionell schaumig aufgeschlagen?',
      antworten: ['Mit einem Milchaufschäumer', 'Mit einem Bambusbesen (Chasen)', 'Mit einer Gabel', 'Mit einem Schneebesen aus Silber'],
      richtig: 1,
      richtigText: 'Der Chasen aus Bambus macht den perfekten Schaum – Matcha-Profi!',
      falschText: 'Traditionell nimmt man den Chasen, einen feinen Bambusbesen.'
    },

    6: {
      typ: 'botschaft',
      titel: 'Nikolaustag',
      text: 'Wenn der Nikolaus wüsste, wie viel Glitzer du in mein Leben bringst, hätte er dir den ganzen Sack dagelassen.'
    },

    7: {
      typ: 'foto',
      bild: 'bilder/strand-sonnenuntergang.jpg',
      unterschrift: 'Unser sexy Fotoshooting am Strand von Phuket'
    },

    8: {
      typ: 'quiz',
      frage: 'Aus welchem Land stammt die Bachata?',
      antworten: ['Kuba', 'Kolumbien', 'Dominikanische Republik', 'Puerto Rico'],
      richtig: 2,
      richtigText: 'Genau – die Bachata kommt aus der Dominikanischen Republik.',
      falschText: 'Die Bachata stammt aus der Dominikanischen Republik.'
    },

    9: {
      typ: 'botschaft',
      text: 'Du tanzt durchs Leben, als hätte jemand die Musik extra für dich aufgelegt.'
    },

    10: {
      typ: 'gutschein',
      titel: 'Strick- und Häkelnachmittag',
      ort: 'Bei mir oder bei dir',
      datum: 'Ein gemütlicher Sonntag',
      text: 'Wolle, Tee, Kerzen – und du zeigst mir endlich, wie das mit den Maschen geht.'
    },

    11: {
      typ: 'foto',
      bilder: ['bilder/sizilien-souvenirstand.jpg', 'bilder/felseninsel-ausflug.jpg'],
      unterschrift: 'Einmal um die Welt: Mittagessen auf dem Markt in Sizilien und die James-Bond-Insel in Thailand'
    },

    12: {
      typ: 'gutschein',
      titel: 'Grosses Läckerli',
      ort: 'Läckerli Huus, Basel SBB',
      datum: 'Wann du magst',
      text: 'Ein grosses Läckerli für den kleinen süssen Hunger zwischendurch.',
      code: 'Im Päckli',
      bild: 'gutscheine/laeckerli-huus.jpg',
      alt: 'Foto des Gutscheins'
    },

    13: {
      typ: 'botschaft',
      titel: 'Halbzeit fast geschafft',
      text: 'Kleiner Reminder: Du bist mutig, warmherzig und ziemlich magisch.'
    },

    14: {
      typ: 'foto',
      bild: 'bilder/festival-riesenrad.jpg',
      format: 'hochkant',
      unterschrift: 'Neue Musik entdecken auf dem coolsten neuen Festival, das wir dieses Jahr erlebt haben'
    },

    15: {
      typ: 'gutschein',
      titel: 'Pizza für die Heimfahrt',
      ort: 'Vito, Bahnhof Zürich oder Basel',
      datum: 'Wann du magst',
      text: 'Falls du auf der Heimfahrt mal hungrig wirst: Diese Pizza geht auf mich.',
      code: 'Im Päckli',
      bild: 'gutscheine/vito.jpg',
      alt: 'Foto des Gutscheins'
    },

    16: {
      typ: 'quiz',
      frage: 'In welcher Stadt bekam die Salsa in den 1960er- und 70er-Jahren ihren Namen und typischen Sound?',
      antworten: ['Havanna', 'New York', 'Miami', 'Cali'],
      richtig: 1,
      richtigText: 'Genau – in New York, mit Musikerinnen und Musikern aus Kuba und Puerto Rico.',
      falschText: 'Es war New York – dort mischten Musikerinnen und Musiker aus Kuba und Puerto Rico ihre Klänge.'
    },

    17: {
      typ: 'botschaft',
      titel: 'Aus voller Kehle',
      text: 'Neben dir singe ich jedes Konzert laut mit, ganz egal, wie schief es klingt.'
    },

    18: {
      typ: 'botschaft',
      text: 'Für alle Tage, an denen jemand so richtig nervt: Dreh diesen Song auf und ruf mich an.'
    },

    19: {
      typ: 'quiz',
      frage: 'Wie heisst die kleine Fee aus «Peter Pan»?',
      antworten: ['Titania', 'Tinker Bell', 'Morgana', 'Flora'],
      richtig: 1,
      richtigText: 'Tinker Bell – aber unter uns: Du glitzerst mehr.',
      falschText: 'Es ist Tinker Bell. Aber du glitzerst trotzdem mehr.'
    },

    20: {
      typ: 'botschaft',
      text: 'Danke, dass du immer weisst, wann es Zeit für ein Konzert, eine Umarmung oder einen Drink ist.'
    },

    21: {
      typ: 'gutschein',
      titel: 'Noch ein Kaffee',
      ort: 'Kaffeemacher Café, Bahnhof SBB, oder Café frühling',
      datum: 'Wann du magst',
      text: 'Weil einer nie reicht: Hier kommt das zweite Getränk.',
      code: 'Im Päckli',
      bild: 'gutscheine/kaffeemacher.jpg',
      alt: 'Foto des Gutscheins'
    },

    22: {
      typ: 'foto',
      bild: 'bilder/strand-grimassen.jpg',
      unterschrift: 'Grimassen am Strand von Phuket'
    },

    23: {
      typ: 'botschaft',
      titel: 'Nur noch einmal schlafen',
      text: 'Morgen wartet das grösste Türchen auf dich. Schlaf gut, kleine Fee.'
    },

    24: {
      typ: 'gutschein',
      titel: 'Dein süsses Finale',
      ort: 'Bakery Bakery, Bahnhof Zürich oder Basel',
      datum: 'Wann du magst',
      text: 'Frohe Weihnachten, liebe Sara! Such dir aus, was du am liebsten magst. Es geht auf mich.',
      code: 'Im Päckli',
      bild: 'gutscheine/bakery-bakery.jpg',
      alt: 'Foto des Gutscheins'
    }
  }
};
