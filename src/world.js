import * as THREE from 'three';
import { profile, projects, experience, skills, education, achievements, certs } from './data.js';

/* ============================================================
   Shyamraj's Island — an original drivable 3D portfolio.
   Arrow keys / WASD to drive; roll up to a signpost to open it.
   ============================================================ */

const app = document.getElementById('app');

/* ---------- renderer / scene / camera ---------- */
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
app.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color('#8fdcff');
scene.fog = new THREE.Fog('#a7e6ff', 90, 190);

const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 1000);
camera.position.set(0, 14, 22);

/* ---------- sky dome (gradient) ---------- */
{
  const skyGeo = new THREE.SphereGeometry(400, 32, 15);
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    uniforms: {
      top: { value: new THREE.Color('#2f7dd1') },
      bottom: { value: new THREE.Color('#bdecff') },
    },
    vertexShader: `varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);} `,
    fragmentShader: `varying vec3 vP; uniform vec3 top; uniform vec3 bottom;
      void main(){ float h = normalize(vP).y*0.5+0.5; gl_FragColor = vec4(mix(bottom, top, clamp(h,0.0,1.0)), 1.0);} `,
  });
  scene.add(new THREE.Mesh(skyGeo, skyMat));
}

/* ---------- lights ---------- */
scene.add(new THREE.HemisphereLight('#bfe9ff', '#3a5a45', 0.85));
const sun = new THREE.DirectionalLight('#fff4d6', 1.15);
sun.position.set(40, 60, 20);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.near = 10;
sun.shadow.camera.far = 200;
const sc = 90;
Object.assign(sun.shadow.camera, { left: -sc, right: sc, top: sc, bottom: -sc });
sun.shadow.bias = -0.0004;
scene.add(sun);

/* ---------- island ---------- */
const ISLAND_R = 60;      // visual radius
const PLAY_R = 52;        // drivable radius
const island = new THREE.Group();
scene.add(island);
{
  const top = new THREE.Mesh(
    new THREE.CylinderGeometry(ISLAND_R, ISLAND_R, 2, 72),
    new THREE.MeshStandardMaterial({ color: '#4bbf73', roughness: 1 })
  );
  top.position.y = -1;
  top.receiveShadow = true;
  island.add(top);

  const dirt = new THREE.Mesh(
    new THREE.CylinderGeometry(ISLAND_R, ISLAND_R * 0.62, 16, 72),
    new THREE.MeshStandardMaterial({ color: '#8a5a3b', roughness: 1 })
  );
  dirt.position.y = -9.5;
  island.add(dirt);

  // subtle path ring so the play area reads
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(PLAY_R - 1.2, PLAY_R, 80),
    new THREE.MeshStandardMaterial({ color: '#3aa563', roughness: 1, side: THREE.DoubleSide })
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.06;
  island.add(ring);
}

