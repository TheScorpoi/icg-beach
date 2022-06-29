import * as THREE from 'three';
import vert from '../shaders/sand.vert';
import frag from '../shaders/sand.frag';

function Sand(scene, sandDimensions) {

    const sandTexture = new THREE.TextureLoader().load('assets/sand.png');
    sandTexture.wrapS = THREE.RepeatWrapping;
    sandTexture.wrapT = THREE.RepeatWrapping;
    sandTexture.repeat.set(4, 4);
    //sandTexture.repeat.set(sandDimensions.width, sandDimensions.height);

    const mesh = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(sandDimensions.width, sandDimensions.height, 60, 60),
        [
            new THREE.ShaderMaterial({
                transparent: true,
                vertexShader: vert,
                fragmentShader: frag,
                uniforms: THREE.ShaderLib.phong.uniforms,
            }),
            new THREE.MeshBasicMaterial({
                map: sandTexture,
            }),
        ]
    );

    mesh.geometry.clearGroups();
    mesh.geometry.addGroup(0, sandDimensions.width, 0);
    mesh.geometry.addGroup(0, sandDimensions.width, 1);

    mesh.position.set(1, 1, 1);

    const peak = 1.5;
    const smoothing = 12000 / terrainDimensions[1];
    const vertices = mesh.geometry.attributes.position.array;
  
    const simplex = new SimplexNoise('2');
  
    for (let i = 0; i <= vertices.length; i += 3) {
      vertices[i+2] = peak * simplex.noise2D(
          vertices[i] / smoothing,
          vertices[i+1] / smoothing);
    }
    mesh.geometry.attributes.position.needsUpdate = true;
    mesh.geometry.computeVertexNormals()

    mesh.rotation.x = -Math.PI / 2.3;

    // mesh.castShadow = true;
    mesh.receiveShadow = true;

    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();

    scene.add(mesh);


    this.update = function(time) {
    };
}

export default Sand;