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

## Configuració

Les llistes desplegables (treballadors, aprofitaments, màquines, clients, productes, xofers) es toquen des de ⚙️ dins l'app i es desen a `localStorage` de cada mòbil. **Exportar / Importar configuració** permet passar les mateixes llistes a tothom amb un fitxer JSON.

Els valors de fàbrica són a `CFG_DEF` dins `index.html`. Han de coincidir **exactament** amb `PARAMETRES`, `APROFITAMENTS` i `PREUS_VENDA` del llibre Excel.

L'app no mostra cap import en euros: els costos només viuen al llibre del gerent.
