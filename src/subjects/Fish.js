import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

function Fish(scene) {
  let fish;
  const mixer = new THREE.AnimationMixer( scene );

  const loader = new GLTFLoader( );

  var colors = [
    0x0000ff,
    0x00ff00,
    0xff0000,
    0xffff00,
  ];

  // const materialObj = new THREE.MeshBasicMaterial( {
  //   color: colors[Math.floor(Math.random() * colors.length)],
  //   morphTargets: true,
  // });

  loader.load( 'objects/fish_10.glb', function( gltf ) {
    gltf.scene.scale.set(8, 8, 8);
    const clip = gltf.animations[0];
    const mesh = gltf.scene;

    mesh.traverse(function(child) {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshBasicMaterial(
          {
          color: colors[Math.floor(Math.random() * colors.length)],
          morphTargets: true,
          }
        );
        child.receiveShadow = true;
        child.castShadow = true;
      }
    });

    addMorph(mesh, clip, 0, 16, -3, 12);
    addMorph(mesh, clip, 1.2, 13, -3, 8);
    addMorph(mesh, clip, 5.5, 12, -3, 10);
    addMorph(mesh, clip, 6.7, 12, -3, 7);

    addMorph(mesh, clip, 3.1, 13, -3, 8);
    addMorph(mesh, clip, 4.4, 11, -3, 5);
  } );

  loader.load( 'objects/fish_11.glb', function( gltf ) {
    gltf.scene.scale.set(8, 8, 8);
    const clip = gltf.animations[0];
    const mesh = gltf.scene;

    mesh.traverse(function(child) {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshBasicMaterial(
          {
          color: colors[Math.floor(Math.random() * colors.length)],
          morphTargets: true,
          }
        );
        child.receiveShadow = true;
        child.castShadow = true;
      }
    });

    addMorph(mesh, clip, 0.8, 12, -2, 15);
    addMorph(mesh, clip, 2.3, 7, -1, 11);
  } );

  loader.load( 'objects/fish_11.glb', function( gltf ) {
    gltf.scene.scale.set(-11, 7, 17);
    const clip = gltf.animations[0];
    const mesh = gltf.scene;

    mesh.traverse(function(child) {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshBasicMaterial(
          {
          color: colors[Math.floor(Math.random() * colors.length)],
          morphTargets: true,
          }
        );
        child.receiveShadow = true;
        child.castShadow = true;
      }
    });

    addMorph(mesh, clip, 0, 12, -2, 15);
    addMorph(mesh, clip, 1.3, 7, -1, 11);
  } );

  loader.load( 'objects/fish_10.glb', function( gltf ) {
    gltf.scene.scale.set(8, 8, 8);
    const clip = gltf.animations[0];
    const mesh = gltf.scene;

    mesh.traverse(function(child) {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshBasicMaterial(
          {
          color: colors[Math.floor(Math.random() * colors.length)],
          morphTargets: true,
          }
        );
        child.receiveShadow = true;
        child.castShadow = true;
      }
    });

    addMorph(mesh, clip, 0, 16, -3, 12);
    addMorph(mesh, clip, 1.2, 13, -3, 8);
  } );

  this.update = function(deltaTime) {
    mixer.update( deltaTime );
  };

  function addMorph( mesh, clip, timeOffset, x, y, z ) {
    mesh = mesh.clone();
    mixer.clipAction( clip, mesh ).
        setDuration(10.3).
        startAt( timeOffset ).
        play();

    mesh.position.set( x, y, z );

    scene.add( mesh );
  }
}

export default Fish;
