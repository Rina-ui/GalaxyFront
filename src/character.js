import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import gsap from 'gsap';
import * as THREE from 'three';

export function loadCharacter(scene) {
    const loader = new GLTFLoader();

    loader.load('/model/character.glb', (gltf) => {
        const fox = gltf.scene;

        fox.scale.set(0.05, 0.05, 0.05);
        fox.position.set(-6, -10, 1);
        fox.rotation.y = Math.PI / 4;

        scene.add(fox);

        // ANIMATION SPECTACULAIRE
        const timeline = gsap.timeline();

        timeline
            .to(fox.position, {
                y: -3.5,
                x: -6,
                duration: 1,
                ease: "bounce.out"
            })
            .to(fox.rotation, {
                y: Math.PI / 2,
                duration: 0.8,
                ease: "power2.out"
            }, 0)
            // Rebond
            .to(fox.position, {
                y: -3,
                duration: 0.6,
                ease: "bounce.out"
            })
            // Se stabilise
            .to(fox.position, {
                x: -6,
                duration: 0.5,
                ease: "power2.inOut"
            });

        // Message bienvenue (après 0.5s)
        setTimeout(() => {
            showWelcomeMessage();
        }, 500);
    });
}

function showWelcomeMessage() {
    const message = document.getElementById('welcome-message');

    gsap.timeline()
        .to(message, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)"
        })
        .to(message, {
            opacity: 0,
            scale: 0.8,
            duration: 0.5,
            delay: 2
        });
}