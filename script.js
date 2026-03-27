const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create text texture
function createTextTexture(text) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#222';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const lines = text.split('\n');

  const nameFontSize = 22;
  const seatFontSize = 18;

  const totalHeight = nameFontSize + seatFontSize + 10;
  let startY = canvas.height / 2 - totalHeight / 2;

  // Name
  ctx.font = `bold ${nameFontSize}px Arial`;
  ctx.fillText(lines[0] || '', canvas.width / 2, startY + nameFontSize);

  // Seat
  ctx.font = `bold ${seatFontSize}px Arial`;
  ctx.fillText(lines[1] || '', canvas.width / 2, startY + nameFontSize + seatFontSize + 10);

  return new THREE.CanvasTexture(canvas);
}

const geometry = new THREE.BoxGeometry();

const text = 'Mudassir Naqvi\nB20102163';

const materials = [
  new THREE.MeshBasicMaterial({ map: createTextTexture(text) }),
  new THREE.MeshBasicMaterial({ map: createTextTexture(text) }),
  new THREE.MeshBasicMaterial({ map: createTextTexture(text) }),
  new THREE.MeshBasicMaterial({ map: createTextTexture(text) }),
  new THREE.MeshBasicMaterial({ map: createTextTexture(text) }),
  new THREE.MeshBasicMaterial({ map: createTextTexture(text) })
];

const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);

camera.position.z = 3;

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
