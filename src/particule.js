import * as THREE from 'three';

export function addParticles(planet, color) {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    for (let i = 0; i < 300; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 1.8 + Math.random() * 0.4;
        vertices.push(
            Math.cos(angle) * radius,
            (Math.random() - 0.5) * 0.3,
            Math.sin(angle) * radius
        );
    }

    geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(vertices, 3)
    );

    const material = new THREE.PointsMaterial({
        color,
        size: 0.05,
        transparent: true,
        opacity: 0.8
    });

    const particles = new THREE.Points(geometry, material);
    planet.add(particles);
    planet.userData.particles = particles;
}
