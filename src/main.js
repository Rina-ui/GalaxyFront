import * as THREE from 'three';
import gsap from 'gsap';
import './style.css';
import { createPlanet } from './planets.js';
import { addParticles } from './particule.js';

// SCENE
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050714);
scene.fog = new THREE.Fog(0x050714, 6, 18);

// CAMERA
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 8;

// RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
document.body.appendChild(renderer.domElement);

// LIGHTS
scene.add(new THREE.AmbientLight(0xffffff, 0.4));
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

// PLANETS
const planets = [
    createPlanet(0xff4d4d, [-3, 0, 0]),
    createPlanet(0xa855f7, [0, 0, 0]),
    createPlanet(0x38bdf8, [3, 0, 0])
];

planets.forEach(p => scene.add(p));

// RAYCAST
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let hovered = null;

function updateMouse(e) {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
}

// CLICK = GAME ACTION
window.addEventListener('click', e => {
    updateMouse(e);
    raycaster.setFromCamera(mouse, camera);

    const hit = raycaster.intersectObjects(planets, true)[0];
    if (!hit) return;

    const planet = hit.object.parent;
    planet.userData.votes++;
    const v = planet.userData.votes;

    // SCALE
    gsap.to(planet.scale, {
        x: 1 + v * 0.12,
        y: 1 + v * 0.12,
        z: 1 + v * 0.12,
        duration: 0.4,
        ease: 'power3.out'
    });

    // FLASH
    gsap.to(planet.userData.sphere.material, {
        emissiveIntensity: 1,
        duration: 0.2,
        yoyo: true,
        repeat: 1
    });

    // LEVELS
    if (v === 3 && planet.userData.level < 1) {
        planet.userData.level = 1;
        gsap.to(planet.userData.ring.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.6,
            ease: 'back.out(2)'
        });
    }

    if (v === 5 && !planet.userData.particles) {
        addParticles(planet, planet.userData.sphere.material.color);
    }

    if (v === 10) {
        gsap.to(planet.position, { y: 1.5, duration: 0.6 });
        gsap.to(scene.background, {
            r: planet.userData.sphere.material.color.r,
            g: planet.userData.sphere.material.color.g,
            b: planet.userData.sphere.material.color.b,
            duration: 1
        });
    }
});

// HOVER
window.addEventListener('mousemove', e => {
    updateMouse(e);
    raycaster.setFromCamera(mouse, camera);

    const hit = raycaster.intersectObjects(planets, true)[0];
    if (hit) {
        const p = hit.object.parent;
        if (hovered !== p) {
            hovered = p;
            document.body.style.cursor = 'pointer';
            gsap.to(p.scale, { x: 1.1, y: 1.1, z: 1.1 });
        }
    } else {
        if (hovered) {
            gsap.to(hovered.scale, { x: 1, y: 1, z: 1 });
            hovered = null;
            document.body.style.cursor = 'default';
        }
    }
});

// RESIZE
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// LOOP
function animate() {
    planets.forEach(p => {
        p.rotation.y += 0.003;
        if (p.userData.particles) {
            p.userData.particles.rotation.y += 0.02;
        }
    });

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();