/* ---------- scatter: trees & rocks ---------- */
function tree(x, z, s = 1) {
  const g = new THREE.Group();
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.35 * s, 0.5 * s, 2.4 * s, 6),
    new THREE.MeshStandardMaterial({ color: '#7a4a2b', roughness: 1 })
  );
  trunk.position.y = 1.2 * s; trunk.castShadow = true;
  const leaf = new THREE.Mesh(
    new THREE.ConeGeometry(1.9 * s, 3.4 * s, 8),
    new THREE.MeshStandardMaterial({ color: '#2f9e57', roughness: 1 })
  );
  leaf.position.y = 3.7 * s; leaf.castShadow = true;
  const leaf2 = leaf.clone(); leaf2.scale.setScalar(0.7); leaf2.position.y = 5.1 * s;
  g.add(trunk, leaf, leaf2);
  g.position.set(x, 0, z);
  return g;
}
function rock(x, z, s = 1) {
  const m = new THREE.Mesh(
    new THREE.IcosahedronGeometry(s, 0),
    new THREE.MeshStandardMaterial({ color: '#8b96a0', roughness: 1, flatShading: true })
  );
  m.position.set(x, s * 0.4, z); m.castShadow = true; m.receiveShadow = true;
  m.rotation.set(Math.random(), Math.random(), Math.random());
  return m;
}
/* ---------- the car ---------- */
const car = new THREE.Group();
scene.add(car);
const wheels = [];
{
  const bodyMat = new THREE.MeshStandardMaterial({ color: '#17181d', roughness: 0.42, metalness: 0.28 });
  const darkMat = new THREE.MeshStandardMaterial({ color: '#20342b', roughness: 0.6 });
  const glassMat = new THREE.MeshStandardMaterial({ color: '#bff6ff', roughness: 0.1, metalness: 0.2 });

  const body = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.9, 4.4), bodyMat);
  body.position.y = 1.05; body.castShadow = true; car.add(body);

  const cabin = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.85, 2.2), bodyMat);
  cabin.position.set(0, 1.75, -0.2); cabin.castShadow = true; car.add(cabin);

  const glass = new THREE.Mesh(new THREE.BoxGeometry(2.02, 0.7, 1.0), glassMat);
  glass.position.set(0, 1.8, 0.6); car.add(glass);

  // a little green racing stripe (on-theme)
  const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.02, 4.42),
    new THREE.MeshStandardMaterial({ color: '#34ff8f', emissive: '#0e5', emissiveIntensity: 0.4 }));
  stripe.position.set(0, 1.51, 0); car.add(stripe);

  const wheelGeo = new THREE.CylinderGeometry(0.62, 0.62, 0.5, 16);
  const positions = [[-1.25, 1.5], [1.25, 1.5], [-1.25, -1.5], [1.25, -1.5]];
  for (const [x, z] of positions) {
    const w = new THREE.Mesh(wheelGeo, darkMat);
    w.rotation.z = Math.PI / 2;
    w.position.set(x, 0.62, z); w.castShadow = true;
    const holder = new THREE.Group();       // holder lets us steer front wheels
    holder.position.set(x, 0.62, z);
    w.position.set(0, 0, 0);
    holder.add(w);
    car.add(holder);
    wheels.push({ holder, mesh: w, front: z > 0 });
  }
}

/* ---------- zones (signposts) ---------- */
const zoneDefs = [
  { id: 'about', title: 'About', color: '#34ff8f' },
  { id: 'projects', title: 'Projects', color: '#5fe0ff' },
  { id: 'experience', title: 'Experience', color: '#ffcf5c' },
  { id: 'skills', title: 'Skills', color: '#c08bff' },
  { id: 'contact', title: 'Contact', color: '#ff7ea8' },
];
const zones = [];
function makeLabel(text, color) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 160;
  const x = c.getContext('2d');
  x.fillStyle = 'rgba(6,20,14,0.92)';
  roundRect(x, 6, 6, 500, 148, 26); x.fill();
  x.lineWidth = 6; x.strokeStyle = color; roundRect(x, 6, 6, 500, 148, 26); x.stroke();
  x.font = 'bold 76px "Baloo 2", sans-serif';
  x.textAlign = 'center'; x.textBaseline = 'middle';
  x.fillStyle = color; x.shadowColor = color; x.shadowBlur = 18;
  x.fillText(text, 256, 84);
  const tex = new THREE.CanvasTexture(c); tex.anisotropy = 4;
  const spr = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true }));
  spr.scale.set(7.2, 2.25, 1);
  return spr;
}
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
function zonePos(i) {
  const ang = (i / zoneDefs.length) * Math.PI * 2 + Math.PI / 2;
  const r = 34;
  return new THREE.Vector3(Math.cos(ang) * r, 0, Math.sin(ang) * r);
}
function nearAnyZone(x, z, d) {
  for (let i = 0; i < zoneDefs.length; i++) {
    const p = zonePos(i);
    if (Math.hypot(x - p.x, z - p.z) < d) return true;
  }
  return false;
}
zoneDefs.forEach((def, i) => {
  const p = zonePos(i);
  const g = new THREE.Group();
  g.position.copy(p);

  const post = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.22, 5, 10),
    new THREE.MeshStandardMaterial({ color: '#5a3a24', roughness: 1 })
  );
  post.position.y = 2.5; post.castShadow = true; g.add(post);

  const label = makeLabel(def.title, def.color);
  label.position.y = 6.4; g.add(label);

  // glowing trigger ring on the ground
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(6.4, 7.4, 48),
    new THREE.MeshBasicMaterial({ color: def.color, transparent: true, opacity: 0.35, side: THREE.DoubleSide })
  );
  ring.rotation.x = -Math.PI / 2; ring.position.y = 0.08; g.add(ring);

  // a floating gem to mark the spot
  const gem = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.8, 0),
    new THREE.MeshStandardMaterial({ color: def.color, emissive: def.color, emissiveIntensity: 0.6, roughness: 0.3, flatShading: true })
  );
  gem.position.y = 5.6; g.add(gem);

  scene.add(g);
  zones.push({ ...def, pos: p, group: g, ring, gem, label });
});

