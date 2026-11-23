import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function init3DExplorer({ container, canvas, hotspotsLayer, rooms, onSelectRoom }) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x171512);
  scene.fog = new THREE.FogExp2(0x171512, 0.018);

  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 140);
  camera.position.set(11.5, 11.2, 12.8);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.maxPolarAngle = Math.PI / 2 - 0.05;
  controls.minDistance = 5.5;
  controls.maxDistance = 30;
  controls.target.set(0, 6.2, 0.2);

  // Mediterranean Golden Sunlight + Sky Fill
  const hemiLight = new THREE.HemisphereLight(0xfff3df, 0x3b352e, 0.9);
  scene.add(hemiLight);

  const sun = new THREE.DirectionalLight(0xfff1d6, 2.2);
  sun.position.set(14, 22, 16);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.near = 2;
  sun.shadow.camera.far = 60;
  sun.shadow.camera.left = -16;
  sun.shadow.camera.right = 16;
  sun.shadow.camera.top = 16;
  sun.shadow.camera.bottom = -16;
  sun.shadow.bias = -0.0005;
  scene.add(sun);

  const rimLight = new THREE.DirectionalLight(0x9bc4ff, 0.55);
  rimLight.position.set(-12, 10, -14);
  scene.add(rimLight);

  // Materials
  const stuccoMat = new THREE.MeshStandardMaterial({ color: 0xf4efe8, roughness: 0.78 });
  const stuccoDimMat = new THREE.MeshStandardMaterial({ color: 0xe6dfd6, roughness: 0.82 });
  const ochreMat = new THREE.MeshStandardMaterial({ color: 0xd49a3a, roughness: 0.65 });
  const terracottaMat = new THREE.MeshStandardMaterial({ color: 0xb96b45, roughness: 0.72 });
  const stoneMat = new THREE.MeshStandardMaterial({ color: 0xa69c8e, roughness: 0.88 });
  const floorTileMat = new THREE.MeshStandardMaterial({ color: 0xd5cec4, roughness: 0.45 });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x26323a,
    roughness: 0.12,
    metalness: 0.1,
    transmission: 0.35,
    transparent: true,
    opacity: 0.75
  });
  const anthraciteMat = new THREE.MeshStandardMaterial({ color: 0x242424, roughness: 0.4, metalness: 0.3 });
  const graniteMat = new THREE.MeshStandardMaterial({ color: 0x1b1a19, roughness: 0.35, metalness: 0.15 });
  const whiteGlossMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.15, metalness: 0.05 });
  const oakMat = new THREE.MeshStandardMaterial({ color: 0xc29b6c, roughness: 0.6 });
  const linenMat = new THREE.MeshStandardMaterial({ color: 0xe9dfd2, roughness: 0.9 });
  const oliveMat = new THREE.MeshStandardMaterial({ color: 0x5c6e4c, roughness: 0.85 });

  // Ground Plaza
  const ground = new THREE.Mesh(
    new THREE.CylinderGeometry(18, 19, 0.5, 48),
    new THREE.MeshStandardMaterial({ color: 0x22201d, roughness: 0.92 })
  );
  ground.position.y = -0.25;
  ground.receiveShadow = true;
  scene.add(ground);

  const gridHelper = new THREE.GridHelper(32, 32, 0x3b352d, 0x26231f);
  gridHelper.position.y = 0.01;
  scene.add(gridHelper);

  const building = new THREE.Group();
  scene.add(building);

  const addBox = (parent, w, h, d, x, y, z, mat) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  };

  // Ground Floor: Garage & Stone Base (y: 0 -> 2.1)
  const garageGroup = new THREE.Group();
  addBox(garageGroup, 10.6, 2.0, 8.6, 0, 1.0, -0.4, stoneMat);
  addBox(garageGroup, 2.4, 1.6, 0.15, -2.5, 0.8, 3.92, anthraciteMat);
  addBox(garageGroup, 2.4, 1.6, 0.15, 2.5, 0.8, 3.92, anthraciteMat);
  building.add(garageGroup);

  // Floor 1: Apartment 1 (y: 2.0 -> 4.3)
  const floor1Group = new THREE.Group();
  addBox(floor1Group, 10.6, 2.25, 8.6, 0, 3.15, -0.4, stuccoDimMat);
  // Front windows with ochre trim
  [-3.2, 0, 3.2].forEach((wx) => {
    addBox(floor1Group, 1.75, 1.55, 0.14, wx, 3.2, 3.94, ochreMat);
    addBox(floor1Group, 1.45, 1.3, 0.18, wx, 3.2, 3.96, glassMat);
  });
  // Balcony slab
  addBox(floor1Group, 10.8, 0.18, 1.2, 0, 2.08, 4.4, stuccoMat);
  addBox(floor1Group, 10.8, 0.65, 0.12, 0, 2.48, 4.95, stuccoMat);
  building.add(floor1Group);

  // Floor 2: Apartment 2 (y: 4.3 -> 6.6)
  const floor2Group = new THREE.Group();
  addBox(floor2Group, 10.6, 2.25, 8.6, 0, 5.45, -0.4, stuccoMat);
  [-3.2, 0, 3.2].forEach((wx) => {
    addBox(floor2Group, 1.75, 1.55, 0.14, wx, 5.5, 3.94, ochreMat);
    addBox(floor2Group, 1.45, 1.3, 0.18, wx, 5.5, 3.96, glassMat);
  });
  // Covered sea-view balcony
  addBox(floor2Group, 10.8, 0.18, 1.45, 0, 4.38, 4.5, terracottaMat);
  addBox(floor2Group, 10.8, 0.68, 0.14, 0, 4.8, 5.15, stuccoMat);
  building.add(floor2Group);

  // Floor 3: Apartment 3 PENTHOUSE (y: 6.6 -> 9.0) — Detailed Dollhouse Interior + Huge Wrap-Around Terrace!
  const penthouseGroup = new THREE.Group();
  building.add(penthouseGroup);

  // Huge wrap-around terracotta terrace slab
  addBox(penthouseGroup, 12.2, 0.22, 10.2, -0.2, 6.68, 0.2, terracottaMat);

  // White balustrades around the huge terrace
  addBox(penthouseGroup, 12.2, 0.72, 0.14, -0.2, 7.12, 5.23, stuccoMat); // Front
  addBox(penthouseGroup, 0.14, 0.72, 10.2, -6.23, 7.12, 0.2, stuccoMat); // Left wrap-around
  addBox(penthouseGroup, 0.14, 0.72, 10.2, 5.83, 7.12, 0.2, stuccoMat); // Right edge

  // Penthouse Interior Porcelain Floor
  addBox(penthouseGroup, 8.8, 0.08, 7.4, 0.4, 6.82, -0.6, floorTileMat);

  // Exterior Cutaway Walls (half-height in cutaway, full height with roof in exterior mode)
  const wallH = 1.9;
  const wallY = 6.85 + wallH / 2;
  // Back wall
  addBox(penthouseGroup, 8.8, wallH, 0.18, 0.4, wallY, -4.25, stuccoMat);
  // Left wall
  addBox(penthouseGroup, 0.18, wallH, 7.4, -3.95, wallY, -0.6, stuccoMat);
  // Right wall
  addBox(penthouseGroup, 0.18, wallH, 7.4, 4.75, wallY, -0.6, stuccoMat);
  // Front glass terrace doors wall (low sill + glass panels)
  addBox(penthouseGroup, 1.4, wallH, 0.16, -3.2, wallY, 3.05, stuccoMat);
  addBox(penthouseGroup, 3.4, wallH - 0.1, 0.1, -0.8, wallY, 3.05, glassMat);
  addBox(penthouseGroup, 1.2, wallH, 0.16, 1.5, wallY, 3.05, stuccoMat);
  addBox(penthouseGroup, 2.4, wallH - 0.1, 0.1, 3.4, wallY, 3.05, glassMat);

  // Internal Partition Walls (low cutaway style)
  const partH = 1.35;
  const partY = 6.85 + partH / 2;
  addBox(penthouseGroup, 8.6, partH, 0.12, 0.4, partY, -1.35, stuccoDimMat); // Hall divider
  addBox(penthouseGroup, 0.12, partH, 2.8, -1.8, partY, -2.8, stuccoDimMat); // Master / En-suite
  addBox(penthouseGroup, 0.12, partH, 2.8, -0.2, partY, -2.8, stuccoDimMat); // En-suite / Family bath
  addBox(penthouseGroup, 0.12, partH, 2.8, 1.55, partY, -2.8, stuccoDimMat); // Family bath / Utility
  addBox(penthouseGroup, 0.12, partH, 4.2, 2.4, partY, 0.9, stuccoDimMat); // Living / Bed 2 + Kitchen

  // Signature Central Round Column in Penthouse Living Room
  const column = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 2.0, 20), stuccoDimMat);
  column.position.set(-0.7, 7.85, 0.7);
  column.castShadow = true;
  penthouseGroup.add(column);

  // Furnished Dollhouse Details!
  // Living room L-sofa + coffee table + corner pellet burner in 90° terrace/back corner
  addBox(penthouseGroup, 2.1, 0.42, 0.75, -2.4, 7.06, 1.75, linenMat);
  addBox(penthouseGroup, 0.75, 0.42, 1.45, -1.72, 7.06, 1.15, linenMat);
  addBox(penthouseGroup, 0.9, 0.25, 0.55, -2.5, 6.98, 0.85, oakMat);
  const pellet = new THREE.Mesh(
    new THREE.CylinderGeometry(0.28, 0.28, 0.92, 16, 1, false, 0, Math.PI / 2),
    anthraciteMat
  );
  pellet.rotation.y = Math.PI * 0.75;
  pellet.position.set(-3.75, 7.32, 2.85);
  penthouseGroup.add(pellet);
  const flue = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.1, 10), anthraciteMat);
  flue.position.set(-3.75, 8.2, 2.85);
  penthouseGroup.add(flue);

  // Dining Table (oak)
  addBox(penthouseGroup, 1.5, 0.48, 0.85, 0.75, 7.09, 1.4, oakMat);

  // Fitted Penthouse Large L-Shaped Kitchen (4.0m x 2.6m wall-to-wall L-shape)
  addBox(penthouseGroup, 2.2, 0.62, 0.55, 3.55, 7.16, -1.05, whiteGlossMat);
  addBox(penthouseGroup, 2.22, 0.06, 0.57, 3.55, 7.5, -1.05, graniteMat);
  addBox(penthouseGroup, 0.52, 1.45, 0.56, 4.38, 7.56, -1.05, whiteGlossMat); // Tall oven/microwave tower
  addBox(penthouseGroup, 0.55, 0.62, 1.65, 2.72, 7.16, -0.5, whiteGlossMat); // Long sink run
  addBox(penthouseGroup, 0.57, 0.06, 1.67, 2.72, 7.5, -0.5, graniteMat);
  addBox(penthouseGroup, 0.56, 1.45, 0.52, 2.72, 7.56, 0.42, whiteGlossMat); // Tall fridge tower

  // Master Bed
  addBox(penthouseGroup, 1.45, 0.38, 1.75, -2.9, 7.04, -2.8, linenMat);
  // Guest Bed 2
  addBox(penthouseGroup, 1.35, 0.38, 1.65, 3.65, 7.04, 1.35, linenMat);
  // Freestanding Bath in Family Bathroom
  const tub = new THREE.Mesh(new THREE.CapsuleGeometry(0.32, 0.72, 6, 14), whiteGlossMat);
  tub.rotation.z = Math.PI / 2;
  tub.position.set(0.65, 7.12, -3.25);
  penthouseGroup.add(tub);
  // Utility countertop + twin black washer/dryer
  addBox(penthouseGroup, 0.5, 0.6, 1.8, 1.9, 7.15, -2.9, oakMat);
  addBox(penthouseGroup, 0.45, 0.52, 0.52, 1.92, 7.11, -2.55, anthraciteMat);
  addBox(penthouseGroup, 0.45, 0.52, 0.52, 1.92, 7.11, -3.15, anthraciteMat);

  // Terrace Outdoor Lounge & Dining Furniture + Olive Planters
  addBox(penthouseGroup, 1.8, 0.36, 0.7, -4.9, 7.0, 2.6, linenMat);
  addBox(penthouseGroup, 0.85, 0.25, 0.55, -4.9, 6.94, 3.55, oakMat);
  addBox(penthouseGroup, 1.7, 0.46, 0.85, 1.9, 7.05, 4.15, oakMat);
  [
    [-5.5, 4.4],
    [-5.5, 0.8],
    [4.8, 4.4]
  ].forEach(([px, pz]) => {
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.18, 0.42, 12), terracottaMat);
    pot.position.set(px, 7.0, pz);
    penthouseGroup.add(pot);
    const crown = new THREE.Mesh(new THREE.SphereGeometry(0.36, 12, 10), oliveMat);
    crown.position.set(px, 7.55, pz);
    penthouseGroup.add(crown);
  });

  // Removable Penthouse Roof (visible in Full Exterior mode, hidden in Penthouse Cutaway!)
  const roofGroup = new THREE.Group();
  addBox(roofGroup, 9.2, 0.24, 7.8, 0.4, 8.85, -0.6, ochreMat);
  const pitchedRoof = new THREE.Mesh(new THREE.ConeGeometry(6.3, 1.4, 4), terracottaMat);
  pitchedRoof.rotation.y = Math.PI / 4;
  pitchedRoof.scale.set(1.08, 1, 0.92);
  pitchedRoof.position.set(0.4, 9.65, -0.6);
  pitchedRoof.castShadow = true;
  roofGroup.add(pitchedRoof);
  roofGroup.visible = false; // Default: Penthouse Cutaway open!
  penthouseGroup.add(roofGroup);

  // Build 3D Hotspot Pins
  const pins = rooms.map((room) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'hotspot-pin';
    btn.textContent = room.shortName;
    btn.dataset.roomId = room.id;
    btn.addEventListener('click', () => {
      stopDrone();
      flyTo(room.camera3D.pos, room.camera3D.target);
      setActivePin(room.id);
      onSelectRoom(room.id);
    });
    hotspotsLayer.appendChild(btn);
    return {
      room,
      el: btn,
      pos3D: new THREE.Vector3(room.hotspot3D.x, room.hotspot3D.y, room.hotspot3D.z)
    };
  });

  function setActivePin(roomId) {
    pins.forEach((p) => p.el.classList.toggle('active', p.room.id === roomId));
  }

  // Smooth Camera Flight State
  let flight = null;
  function flyTo(posArr, targetArr, duration = 1100) {
    flight = {
      startTime: performance.now(),
      duration,
      fromPos: camera.position.clone(),
      toPos: new THREE.Vector3(...posArr),
      fromTarget: controls.target.clone(),
      toTarget: new THREE.Vector3(...targetArr)
    };
  }

  // Drone Fly-Through Spline Path
  const droneCurve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(14.5, 6.0, 14.5),
      new THREE.Vector3(11.0, 10.8, 10.5),
      new THREE.Vector3(-10.5, 10.2, 9.5),
      new THREE.Vector3(-8.5, 9.5, -6.5),
      new THREE.Vector3(6.5, 11.4, -7.8),
      new THREE.Vector3(12.2, 9.8, 5.5)
    ],
    true
  );
  let droneActive = false;
  let droneProgress = 0;

  function startDrone() {
    flight = null;
    roofGroup.visible = false;
    droneActive = true;
  }

  function stopDrone() {
    droneActive = false;
  }

  controls.addEventListener('start', () => {
    flight = null;
    droneActive = false;
  });

  function setMode(mode) {
    if (mode === 'drone') {
      startDrone();
      return;
    }
    stopDrone();
    if (mode === 'exterior') {
      roofGroup.visible = true;
      flyTo([14.5, 9.2, 15.5], [0, 4.6, 0]);
    } else {
      roofGroup.visible = false;
      flyTo([10.8, 11.4, 11.8], [0, 6.8, 0.2]);
    }
  }

  function focusFloor(floorNum) {
    stopDrone();
    if (floorNum === 3) {
      roofGroup.visible = false;
      flyTo([10.5, 11.4, 11.5], [0, 6.9, 0.2]);
    } else if (floorNum === 2) {
      roofGroup.visible = true;
      flyTo([12.2, 6.8, 12.8], [0, 5.2, 1.0]);
    } else {
      roofGroup.visible = true;
      flyTo([12.2, 4.4, 12.8], [0, 3.0, 1.0]);
    }
  }

  // Resize Handling
  function resize() {
    const w = container.clientWidth || 800;
    const h = container.clientHeight || 520;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(container);

  // Efficient Background Processing: Pause WebGL loop when off-screen
  let rafId = null;
  let isPaused = false;
  const projVec = new THREE.Vector3();

  function tick(now) {
    if (isPaused) return;
    rafId = requestAnimationFrame(tick);

    if (droneActive) {
      droneProgress = (droneProgress + 0.00085) % 1;
      const pt = droneCurve.getPointAt(droneProgress);
      camera.position.lerp(pt, 0.08);
      controls.target.lerp(new THREE.Vector3(0, 6.8, 0.2), 0.08);
    } else if (flight) {
      const t = Math.min((now - flight.startTime) / flight.duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      camera.position.lerpVectors(flight.fromPos, flight.toPos, ease);
      controls.target.lerpVectors(flight.fromTarget, flight.toTarget, ease);
      if (t >= 1) flight = null;
    }

    controls.update();
    renderer.render(scene, camera);

    // Update 2D hotspot projections
    const w = container.clientWidth;
    const h = container.clientHeight;
    for (const p of pins) {
      projVec.copy(p.pos3D).project(camera);
      const visible = projVec.z < 1 && (!roofGroup.visible || p.room.id === 'exterior');
      if (!visible) {
        p.el.style.display = 'none';
      } else {
        p.el.style.display = 'inline-flex';
        p.el.style.left = `${(projVec.x * 0.5 + 0.5) * w}px`;
        p.el.style.top = `${(-projVec.y * 0.5 + 0.5) * h}px`;
      }
    }
  }

  function startLoop() {
    if (!isPaused && rafId !== null) return;
    isPaused = false;
    rafId = requestAnimationFrame(tick);
  }

  function stopLoop() {
    isPaused = true;
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  // Primary: contentvisibilityautostatechange (direct listener on content-visibility: auto container)
  if ('contentVisibility' in document.documentElement.style) {
    container.addEventListener('contentvisibilityautostatechange', (event) => {
      if (event.skipped) stopLoop();
      else startLoop();
    });
  } else {
    // Fallback: IntersectionObserver for browsers without content-visibility support
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) startLoop();
          else stopLoop();
        });
      },
      { rootMargin: '200px' }
    );
    io.observe(container);
  }

  startLoop();

  return { setMode, focusFloor, setActivePin, flyToRoom(id) {
    const r = rooms.find((item) => item.id === id);
    if (r) {
      stopDrone();
      roofGroup.visible = r.id === 'exterior';
      flyTo(r.camera3D.pos, r.camera3D.target);
      setActivePin(id);
    }
  }};
}
