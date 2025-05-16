import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.153.0/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 10;

const group = new THREE.Group();
const size = 1;
const spacing = 0.05;
const offset = (3 * size + 2 * spacing) / 2;

const loader = new THREE.TextureLoader();
const textures = [
  'textures/mona-lisa.jpg',
  'textures/starry-night.jpg',
  'textures/persistence-of-memory.jpg',
  'textures/scream.jpg',
  'textures/girl-with-a-pearl-earring.jpg',
  'textures/the-kiss.jpg'
];

// Crea cubos 3x3x3
for(let x=0; x<3; x++) {
  for(let y=0; y<3; y++) {
    for(let z=0; z<3; z++) {
      const geometry = new THREE.BoxGeometry(size, size, size);

      // Materiales por cara con texturas o color
      const materials = [];

      for(let i=0; i<6; i++) {
        let mat;
        if (i < textures.length) {
          mat = new THREE.MeshBasicMaterial({map: loader.load(textures[i])});
        } else {
          mat = new THREE.MeshBasicMaterial({color: 0xffffff});
        }
        materials.push(mat);
      }

      const cube = new THREE.Mesh(geometry, materials);

      cube.position.set(
        x * (size + spacing) - offset + size/2,
        y * (size + spacing) - offset + size/2,
        z * (size + spacing) - offset + size/2
      );

      group.add(cube);
    }
  }
}

scene.add(group);

// Añade líneas para bordes
const edges = new THREE.EdgesGeometry(new THREE.BoxGeometry(size, size, size));
const lineMaterial = new THREE.LineBasicMaterial({color: 0x000000, linewidth: 1});
const edgesMesh = new THREE.LineSegments(edges, lineMaterial);
group.add(edgesMesh);

function animate() {
  requestAnimationFrame(animate);
  group.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