/* ---------- scatter trees & rocks (after zones so we can avoid them) ---------- */
(function scatter() {
  const rand = (a, b) => a + Math.random() * (b - a);
  for (let i = 0; i < 26; i++) {
    const ang = Math.random() * Math.PI * 2;
    const rad = rand(10, PLAY_R - 3);
    const x = Math.cos(ang) * rad, z = Math.sin(ang) * rad;
    if (Math.hypot(x, z) < 15) continue;         // clear the centre spawn + road ahead
    if (nearAnyZone(x, z, 8)) continue;          // clear the signposts
    island.add(Math.random() < 0.72 ? tree(x, z, rand(0.7, 1.3)) : rock(x, z, rand(0.7, 1.6)));
  }
})();

/* ---------- driving state ---------- */
const keys = { up: false, down: false, left: false, right: false };
const state = { x: 0, z: 6, heading: Math.PI, speed: 0 };
const MAX = 0.40, ACC = 0.0085, REV = 0.006, FRICTION = 0.975, BRAKE = 0.90, TURN = 0.032;

function forwardVec() { return new THREE.Vector3(Math.sin(state.heading), 0, Math.cos(state.heading)); }

function updateCar(dt) {
  // acceleration
  if (keys.up) state.speed += ACC;
  else if (keys.down) state.speed -= REV;
  else state.speed *= FRICTION;
  if (keys.down && state.speed > 0) state.speed *= BRAKE;
  state.speed = THREE.MathUtils.clamp(state.speed, -MAX * 0.5, MAX);
  if (Math.abs(state.speed) < 0.0009) state.speed = 0;

  // steering (scaled by how fast we're going; reversed in reverse)
  const grip = THREE.MathUtils.clamp(Math.abs(state.speed) / 0.18, 0, 1) * Math.sign(state.speed || 1);
  let steer = 0;
  if (keys.left) steer += 1;
  if (keys.right) steer -= 1;
  state.heading += steer * TURN * grip;

  const f = forwardVec();
  state.x += f.x * state.speed;
  state.z += f.z * state.speed;

  // keep on the island
  const d = Math.hypot(state.x, state.z);
  if (d > PLAY_R) {
    const k = PLAY_R / d;
    state.x *= k; state.z *= k;
    state.speed *= 0.3;
  }

  car.position.set(state.x, 0, state.z);
  car.rotation.y = state.heading;

  // wheels: roll + steer front pair
  for (const w of wheels) {
    w.mesh.rotation.x += state.speed * 1.6;
    w.holder.rotation.y = w.front ? steer * 0.4 : 0;
  }
}

/* ---------- camera follow ---------- */
const camTarget = new THREE.Vector3();
function updateCamera() {
  const f = forwardVec();
  const desired = new THREE.Vector3(
    state.x - f.x * 13,
    9.5,
    state.z - f.z * 13
  );
  camera.position.lerp(desired, 0.08);
  camTarget.lerp(new THREE.Vector3(state.x + f.x * 4, 2, state.z + f.z * 4), 0.1);
  camera.lookAt(camTarget);
}

/* ---------- proximity → panel ---------- */
const panel = document.getElementById('panel');
const pEyebrow = document.getElementById('p-eyebrow');
const pTitle = document.getElementById('p-title');
const pBody = document.getElementById('p-body');
const promptEl = document.getElementById('prompt');
let activeZone = null, openZone = null;

function nearestZone() {
  let best = null, bd = Infinity;
  for (const z of zones) {
    const d = Math.hypot(state.x - z.pos.x, state.z - z.pos.z);
    if (d < bd) { bd = d; best = z; }
  }
  return { zone: best, dist: bd };
}

function openPanel(zone) {
  openZone = zone;
  pEyebrow.textContent = 'zone · ' + zone.id;
  pTitle.textContent = zone.title;
  pTitle.style.color = zone.color;
  pBody.innerHTML = renderZone(zone.id);
  panel.classList.add('open');
}
function closePanel() { openZone = null; panel.classList.remove('open'); }

document.getElementById('p-close').addEventListener('click', closePanel);
addEventListener('keydown', (e) => { if (e.key === 'Escape') closePanel(); });

