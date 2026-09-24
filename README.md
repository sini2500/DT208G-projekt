# KursListan – NUIM Universitet

En webbplats för ett fiktivt lärosäte, byggd som projektuppgift i kursen **Programmering i TypeScript (DT208G)** på Mittuniversitetet.

Studenter kan söka, filtrera och sortera bland lärosätets kursutbud och sätta ihop ett eget ramschema som sparas i webbläsaren.

**Publicerad webbplats:** https://dt208g-projekt-sini2500.netlify.app

## Funktioner

- **Sökning** på kurskod och kursnamn.
- **Filtrering** på ämne, plus knapp för att rensa filter.
- **Sortering** på kurskod, kursnamn, poäng och ämne, både stigande och fallande.
- **Paginering** med 20, 50 eller 100 kurser per sida.
- **Antal träffar** för aktuellt urval, t.ex. "1–20 av 4328 kurser".
- **Ramschema** där kurser läggs till och tas bort, med summering av antal poäng. Dubletter går inte att lägga till.
- **localStorage** används för att spara schemat så det är kvar när sidan laddas om.
- **Startsida** med statistik om hur många kurser det finns och populära ämnen.
- **Responsiv design** som fungerar på mobil, surfplatta och stora skärmar.
- **Tydlig feedback** när användaren lägger till och tar bort kurser från schemat.

Kursdatan består av 4328 kurser och läses in från JSON i `public/miun_courses.json`.

## Betygsmål

Projektet siktar på överbetyg.

Alla grundkrav är uppfyllda, och dessa extrafunktioner byggts:
- Paginering
- Startsida med statistik
- Toast-meddelanden när knappar klickas
- Knappstatus för redan tillagda kurser
- Rensa filter / töm schema

## Teknik

- **Angular** med komponenter
- **TypeScript**
- **Signaler och `computed`** för att klura ut värden och göra dem tillgängliga
- **Routing** med `RouterOutlet` och `routerLink`
- **Tjänster** för de viktiga funktionerna:
  - `CourseService` – hämtar kursdatan
  - `ScheduleService` – hanterar ramschemat och localStorage
  - `ToastService` – visar tillfälliga meddelanden
- **localStorage** för att spara ramschemat mellan besök

## Sidor

- `/`      : Startsida med statistik om kurserna
- `/kurser`: Kurslistan med sökning, filter, sortering och paginering
- `/schema`: Ramschemat med poäng och borttagning
- `/om`    : Information om projektet
- `/*`     : 404-sida

## Testa projektet

```
npm install
npm start
```

Öppna `http://localhost:4200/`.