import * as THREE from 'three';
// import {SimplifyModifier} from '../utils/SimplifyModifier';
import 'simplex-noise';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

function Rock(scene, surface) {
  const meshes = [];

  function addToScene(mesh, position, rotation, scale) {
    const newMesh = mesh.clone();

    newMesh.scale.set(
        scale,
        scale,
        scale);

    newMesh.rotation.set(
        rotation[0],
        rotation[1],
        rotation[2]);

    newMesh.position.set(
        position[0],
        position[1],
        position[2]);

    scene.add(newMesh);
    newMesh.matrixAutoUpdate = false;
    newMesh.updateMatrix();
    meshes.push(newMesh);
  }

  const loader = new GLTFLoader();
  loader.load( 'objects/rock_03.glb', function( gltf ) {
    const mesh = gltf.scene.children[0];

    mesh.material = new THREE.MeshPhongMaterial({
      flatShading: true,
      color: 0x7787aa,
      shininess: 0,
    });

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    addToScene(mesh, [20, -5.5, 33], [0, 0, 3], 9);
    addToScene(mesh, [5, -2.2, 3], [3, 0, 0], 7);
    addToScene(mesh, [-3, -3, 0],[1, 2, 0],8);
    addToScene(mesh, [-12, -9, 27], [1, 2, 0.5], 8);
    addToScene(mesh, [47, -4, 3], [0, 1, 0], 10);
    addToScene(mesh, [24, 0, -14], [0, 1, 0], 7);

    addToScene(mesh, [-20, 0, 10], [2, 2, 1], 6);
    addToScene(mesh, [-23, -10, 50], [2, 2, 1], 6);
    addToScene(mesh, [-30, -13, 70], [2, 5, 1], 8);
    addToScene(mesh, [-60, -8, 30], [2, 2, 1], 12);
    
    addToScene(mesh, [70, -8, 50], [1, 5, 1], 15);
    addToScene(mesh, [0, -12, 50], [1, 5, 1], 7);
    addToScene(mesh, [10, -15, 75], [1, 5, 1], 7);
    addToScene(mesh, [27, -11, 48], [5, 5, 1], 8);
    
    addToScene(mesh, [-165, -6, 48], [1, 4, 2], 15);
    addToScene(mesh, [-130, -12, 70], [3, 2, 1], 7);
    addToScene(mesh, [-100, -10, 48], [1, 4, 2], 6);
    addToScene(mesh, [-80, -13, 70], [3, 3, 0.5], 8);

    addToScene(mesh, [-110, -6, 5], [0.5, 0.5, 0.5], 9);

    addToScene(mesh, [-150, -6, 40], [0.5, 0.5, 0.5], 9);
    addToScene(mesh, [-200, -5.5, 60], [2.7, 4, 1.7], 4);
    addToScene(mesh, [-215, -4, 30], [2.7, 4, 1.7], 6);
  
  }, undefined, function (error) {
    console.error( error );
  } );

  this.update = function(time) {
  };
}

export default Rock;