/* ---------- content renderers ---------- */
const A = (url, txt) => `<a href="${url}" target="_blank" rel="noopener">${txt || url}</a>`;
function renderZone(id) {
  switch (id) {
    case 'about':
      return `<p style="color:var(--bright)">${profile.summary}</p>
        <div class="kv" style="margin-top:14px">
          <span class="k">name</span><span>${profile.name}</span>
          <span class="k">role</span><span>${profile.role}</span>
          <span class="k">based</span><span>${profile.location}</span>
        </div>
        <div style="margin-top:14px">
          <div class="item"><div class="t">Education</div>
          ${education.map(e => `<div class="s">${e.title}</div>${e.org ? `<div style="color:var(--dim);font-size:12px">${e.org}</div>` : ''}<div style="color:var(--dim);font-size:12px">${e.meta}</div>`).join('<div style="height:8px"></div>')}
          </div>
        </div>`;
    case 'projects':
      return `<p style="color:var(--dim);font-size:12px;margin-bottom:10px">${projects.length} projects — all on ${A(profile.github, profile.githubShort)}</p>` +
        projects.map(p => `<div class="item">
        <div class="t">${p.name}</div><div class="s">${p.stack}</div>
        <ul>${p.points.map(x => `<li>${x}</li>`).join('')}</ul>
        ${p.repo ? `<div style="font-size:12px;margin-top:4px">${A(p.repo, 'view repo ↗')}</div>` : ''}
        </div>`).join('');
    case 'experience':
      return experience.map(x => `<div class="item">
        <div class="t">${x.role} <span style="color:var(--dim);font-weight:400">— ${x.dates}</span></div>
        <div class="s">${x.org}</div>
        <ul>${x.points.map(p => `<li>${p}</li>`).join('')}</ul>
        </div>`).join('');
    case 'skills':
      return `<div class="kv">${skills.map(s => `<span class="k">${s.group}</span><span style="color:var(--dim)">${s.items}</span>`).join('')}</div>
        <div class="item" style="margin-top:16px"><div class="t">Achievements</div>
        <ul>${achievements.map(a => `<li>${a}</li>`).join('')}</ul></div>
        <div class="item"><div class="t">Certifications</div>
        <ul>${certs.map(c => `<li>${c}</li>`).join('')}</ul></div>`;
    case 'contact':
      return `<div class="kv" style="font-size:14px">
        <span class="k">email</span><span>${A('mailto:' + profile.email, profile.email)}</span>
        <span class="k">github</span><span>${A(profile.github, profile.githubShort)}</span>
        <span class="k">linkedin</span><span>${A(profile.linkedin, profile.linkedinShort)}</span>
        <span class="k">location</span><span style="color:var(--dim)">${profile.location}</span>
        </div>
        <p style="margin-top:16px;color:var(--dim)">Prefer a keyboard? Try the
        <a href="./terminal.html" style="color:var(--link)">terminal edition</a>.</p>`;
  }
  return '';
}

/* ---------- HUD wiring ---------- */
document.getElementById('ghlink').href = profile.github;
const spd = document.getElementById('spd');

/* ---------- engine audio (procedural — no audio files) ---------- */
const audio = { ctx: null, ready: false, master: null, filter: null, engineGain: null, oscs: [] };
let soundOn = true;
try { if (localStorage.getItem('world-sound') === '0') soundOn = false; } catch (e) {}

function initAudio() {
  if (audio.ctx) return;
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return;
  const ctx = new Ctx();
  const master = ctx.createGain(); master.gain.value = soundOn ? 0.9 : 0.0; master.connect(ctx.destination);
  const filter = ctx.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 500; filter.Q.value = 7;
  const engineGain = ctx.createGain(); engineGain.gain.value = 0.0;
  filter.connect(engineGain); engineGain.connect(master);
  const mk = (type, mult, gain) => {
    const o = ctx.createOscillator(); o.type = type; o.frequency.value = 46 * mult;
    const g = ctx.createGain(); g.gain.value = gain;
    o.connect(g); g.connect(filter); o.start();
    return { o, mult };
  };
  audio.oscs = [mk('sawtooth', 1, 0.6), mk('sawtooth', 1.5, 0.22), mk('square', 0.5, 0.5)];
  Object.assign(audio, { ctx, master, filter, engineGain, ready: true });
}
function armAudio() {
  if (!audio.ctx) initAudio();
  if (audio.ctx && audio.ctx.state === 'suspended') audio.ctx.resume();
}
['keydown', 'pointerdown', 'touchstart'].forEach((ev) => addEventListener(ev, armAudio));

