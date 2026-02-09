import * as THREE from 'three';
import './style.css';
import {color, metalness, roughness} from "three/tsl";

//creation de la scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000428);

//la cam
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 5;

//le renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


//creer la planete
const geometry = new THREE.SphereGeometry(
    1,
    32,
    32
);

const material = new THREE.MeshStandardMaterial({
    color: 0x4a90e2,
    roughness: 0.5,
    metalness: 0.3
});

const planet = new THREE.Mesh(
    geometry,
    material
)

scene.add(planet);

const ambientLight = new THREE.AmbientLight(
    0xffffff,
    0.3
)

scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(
    0xffffff,
    0.8
);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();