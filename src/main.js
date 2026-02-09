import * as THREE from 'three';
import './style.css';
import { createVotingPlanets} from "../public/planets.js";

// Création de la scène
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xcccccc);

// La caméra
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 7;

// Le renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Créer les 3 planètes
const planets = createVotingPlanets();

// Ajouter chaque planète à la scène
planets.forEach(planet => {
    scene.add(planet);
});

// Lumières
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(10, 15, 15);
scene.add(directionalLight);

//le raycatsing va permettre que lorsqu'on clique sur une planete qu;il y'ait une action
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function getMousePosition(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onMouseClick(event) {
    getMousePosition(event);
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(planets);

    if (intersects.length > 0) {
        const clickedPlanet = intersects[0].object;
        const planetIndex = planets.indexOf(clickedPlanet);
    }
}

window.addEventListener('click', onMouseClick);

// Animation
function animate() {
    requestAnimationFrame(animate);
    planets.forEach(planet => {
        planet.rotation.y += 0.02;
    });

    renderer.render(scene, camera);
}

animate();
