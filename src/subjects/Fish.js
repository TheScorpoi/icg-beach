import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Reflector } from 'three/examples/jsm/objects/Reflector'

function Fish(scene) {
  const mixer = new THREE.AnimationMixer( scene );

  const loader = new GLTFLoader( );

  var colors = [
    0x0000ff,
    0x00ff00,
    0xff0000,
  ];

  // const mirrorBack1 = new Reflector(
  //   new THREE.PlaneBufferGeometry(100, 500),
  //   {
  //       color: new THREE.Color(0x7f7f7f),
  //       textureWidth: window.innerWidth * window.devicePixelRatio,
  //     textureHeight: window.innerHeight * window.devicePixelRatio,
  //   }
  // )
  // mirrorBack1.position.set(47, 0, 110);
  // mirrorBack1.rotation.z = -Math.PI / 2;
  // mirrorBack1.rotation.y = -Math.PI;
  // scene.add(mirrorBack1);

  const mirrorBack2 = new Reflector(
    new THREE.PlaneBufferGeometry(100, 500),
    {
        color: new THREE.Color(0x7f7f7f),
        textureWidth: window.innerWidth * window.devicePixelRatio,
        textureHeight: window.innerHeight * window.devicePixelRatio
    }
  )
  mirrorBack2.position.set(-30, 0, -140);
  mirrorBack2.rotation.z = -Math.PI / 2;
  //scene.add(mirrorBack2);
  
  
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

    addMorph(mesh, clip, 0.6, 16, -3, 12);
    addMorph(mesh, clip, 1.2, 13, -3, 8);
    addMorph(mesh, clip, 2.2, 12, -3, 10);
    addMorph(mesh, clip, 3.4, 12, -3, 7);

    addMorph(mesh, clip, 4.1, 13, -3, 8);
    addMorph(mesh, clip, 5.6, 11, -3, 5);
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
    gltf.scene.scale.set(-3, 5, 19);
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

    addMorph(mesh, clip, 0, 7.2, -2, 11);
    addMorph(mesh, clip, 1.3, 8, -1, 11);
    addMorph(mesh, clip, 2.5, 9, -1, 11);
    addMorph(mesh, clip, 2.9, 7, -1, 11);
  });

  loader.load('images/cloud.png',
  function onLoad(texture) {
    const smokeGeo = new THREE.PlaneBufferGeometry(30, 30);

      smokeMaterial = new THREE.MeshLambertMaterial({
          map: texture,
          transparent: true
      });

      for (let p = 0, l = 350; p < l; p++) {
          let particle = new THREE.Mesh(smokeGeo, smokeMaterial);

          particle.position.set(10, 10, 10);

          particle.rotation.z = Math.random() * 360;
          scene.add(particle);
          smokeParticles.push(particle);
      }

    });
  
  loader.load( 'objects/boat.glb', function( gltf ) {
    gltf.scene.scale.set(3, 3, 3);
    const clip = gltf.animations[0];
    const mesh = gltf.scene;

    mesh.traverse(function(child) {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshBasicMaterial(
          {
            color: new THREE.Color(0x9ca998),
            morphTargets: false,
          }
        );
        child.receiveShadow = true;
        child.castShadow = true;
      }
    });

    addMorphBoat(mesh, clip, 0, -10, -3, 65);
  });

  loader.load( 'objects/boat.glb', function( gltf ) {
    gltf.scene.scale.set(4, 4, 4);
    const clip = gltf.animations[0];
    const mesh = gltf.scene;

    mesh.traverse(function(child) {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshBasicMaterial(
          {
            color: new THREE.Color(0xfd3456),
            morphTargets: false,
          }
        );
        child.receiveShadow = true;
        child.castShadow = true;
      }
    });

    addMorphBoat(mesh, clip, 0, -100, -3, 70);
  });

  loader.load( 'objects/fish_10.glb', function( gltf ) {
    gltf.scene.scale.set(10, 10, 10);
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
  });
  
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

  

    addMorph(mesh, clip, 0, -40, -3, 5);
    addMorph(mesh, clip, 1.2, -40, -3, 5);
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

    addMorph(mesh, clip, 0, -70, -3, 5);
    addMorph(mesh, clip, 1.2, -73, -3, 5);
    addMorph(mesh, clip, 2.2, -71, -3, 8);
    addMorph(mesh, clip, 3.2, -76, -3, 11);
    addMorph(mesh, clip, 4.2, -79, -3, 12);
  });

  loader.load( 'objects/fish_10.glb', function( gltf ) {
    gltf.scene.scale.set(20, 20, 20);
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

    addMorph(mesh, clip, 0, -110, 0, -20);
    addMorph(mesh, clip, 1.2, -110, 0, -20);
    addMorph(mesh, clip, 2.2, -110, 0, -20);
    addMorph(mesh, clip, 6.2, -110, 0, -20);
    addMorph(mesh, clip, 8.2, -110, 0, -20);
  });


  this.update = function(deltaTime) {
    mixer.update( deltaTime );
  };

  function addMorph( mesh, clip, timeOffset, x, y, z ) {
    mesh = mesh.clone();
    mixer.clipAction( clip, mesh ).
        setDuration(25).
        startAt( timeOffset ).
        play();

    mesh.position.set( x, y, z );

    scene.add( mesh );
  }

  function addMorphBoat( mesh, clip, timeOffset, x, y, z ) {
    mesh = mesh.clone();
    mixer.clipAction( clip, mesh ).
        setDuration(400).
        startAt( timeOffset ).
        play();

    mesh.position.set(x, y, z);
    mesh.rotation.x = 3;

    scene.add( mesh );
  }
}

export default Fish;
