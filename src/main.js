import { APARTMENTS, PENTHOUSE_ROOMS, KITCHEN_OPTIONS } from './data/apartments.js';
import { init3DExplorer } from './scene3d.js';

// ---------- 1. ROOM STUDIO (BEFORE/AFTER + 360 PAN) ----------
let currentRoomIdx = 0;
const roomViewport = document.getElementById('roomViewport');
const roomStagedImg = document.getElementById('roomStagedImg');
const roomRawImg = document.getElementById('roomRawImg');
const beforeWrap = document.getElementById('beforeWrap');
const compareDivider = document.getElementById('compareDivider');
const compareRange = document.getElementById('compareRange');
const roomTag = document.getElementById('roomTag');
const roomTitle = document.getElementById('roomTitle');
const roomDesc = document.getElementById('roomDesc');
const roomCounter = document.getElementById('roomCounter');
const roomThumbs = document.getElementById('roomThumbs');

function updateCompareSlider(val) {
  const pct = Math.max(0, Math.min(100, Number(val)));
  beforeWrap.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
  compareDivider.style.left = `${pct}%`;
}

compareRange.addEventListener('input', (e) => updateCompareSlider(e.target.value));
updateCompareSlider(compareRange.value);

// 360° Interactive Pan State
let panMode = false;
let panDragging = false;
let panX = 0;
let panY = 0;
let startX = 0;
let startY = 0;

function applyPanTransform() {
  if (!panMode) {
    roomStagedImg.style.transform = '';
    return;
  }
  roomStagedImg.style.transform = `scale(1.32) translate(${panX}px, ${panY}px)`;
}

roomViewport.addEventListener('pointerdown', (e) => {
  if (!panMode) return;
  panDragging = true;
  startX = e.clientX - panX;
  startY = e.clientY - panY;
  roomViewport.setPointerCapture(e.pointerId);
});

roomViewport.addEventListener('pointermove', (e) => {
  if (!panMode || !panDragging) return;
  const maxX = roomViewport.clientWidth * 0.14;
  const maxY = roomViewport.clientHeight * 0.12;
  panX = Math.max(-maxX, Math.min(maxX, e.clientX - startX));
  panY = Math.max(-maxY, Math.min(maxY, e.clientY - startY));
  applyPanTransform();
});

roomViewport.addEventListener('pointerup', () => {
  panDragging = false;
});

roomViewport.addEventListener('dblclick', () => {
  if (!panMode) return;
  panX = 0;
  panY = 0;
  applyPanTransform();
});

// Viewer mode toggle pills
document.querySelectorAll('[data-viewer-mode]').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-viewer-mode]').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const mode = btn.dataset.viewerMode;
    roomViewport.classList.remove('mode-staged', 'mode-pan360');
    panMode = mode === 'pan360';
    if (mode === 'staged') roomViewport.classList.add('mode-staged');
    if (mode === 'pan360') {
      roomViewport.classList.add('mode-pan360');
      panX = 0;
      panY = 0;
    }
    applyPanTransform();
  });
});

function renderRoomThumbs() {
  roomThumbs.innerHTML = '';
  PENTHOUSE_ROOMS.forEach((room, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `thumb-btn ${idx === currentRoomIdx ? 'active' : ''}`;
    btn.innerHTML = `<img src="${room.staged}" alt="${room.name}" loading="lazy" width="240" height="150" /><span>${room.shortName}</span>`;
    btn.addEventListener('click', () => selectRoom(idx, true));
    roomThumbs.appendChild(btn);
  });
}

let explorer3D = null;

function selectRoom(index, sync3D = false) {
  currentRoomIdx = (index + PENTHOUSE_ROOMS.length) % PENTHOUSE_ROOMS.length;
  const room = PENTHOUSE_ROOMS[currentRoomIdx];
  roomViewport.classList.toggle('is-portrait', room.id === 'exterior');
  roomStagedImg.src = room.staged;
  roomStagedImg.alt = `${room.name} — finished staged render`;
  roomRawImg.src = room.raw;
  roomRawImg.alt = `${room.name} — original unfinished photo`;
  roomTag.textContent = room.tag;
  roomTitle.textContent = room.name;
  roomDesc.textContent = room.description;
  roomCounter.textContent = `${String(currentRoomIdx + 1).padStart(2, '0')} / ${String(PENTHOUSE_ROOMS.length).padStart(2, '0')}`;
  panX = 0;
  panY = 0;
  applyPanTransform();

  roomThumbs.querySelectorAll('.thumb-btn').forEach((el, idx) => {
    el.classList.toggle('active', idx === currentRoomIdx);
  });
  if (sync3D && explorer3D) {
    explorer3D.flyToRoom(room.id);
  }
}

document.getElementById('prevRoomBtn').addEventListener('click', () => selectRoom(currentRoomIdx - 1, true));
document.getElementById('nextRoomBtn').addEventListener('click', () => selectRoom(currentRoomIdx + 1, true));

renderRoomThumbs();
selectRoom(0, false);

// ---------- 2. INTERACTIVE 3D EXPLORER ----------
explorer3D = init3DExplorer({
  container: document.getElementById('stage3dContainer'),
  canvas: document.getElementById('scene3dCanvas'),
  hotspotsLayer: document.getElementById('hotspotsLayer'),
  rooms: PENTHOUSE_ROOMS,
  onSelectRoom(roomId) {
    const idx = PENTHOUSE_ROOMS.findIndex((r) => r.id === roomId);
    if (idx !== -1) {
      selectRoom(idx, false);
      document.getElementById('room-studio').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
});
explorer3D.setActivePin(PENTHOUSE_ROOMS[0].id);

document.querySelectorAll('[data-3d-mode]').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-3d-mode]').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    explorer3D.setMode(btn.dataset['3dMode']);
  });
});

