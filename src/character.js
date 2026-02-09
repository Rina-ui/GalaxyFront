import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function loadCharacter(scene) {
    // Créer le loader
    const loader = new GLTFLoader();

    // Charger le modèle
    loader.load(
        '/model/character.glb',

        // Succès
        (gltf) => {
            const character = gltf.scene;
            // Il sera en bas au centre de l'écran
            character.position.set(
            0,
            -2,
            2
        );
            character.scale.set(
            0.02,
            0.02,
            0.02
        );
            scene.add(character);

            console.log('Renard chargé !');
        },

        // Progression
        (progress) => {
            const percent = (progress.loaded / progress.total) * 100;
            console.log(`Chargement: ${percent.toFixed(0)}%`);
        },

        // Erreur
        (error) => {
            console.error('Erreur:', error);
        }
    );
}