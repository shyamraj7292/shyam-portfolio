# Shyamraj H — Interactive Portfolio

Two ways to explore, one landing page:

- **3D World** (`world.html`) — a drivable low-poly island built with [Three.js](https://threejs.org). Steer a car with the arrow keys / WASD and roll up to signposts for About, Projects, Experience, Skills and Contact.
- **Terminal** (`terminal.html`) — an interactive command-line résumé. Type `help` (or `/help`) to explore.
- **Landing** (`index.html`) — lets visitors pick either experience.

All content lives in one file: [`src/data.js`](src/data.js). Edit it once and every page updates.

## Run locally

```bash
npm install
npm run dev
```

Then open the printed URL (default http://localhost:5173).

## Add your résumé

Put your PDF at `public/resume.pdf`. It becomes `/resume.pdf` on the live site, which the
landing "Résumé" button and the terminal `resume` command link to.

## Build

```bash
npm run build      # outputs to dist/
npm run preview    # preview the production build locally
```

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. On [vercel.com](https://vercel.com) → **New Project** → import the repo.
3. Vercel auto-detects Vite. Confirm:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Deploy. You'll get a free `*.vercel.app` URL; add a custom domain later if you want.

> No GitHub? Install the Vercel CLI (`npm i -g vercel`) and run `vercel` in this folder.

## Structure

```
index.html        landing chooser
world.html        3D world entry      →  src/world.js
terminal.html     terminal (self-contained)
src/data.js       all résumé content (shared)
src/world.js      Three.js scene + driving + panels
public/           static files copied to site root (put resume.pdf here)
vite.config.js    multi-page build config
```

## Customising the 3D world

In `src/world.js`:
- Car colour — `bodyMat` near the top of the car section.
- Zones — the `zoneDefs` array (id, title, colour).
- Island size / feel — `ISLAND_R`, `PLAY_R`, lighting, fog.
- Driving feel — `MAX`, `ACC`, `TURN`, `FRICTION`.