document.querySelectorAll('[data-floor]').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-floor]').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    explorer3D.focusFloor(Number(btn.dataset.floor));
  });
});

document.getElementById('heroPlayDrone').addEventListener('click', () => {
  document.getElementById('explorer-3d').scrollIntoView({ behavior: 'smooth' });
  document.querySelectorAll('[data-3d-mode]').forEach((b) => b.classList.toggle('active', b.dataset['3dMode'] === 'drone'));
  explorer3D.setMode('drone');
});

// ---------- 3. CHOOSE YOUR OWN KITCHEN ----------
const kitchenHeroImg = document.getElementById('kitchenHeroImg');
const kitchenAngleLabel = document.getElementById('kitchenAngleLabel');
const kitchenAngles = document.getElementById('kitchenAngles');
const kitchenDims = document.getElementById('kitchenDims');
const kitchenName = document.getElementById('kitchenName');
const kitchenSummary = document.getElementById('kitchenSummary');
const kitchenFeatures = document.getElementById('kitchenFeatures');

function renderKitchen(key) {
  const k = KITCHEN_OPTIONS[key];
  kitchenDims.textContent = k.dimensions;
  kitchenName.textContent = k.name;
  kitchenSummary.textContent = k.summary;
  kitchenFeatures.innerHTML = k.features.map((f) => `<li>${f}</li>`).join('');
  kitchenHeroImg.src = k.views[0].src;
  kitchenAngleLabel.textContent = k.views[0].label;

  kitchenAngles.innerHTML = '';
  k.views.forEach((v, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `kitchen-angle-btn ${idx === 0 ? 'active' : ''}`;
    btn.title = v.label;
    btn.innerHTML = `<img src="${v.src}" alt="${k.name} — ${v.label}" loading="lazy" width="320" height="213" />`;
    btn.addEventListener('click', () => {
      kitchenHeroImg.src = v.src;
      kitchenAngleLabel.textContent = v.label;
      kitchenAngles.querySelectorAll('.kitchen-angle-btn').forEach((b, i) => b.classList.toggle('active', i === idx));
    });
    kitchenAngles.appendChild(btn);
  });
}

document.querySelectorAll('[data-kitchen]').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-kitchen]').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    renderKitchen(btn.dataset.kitchen);
  });
});

renderKitchen('large');

// ---------- 4. CINEMA VIDEO MODAL DIALOG (closedby="any" + Safari fallback) ----------
const videoDialog = document.getElementById('videoDialog');
const dialogVideoPlayer = document.getElementById('dialogVideoPlayer');
const videoDialogTitle = document.getElementById('videoDialogTitle');
const videoDialogTag = document.getElementById('videoDialogTag');

const VIDEO_CATALOG = {
  walkaround: {
    tag: 'Full Interior Tour · 10 Staged Spaces',
    title: 'Penthouse 360° Walk-Around Tour',
    src: './media/videos/penthouse-walkaround-360.mp4'
  },
  drone: {
    tag: 'Aerial Showcase · Exterior to Penthouse',
    title: 'Drone-Style Exterior & Terrace Fly-Through',
    src: './media/videos/penthouse-drone-flythrough.mp4'
  }
};

function openVideoModal(key) {
  const item = VIDEO_CATALOG[key];
  if (!item) return;
  videoDialogTag.textContent = item.tag;
  videoDialogTitle.textContent = item.title;
  dialogVideoPlayer.src = item.src;
  videoDialog.showModal();
  dialogVideoPlayer.play().catch(() => {});
}

document.querySelectorAll('[data-open-video]').forEach((btn) => {
  btn.addEventListener('click', () => openVideoModal(btn.dataset.openVideo));
});

document.getElementById('openWalkaroundBtn').addEventListener('click', () => openVideoModal('walkaround'));

videoDialog.addEventListener('close', () => {
  dialogVideoPlayer.pause();
  dialogVideoPlayer.currentTime = 0;
});

// Mandatory light-dismiss fallback for browsers without closedBy support (e.g. Safari)
if (!('closedBy' in HTMLDialogElement.prototype)) {
  videoDialog.addEventListener('click', (event) => {
    if (event.target !== videoDialog) return;
    const rect = videoDialog.getBoundingClientRect();
    const isDialogContent =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width;
    if (isDialogContent) return;
    videoDialog.close();
  });
}

// Hover preview on video cards
document.querySelectorAll('.video-poster').forEach((poster) => {
  const vid = poster.querySelector('video');
  poster.addEventListener('mouseenter', () => vid.play().catch(() => {}));
  poster.addEventListener('mouseleave', () => {
    vid.pause();
    vid.currentTime = 0;
  });
});

// ---------- 5. ALL 3 APARTMENTS SPEC CARDS ----------
const apartmentsGrid = document.getElementById('apartmentsGrid');
apartmentsGrid.innerHTML = APARTMENTS.map(
  (apt) => `
  <article class="apt-card ${apt.status === 'live' ? 'featured' : ''}">
    <span class="apt-badge">${apt.badge}</span>
    <h3>${apt.title}</h3>
    <p class="apt-subtitle">${apt.subtitle}</p>
    <div class="apt-highlights">
      ${apt.highlights.map((h) => `<div><small>${h.label}</small><strong>${h.value}</strong></div>`).join('')}
    </div>
    <ul class="apt-specs">
      ${apt.specs.map((s) => `<li>${s}</li>`).join('')}
    </ul>
  </article>
`
).join('');
