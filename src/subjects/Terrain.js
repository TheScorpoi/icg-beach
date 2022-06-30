import * as THREE from 'three';
import 'simplex-noise';
import vert from '../shaders/Sand.vert';
import frag from '../shaders/Sand.frag';


function Terrain(scene, terrainDimensions) {
  const texture = new THREE.TextureLoader().load( '/images/cartoon-sand.png' );
  texture.wrapT = THREE.RepeatWrapping;
  //texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.set( 8, 8 );

  const mesh = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(terrainDimensions[0], terrainDimensions[1], 60, 60),
      [
        new THREE.ShaderMaterial({
          transparent: true,
          vertexShader: vert,
          fragmentShader: frag,
          uniforms: THREE.ShaderLib.phong.uniforms,
        }),
        new THREE.MeshPhongMaterial({
          map: texture,
          shininess: 0,
        }),
      ]
  );

  mesh.geometry.clearGroups();
  mesh.geometry.addGroup( 0, Infinity, 0 );
  mesh.geometry.addGroup( 2.5, Infinity, 0 );
  mesh.geometry.addGroup( 0, Infinity, 1 );

  mesh.position.set(-70, 6, -30);

  const peak = 1.5;
  const smoothing = 12000 / terrainDimensions[1];
  const vertices = mesh.geometry.attributes.position.array;

  const simplex = new SimplexNoise('15');

  for (let i = 0; i <= vertices.length; i += 3) {
    vertices[i+2] = peak * simplex.noise2D(
        vertices[i] / smoothing,
        vertices[i+1] / smoothing);
  }
  mesh.geometry.attributes.position.needsUpdate = true;
  mesh.geometry.computeVertexNormals();

  mesh.rotation.x = -Math.PI / 2.3;

  mesh.castShadow = true;
  mesh.receiveShadow = true;

  mesh.matrixAutoUpdate = true;
  mesh.updateMatrix();

  scene.add(mesh);

  addSunshade(0xff0000, 70, 10, 0)
  addSunshade(0x0000ff, 40, 16, -40)
  addSunshade(0x00ff00, -40, 16, -40)
  addSunshade(0xff0000, -100, 16, -40)
  addSunshade(0xff0000, -75, 10, -10)

  function addSunshade(color, x, y, z) {
    const group = new THREE.Group();

    const geometry = new THREE.ConeGeometry(7, 5, 9);
    const material = new THREE.MeshPhongMaterial({ color: color });
    const cone = new THREE.Mesh(geometry, material);
    cone.position.set(x, y, z);    
    cone.castShadow = true;
    cone.receiveShadow = true;
    group.add(cone);

    const geometry2 = new THREE.CylinderGeometry(0.5, 0.5, 9, 9);
    const material2 = new THREE.MeshPhongMaterial({ color: 0x000000 });
    const cylinder = new THREE.Mesh(geometry2, material2);
    cylinder.position.set(x, y - 3, z);
    cylinder.castShadow = true;
    cylinder.receiveShadow = true;
    group.add(cylinder);

    scene.add(group);
  }

  this.update = function(time) {
  };
}

export default Terrain;
