import * as THREE from 'three';
import frag from '../shaders/Water.frag';
import vert from '../shaders/Water.vert';


function Water(scene, camera, terrainDimensions, screenDimensions) {
  const material = new THREE.ShaderMaterial( {
    uniforms: {
      espuma: {value: null},
      agua: {value: null},
      screenSize: new THREE.Uniform([
        screenDimensions.width * screenDimensions.DPR,
        screenDimensions.height * screenDimensions.DPR,
      ]),
      ondas: {
        value: 0.0,
      },
      cameraNear: {value: camera.near},
      cameraFar: {value: camera.far},
    },
    vertexShader: vert,
    fragmentShader: frag,
    transparent: false,
    depthWrite: true,
  });

  const mesh = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(terrainDimensions[0], terrainDimensions[1]/2, 100, 100), material);

  mesh.rotateX(Math.PI / -2);
  mesh.position.set(-70, -0.909999999999999, 50);
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  scene.add(mesh);

  let MARE_CHEIA = false;

  this.update = function(deltaTime, colorTarget, depthTarget) {
    material.uniforms.espuma.value = depthTarget.texture;
    material.uniforms.agua.value = colorTarget.texture;
    material.uniforms.ondas.value += deltaTime + 0.0045; //fazer as ondas
    // Low and high the water level animation
    if (mesh.position.y <= 2 && !MARE_CHEIA) {
      // console.log(mesh.position.y)
      mesh.position.y += 0.0025;
      if (mesh.position.y == 1.9999999999999611) {
        MARE_CHEIA = true;
      }
    } else {
      if (mesh.position.y > -1 && MARE_CHEIA) {
        // console.log(mesh.position.y)
        mesh.position.y -= 0.0025;
        if (mesh.position.y == -0.999999999999997) {
          // console.log("ca dentro: " + mesh.position.y)
          MARE_CHEIA = false;
        } 
      }
    }
  };

  this.onResize = function(screenDimensions) {
    material.uniforms.screenSize = new THREE.Uniform([
      screenDimensions.width * screenDimensions.DPR,
      screenDimensions.height * screenDimensions.DPR,
    ]);
  };
}

export default Water;


