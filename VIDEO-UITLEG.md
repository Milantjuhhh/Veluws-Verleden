# Video's toevoegen aan de informatiepunten

Alle video's worden ingesteld in:

`src/data/hotspotContent.ts`

Je hoeft `StoryPanel.tsx` niet meer aan te passen. Dat scherm zoekt automatisch de video op die bij het geopende informatiepunt hoort.

## Een video toevoegen

1. Open `src/data/hotspotContent.ts`.
2. Zoek het juiste schoolplaatnummer, bijvoorbeeld `1:` voor schoolplaat 1.
3. Zoek binnen `entries` het juiste informatiepunt. Het eerste blok is punt 1, het tweede blok punt 2 enzovoort.
4. Voeg aan dat informatiepunt `videoUrl` en `videoTitle` toe.

Voorbeeld:

```ts
{
  title: "Vuur als middelpunt",
  emoji: "🔥",
  fact: "Hier staat de eerste informatie-alinea.",
  detail: "Hier staat de derde informatie-alinea.",
  videoUrl: "https://www.youtube.com/watch?v=HIER_HET_VIDEO_ID",
  videoTitle: "Vuur maken in de prehistorie",
},
```

Je mag een normale YouTube-link, een korte `youtu.be`-link, een Shorts-link of alleen het YouTube-ID gebruiken. De applicatie zet dit automatisch om naar een geschikte ingesloten video.

## Als er nog geen video is

Laat `videoUrl` en `videoTitle` weg. Het informatiepunt toont dan automatisch het bestaande groene vak met de melding dat later een video kan worden toegevoegd.

## Reeds toegevoegd

Schoolplaat 1, informatiepunt 1 bevat al de video **Studenten bouwen een mesohut**:

`https://www.youtube.com/watch?v=lcW8TXVswTg`

## Belangrijk

- Gebruik per informatiepunt één video.
- Controleer of de video op YouTube nog beschikbaar is.
- Sommige YouTube-video's staan insluiten niet toe. Kies in dat geval een andere video.
- Geef iedere video een korte, duidelijke titel die kinderen begrijpen.