function updateAudio() {
  if (!audio.ready) return;
  const now = audio.ctx.currentTime;
  const s = Math.min(Math.abs(state.speed) / MAX, 1);        // 0..1
  const rev = keys.up ? 1 : (keys.down ? 0.6 : 0);
  const base = 46 + s * 118 + rev * 14;                      // idle → redline
  for (const { o, mult } of audio.oscs) o.frequency.setTargetAtTime(base * mult, now, 0.05);
  audio.filter.frequency.setTargetAtTime(360 + s * 1500, now, 0.05);
  const target = 0.035 + s * 0.11 + rev * 0.025;            // louder with speed/throttle
  audio.engineGain.gain.setTargetAtTime(target, now, 0.08);
}
function setSound(on) {
  soundOn = on;
  try { localStorage.setItem('world-sound', on ? '1' : '0'); } catch (e) {}
  const btn = document.getElementById('sound');
  if (btn) btn.textContent = on ? '🔊' : '🔇';
  if (audio.ready) audio.master.gain.setTargetAtTime(on ? 0.9 : 0.0, audio.ctx.currentTime, 0.05);
  if (on) armAudio();
}
{
  const btn = document.getElementById('sound');
  btn.textContent = soundOn ? '🔊' : '🔇';
  btn.addEventListener('click', () => setSound(!soundOn));
}

/* ---------- input ---------- */
const map = {
  ArrowUp: 'up', KeyW: 'up', ArrowDown: 'down', KeyS: 'down',
  ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right',
};
addEventListener('keydown', (e) => {
  if (map[e.code]) { keys[map[e.code]] = true; e.preventDefault(); }
  if (e.code === 'KeyR') { state.x = 0; state.z = 6; state.heading = Math.PI; state.speed = 0; }
});
addEventListener('keyup', (e) => { if (map[e.code]) { keys[map[e.code]] = false; e.preventDefault(); } });

// touch controls
if (matchMedia('(pointer:coarse)').matches) document.body.classList.add('touch');
document.querySelectorAll('#touch button').forEach((b) => {
  const k = b.dataset.k;
  const on = (e) => { e.preventDefault(); keys[k] = true; };
  const off = (e) => { e.preventDefault(); keys[k] = false; };
  b.addEventListener('touchstart', on, { passive: false });
  b.addEventListener('touchend', off, { passive: false });
  b.addEventListener('mousedown', on);
  b.addEventListener('mouseup', off);
  b.addEventListener('mouseleave', off);
});

/* ---------- resize ---------- */
addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

/* ---------- loop ---------- */
const clock = new THREE.Clock();
let t = 0;
function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.05);
  t += dt;

  updateCar(dt);
  updateCamera();
  updateAudio();

  // animate zone gems + rings; detect proximity
  const { zone, dist } = nearestZone();
  for (const z of zones) {
    z.gem.rotation.y += dt * 1.2;
    z.gem.position.y = 5.6 + Math.sin(t * 2 + z.pos.x) * 0.25;
    const near = z === zone && dist < 7.2;
    z.ring.material.opacity = near ? 0.75 : 0.32;
    z.gem.material.emissiveIntensity = near ? 1.1 : 0.6;
    z.gem.scale.setScalar(near ? 1.25 : 1);
  }

  // proximity prompt + auto behaviour
  activeZone = dist < 7.2 ? zone : null;
  if (activeZone && openZone !== activeZone) {
    promptEl.innerHTML = `You're at <b>${activeZone.title}</b> — opening…`;
    promptEl.classList.add('show');
    openPanel(activeZone);
  } else if (!activeZone) {
    promptEl.classList.remove('show');
    if (openZone && dist > 11) closePanel();  // drive away to close
  }

  spd.textContent = Math.round(Math.abs(state.speed) * 120);

  renderer.render(scene, camera);
}
animate();

if (import.meta.env && import.meta.env.DEV) window.__test = { openPanel, zones, state, audio, updateAudio, keys };

/* ---------- hide loader ---------- */
addEventListener('load', () => setTimeout(hideLoader, 350));
setTimeout(hideLoader, 1400); // fallback
function hideLoader() {
  const l = document.getElementById('loader');
  if (!l || l.dataset.gone) return;
  l.dataset.gone = '1';
  l.classList.add('hide');
  setTimeout(() => { l.style.display = 'none'; }, 650);
}
