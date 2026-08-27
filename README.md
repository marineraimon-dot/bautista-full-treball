# bautista-app — Full de treball

PWA d'un sol fitxer perquè cada treballador d'**Explotacions Forestals M. Bautista** registri els seus jornals i expedicions i els enviï per WhatsApp al gerent en format CSV.

## Fitxers

| Fitxer | Què és |
|---|---|
| `index.html` | Tota l'app (HTML + CSS + JS, sense dependències externes). |
| `manifest.json` | Perquè s'instal·li com a app al mòbil. |
| `sw.js` | Service worker: funciona sense cobertura. HTML network-first, la resta cache-first. |
| `icon.svg` | Icona. |

## Provar-la ara

Obre `index.html` amb el navegador. Funciona igual, però per **instal·lar-la al mòbil** i que el service worker s'activi cal servir-la per HTTPS.

## Publicar-la

Mateix patró que `novalia-app` i `novalia-resum`: repo a GitHub amb Pages activat. Els treballadors obren l'URL una vegada i fan «Afegir a la pantalla d'inici».

## Sortida

Genera `FULL_<treballador>_<data>.csv`, separador `;`, decimals amb coma, UTF-8 amb BOM.

```
tipus;id;data;aprofitament;treballador;maquina;jornals;client;producte;tones;xofer;albara;observacions;versio;enviat
JORNAL;a1b2c3;2026-08-27;Cellers de la Serra;Ignasi;Motoserra (tallar);1;;;;;;;1.0;2026-08-27 19:02:00
EXPEDICIO;d4e5f6;2026-08-27;Cellers de la Serra;;;;Rieral;Serra;24,82;Marmi;A-1042;;1.0;2026-08-27 19:02:00
```

La columna `id` és la clau anti-duplicats del consolidador: un mateix full reenviat dues vegades no duplica cap línia.

## Consumidor

`Documents Raimon\NOVALIA FORESTAL\Adquisicions\Bautista\Fulls\` → `Consolidar.bat` → `Bautista_Aprofitaments.xlsx`.
Detall a `LLEGEIX-ME.md` d'aquella carpeta.

## Els desplegables

L'app carrega **`llistes.json`** en obrir-se i actualitza els desplegables sola. Aquell fitxer el publica el gerent des del full `LLISTATS` del llibre Excel, amb `Actualitza_app.bat`. Sense cobertura, l'app segueix amb l'última llista desada a `localStorage`.

```
LLISTATS (Excel)  →  Actualitza_app.bat  →  git push  →  llistes.json  →  app
```

`llistes.json` conté **només noms**: aquest repositori és públic i el `.gitignore` bloqueja `.xlsx`, `.csv` i dashboards perquè no hi entri mai cap cost.

`CFG_DEF` dins `index.html` només és el fallback per al primer arrencament sense xarxa. El botó ⚙️ deixa apedaçar una llista sobre la marxa, però se sobreescriu a la propera sincronització.

L'app no mostra cap import en euros: els costos només viuen al llibre del gerent.
