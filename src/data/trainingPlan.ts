export interface Exercise {
  id: string;
  number: number;
  name: string;
  tip?: string;
  sets: string;
}

export interface WarmupItem {
  text: string;
}

export interface CardioRound {
  label: string;
  description: string;
}

export interface CardioSection {
  title: string;
  rounds: CardioRound[];
}

export interface RestDay {
  type: "rest";
  description: string;
  options: { title: string; items: string[] }[];
  note: string;
}

export interface TrainingDay {
  type: "training";
  warmup: WarmupItem[];
  exercises: Exercise[];
  cardio: CardioSection;
}

export interface DayPlan {
  id: number;
  dayShort: string;
  dayFull: string;
  name: string;
  category: string;
  color: string;
  content: TrainingDay | RestDay;
}

export const trainingPlan: DayPlan[] = [
  {
    id: 1,
    dayShort: "PON",
    dayFull: "Poniedziałek",
    name: "PUSH",
    category: "Klatka piersiowa / Barki / Triceps",
    color: "#FF3366",
    content: {
      type: "training",
      warmup: [
        { text: "5 min rower lub orbitrek — spokojne tempo" },
        { text: "Rotacje ramion w przód i tył (15×)" },
        { text: "Kółka łokciami (15×)" },
        { text: "Pompki z kolanami, pełny zakres ruchu (2×10)" },
        { text: "Face pull z gumy lub odwrotne rozpitki (2×15)" },
      ],
      exercises: [
        {
          id: "d1e1",
          number: 1,
          name: "Wyciskanie na ławce skośnej 30–45° — sztanga",
          tip: "Górna klatka priorytet — rób pierwsze, gdy masz max siły",
          sets: "4 × 8–10",
        },
        {
          id: "d1e2",
          number: 2,
          name: "Wyciskanie na ławce płaskiej — sztanga",
          sets: "3 × 8–10",
        },
        {
          id: "d1e3",
          number: 3,
          name: "Rozpitki na wyciągu — cable fly, dolny/środkowy",
          tip: "Zatrzymaj w szczytowym skurczu, kontrolowany ruch",
          sets: "3 × 12–15",
        },
        {
          id: "d1e4",
          number: 4,
          name: "Wyciskanie żołnierskie OHP — sztanga stojąc",
          sets: "3 × 10",
        },
        {
          id: "d1e5",
          number: 5,
          name: "Boczne unoszenia hantli — oburęcznie stojąc",
          sets: "3 × 12–15",
        },
        {
          id: "d1e6",
          number: 6,
          name: "Pushdown na wyciągu — linka V-bar lub prosta",
          sets: "3 × 12",
        },
        {
          id: "d1e7",
          number: 7,
          name: "Kickback triceps wyciąg dolny — linka oburęcz",
          tip: "Stoisz przodem, łokcie cofnięte, prostuj obie ręce naraz",
          sets: "3 × 12",
        },
      ],
      cardio: {
        title: "WOREK BOKSERSKI — 6 RUND × 3 MIN | 1 MIN PRZERWY",
        rounds: [
          {
            label: "R1 — rozgrzewka",
            description:
              "Tylko jab–cross, lekko, utrzymaj rytm oddechu",
          },
          {
            label: "R2",
            description:
              "Jab–cross–hak lewy, powtarzaj kombinację bez zatrzymania",
          },
          {
            label: "R3 — POWER",
            description:
              "Mocne pojedyncze uderzenia co 3 sek, reszta = ruch nóg",
          },
          {
            label: "R4",
            description:
              "Kombinacja dowolna + 5-sek sprinty na worku co 30 sek",
          },
          {
            label: "R5",
            description:
              "Jab–cross–krok boczny–body shot, pracuj nad pozycją",
          },
          {
            label: "R6 — ALL OUT",
            description:
              "Maksymalne tempo od pierwszej do ostatniej sekundy!",
          },
        ],
      },
    },
  },
  {
    id: 2,
    dayShort: "WT",
    dayFull: "Wtorek",
    name: "PULL",
    category: "Plecy / Tylne barki / Biceps",
    color: "#00E5A0",
    content: {
      type: "training",
      warmup: [
        { text: "5 min rower lub orbitrek" },
        {
          text: "Face pull z gumy elastycznej (2×15) — aktywuje tylny bark i rotatory",
        },
        { text: "Ściąganie gumy za głowę (2×12)" },
        { text: "Koty-krowy na macie (10×) — rozruszanie lędźwi" },
        {
          text: "Martwy ciąg z lekkim ciężarem (1×10) — przygotowanie techniki",
        },
      ],
      exercises: [
        {
          id: "d2e1",
          number: 1,
          name: "Martwy ciąg — sztanga",
          tip: "Plecy proste, pchasz podłogę nogami — technika przed ciężarem",
          sets: "3 × 6–8",
        },
        {
          id: "d2e2",
          number: 2,
          name: "Podciąganie na drążku (lub wspomagane maszyną)",
          sets: "3 × 6–10",
        },
        {
          id: "d2e3",
          number: 3,
          name: "Wiosłowanie siedząc na wyciągu — V-bar oburęcz",
          sets: "4 × 10",
        },
        {
          id: "d2e4",
          number: 4,
          name: "Ściąganie drążka — lat pulldown, szeroki chwyt",
          sets: "3 × 10–12",
        },
        {
          id: "d2e5",
          number: 5,
          name: "Face pull na wyciągu — linka",
          tip: "Nie pomijaj — zdrowie barków zależy od tego ćwiczenia",
          sets: "3 × 15",
        },
        {
          id: "d2e6",
          number: 6,
          name: "Uginanie ramion ze sztangą EZ",
          sets: "3 × 10–12",
        },
        {
          id: "d2e7",
          number: 7,
          name: "Hammer curl hantlami — oburęcz jednocześnie",
          sets: "3 × 12",
        },
      ],
      cardio: {
        title: "WOREK BOKSERSKI — 6 RUND × 3 MIN | 1 MIN PRZERWY",
        rounds: [
          {
            label: "R1 — rozgrzewka",
            description: "Tylko ruch nóg + jab, skupiasz się na pozycji",
          },
          {
            label: "R2–R3",
            description:
              "Kombinacje jab–cross–hak, zmiana tempa co 30 sek",
          },
          {
            label: "R4–R5",
            description:
              "Dowolne kombinacje + praca nóg, nie stój w miejscu",
          },
          {
            label: "R6 — TABATA",
            description:
              "20 sek all out / 10 sek ruch — przez całą rundę!",
          },
        ],
      },
    },
  },
  {
    id: 3,
    dayShort: "ŚR",
    dayFull: "Środa",
    name: "REST",
    category: "Aktywna regeneracja",
    color: "#FFB800",
    content: {
      type: "rest",
      description:
        "Mięśnie rosną podczas odpoczynku — ten dzień jest równie ważny co treningi.",
      options: [
        {
          title: "Opcja A — Worek bokserski (45 min, tempo 60-70%)",
          items: [
            "R1-R2: spokojny rytm i technika",
            "R3-R4: kombinacje w umiarkowanym tempie",
            "R5: sprinty 10 sek / marsz 20 sek naprzemiennie",
            "R6: wyciszenie, skupienie na oddechu",
          ],
        },
        {
          title: "Opcja B — Spacer / rower / pływanie (30-45 min)",
          items: [
            "Tętno ok. 120-130 uderzeń/min",
            "Nie intensywność, a przepływ krwi",
          ],
        },
      ],
      note: "KONIECZNIE: 10 min statyczne rozciąganie całego ciała. Szczególnie klatka, barki i plecy po 2 dniach treningu.",
    },
  },
  {
    id: 4,
    dayShort: "CZW",
    dayFull: "Czwartek",
    name: "PUSH",
    category: "Klatka piersiowa / Barki / Triceps",
    color: "#FF3366",
    content: {
      type: "training",
      warmup: [
        { text: "5 min rower lub orbitrek" },
        { text: "Rotacje ramion + kółka łokciami (15×)" },
        { text: "Band pull-apart z gumą elastyczną (2×15)" },
        { text: "Pompki klasyczne bez ciężaru (2×10) — pełny zakres" },
        {
          text: "Wyciskanie hantli na skośnej z bardzo lekkim ciężarem (1×12)",
        },
      ],
      exercises: [
        {
          id: "d4e1",
          number: 1,
          name: "Wyciskanie na ławce skośnej 30–45° — hantle",
          tip: "Szerszy zakres ruchu niż sztanga — wolna faza opuszczania",
          sets: "4 × 10",
        },
        {
          id: "d4e2",
          number: 2,
          name: "Wyciskanie na ławce płaskiej — hantle",
          sets: "3 × 10–12",
        },
        {
          id: "d4e3",
          number: 3,
          name: "Cable crossover z góry — górna klatka",
          tip: "Linki wysoko, ręce krzyżują się na wysokości bioder",
          sets: "3 × 12–15",
        },
        {
          id: "d4e4",
          number: 4,
          name: "Arnoldki — hantle siedząc",
          sets: "3 × 10–12",
        },
        {
          id: "d4e5",
          number: 5,
          name: "Boczne unoszenia na wyciągu — kabel lub hantle",
          sets: "3 × 12–15",
        },
        {
          id: "d4e6",
          number: 6,
          name: "Dips na poręczach — ciężar własnego ciała",
          tip: "Pochylenie do przodu = klatka | wyprostowany = triceps",
          sets: "3 × max",
        },
        {
          id: "d4e7",
          number: 7,
          name: "Kickback triceps wyciąg dolny — linka oburęcz",
          sets: "3 × 12–15",
        },
      ],
      cardio: {
        title: "WOREK BOKSERSKI — 6 RUND × 3 MIN | 1 MIN PRZERWY",
        rounds: [
          {
            label: "R1 — rozgrzewka",
            description: "Jab–cross, utrzymaj rytm oddechu",
          },
          {
            label: "R2–R3",
            description:
              "Kombinacja 4-uderzeniowa + krok boczny, powtarzaj",
          },
          {
            label: "R4–R5 — POWER",
            description:
              "Mocne pojedyncze uderzenia z pauzą, wracasz do guard",
          },
          {
            label: "R6 — ALL OUT",
            description:
              "Najlepsze kombinacje, maksymalne tempo do końca!",
          },
        ],
      },
    },
  },
  {
    id: 5,
    dayShort: "PT",
    dayFull: "Piątek",
    name: "PULL",
    category: "Plecy / Tylne barki / Biceps",
    color: "#00E5A0",
    content: {
      type: "training",
      warmup: [
        { text: "5 min rower lub orbitrek" },
        { text: "Face pull z gumy elastycznej (2×15)" },
        { text: "Superman na macie (2×10) — aktywacja mięśni grzbietu" },
        {
          text: "Rozciąganie klatki przy słupku (2×20 sek) — otwierasz przed wiosłowaniem",
        },
        {
          text: "Wiosłowanie na wyciągu z lekkim ciężarem (1×12) — przygotowanie",
        },
      ],
      exercises: [
        {
          id: "d5e1",
          number: 1,
          name: "Wiosłowanie sztangą w opadzie — underhand/overhand",
          tip: "Plecy proste, łokcie blisko ciała, ciągniesz do dolnej klatki",
          sets: "4 × 8–10",
        },
        {
          id: "d5e2",
          number: 2,
          name: "Podciąganie na drążku (lub wspomagane maszyną)",
          sets: "3 × 6–10",
        },
        {
          id: "d5e3",
          number: 3,
          name: "Wiosłowanie siedząc — szeroki chwyt poziomy",
          sets: "3 × 10–12",
        },
        {
          id: "d5e4",
          number: 4,
          name: "Pullover na wyciągu górnym z liną — stojąc",
          tip: "Izoluje najszerszy grzbietowy, ręce lekko ugięte",
          sets: "3 × 12",
        },
        {
          id: "d5e5",
          number: 5,
          name: "Face pull na wyciągu — linka",
          sets: "3 × 15",
        },
        {
          id: "d5e6",
          number: 6,
          name: "Uginanie ramion na wyciągu dolnym — linka oburęcz",
          sets: "3 × 12",
        },
        {
          id: "d5e7",
          number: 7,
          name: "Uginanie hantlami — oburęcz jednocześnie stojąc",
          sets: "3 × 10–12",
        },
      ],
      cardio: {
        title: "WOREK BOKSERSKI — 6 RUND × 3 MIN | 1 MIN PRZERWY",
        rounds: [
          {
            label: "R1 — rozgrzewka",
            description:
              "Tylko jab, skupiasz się na oddechu i rytmie",
          },
          {
            label: "R2–R3",
            description:
              "Jab–cross–body shot, 3 poziomy: głowa / korpus / głowa",
          },
          {
            label: "R4–R5",
            description:
              "Kombinacje + co 30 sek: 10 pompek lub 10 przysiadów",
          },
          {
            label: "R6 — FINAŁ",
            description:
              "Wszystko na raz — najlepsze kombinacje, daj z siebie wszystko!",
          },
        ],
      },
    },
  },
];
