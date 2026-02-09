import * as THREE from 'three';

export function createPlanet(color, positionX, size) {
    const geometry = new THREE.SphereGeometry(size, 45, 45);

    const material = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.5,
        metalness: 0.3
    });

    const planet = new THREE.Mesh(geometry, material);
    planet.position.x = positionX;

    return planet;  // ← IMPORTANT ! Retourner la planète
}

export function createVotingPlanets() {
    const planets = [];

    const planet1 = createPlanet(
        0xff6b6b,
        -3,
        1
    );
    planets.push(planet1);

    const planet2 = createPlanet(
       0x564787,
        0,
        1
);
    planets.push(planet2);

    const planet3 = createPlanet(
        0xa6e1fa,
        3,
        1
);
    planets.push(planet3);

    return planets;
}