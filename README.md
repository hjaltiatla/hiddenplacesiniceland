# 🏔️ Falnir Staðir á Íslandi

Hidden Places in Iceland – a full-stack web app to discover lesser-known Icelandic nature spots.

## Tech Stack

- **Node.js** + **Express** – web server
- **sql.js** (pure-JS SQLite / WebAssembly) – database, no native build tools needed
- **EJS** – server-rendered templates
- **Leaflet.js** – interactive maps (via CDN)
- **TailwindCSS** – styling (via CDN)

## Setup & Run

### 1. Install dependencies

Run this from **Windows PowerShell, CMD, or a WSL terminal with Node.js installed**:

```bash
npm install
```

### 2. Start the server

```bash
npm start
```

The database is created and seeded automatically on first run.

### Development mode (auto-restart on file changes, Node 18+)

```bash
npm run dev
```

### 3. Open in browser

```
http://localhost:3000
```

## Pages

| URL | Lýsing |
|-----|--------|
| `/` | Forsíða með kortum og síum |
| `/places/:id` | Stað-síða með korti og upplýsingum |
| `/map` | Íslandskort með öllum merkjum |
| `/admin` | Bæta við / eyða stöðum |

## Project Structure

```
/
├── server.js              # Express app – async boot, DB init
├── package.json
├── database/
│   ├── db.js              # sql.js wrapper (all/get/run/exec + file persist)
│   ├── seed.js            # 5 dæmi-staðir (keyrir einu sinni)
│   └── places.db          # Búið til sjálfkrafa
├── routes/
│   ├── index.js           # Forsíða + síur
│   ├── places.js          # Stað-síða
│   ├── map.js             # Kortayfirlit
│   └── admin.js           # CRUD stjórnandi
├── views/
│   ├── layout.ejs         # Sameiginlegt HTML, nav, footer
│   ├── index.ejs          # Kortaröð með síum
│   ├── place.ejs          # Stað-upplýsingar + mini-kort
│   ├── map.ejs            # Leaflet kortayfirlit
│   ├── admin.ejs          # Stjórnandagluggi
│   └── 404.ejs            # Fannst ekki
└── public/                # Static skrár
```

## Seed Data – 5 Falnir Staðir

| Nafn | Svæði | Flokkur | Erfiðleikastig |
|------|-------|---------|----------------|
| Gjáin | Suðurland | Foss | Auðvelt |
| Stuðlagil | Austurland | Gjá | Miðlungs |
| Rauðfeldsgjá | Vesturland | Gönguferð | Miðlungs |
| Aldeyjarfoss | Norðurland eystra | Foss | Auðvelt |
| Kerlingarfjöll Heitar Uppsprettur | Suðurland (Hálendið) | Heitur pottur | Erfitt |
