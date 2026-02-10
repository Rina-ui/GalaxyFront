import * as THREE from 'three';

export function createPlanet(color, position) {
    const group = new THREE.Group();

    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(1, 64, 64),
        new THREE.MeshPhysicalMaterial({
            color,
            transmission: 0.85,
            roughness: 0.2,
            thickness: 1,
            emissive: color,
            emissiveIntensity: 0.3
        })
    );

    const ring = new THREE.Mesh(
        new THREE.RingGeometry(1.4, 1.6, 64),
        new THREE.MeshBasicMaterial({
            color,
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide
        })
    );

    ring.rotation.x = Math.PI / 2;
    ring.scale.set(0, 0, 0);

    group.add(sphere);
    group.add(ring);

    group.position.set(...position);

    group.userData = {
        votes: 0,
        level: 0,
        sphere,
        ring,
        particles: null
    };

    return group;
}
