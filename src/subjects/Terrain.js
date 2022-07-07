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

  const peak = 2;
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

  //mesh.rotation.x = -Math.PI / 2.3;
  mesh.rotation.x = -Math.PI / 2.22;

  mesh.castShadow = true;
  mesh.receiveShadow = true;

  mesh.matrixAutoUpdate = true;
  mesh.updateMatrix();

  scene.add(mesh);

  addSunshade(0xff0000, 70, 10, 0) // red
  addSunshade(0x0000ff, 40, 16, -40) // blue
  addSunshade(0x0000ff, 0, 10, -15) // blue
  addSunshade(0x47C606, -40, 16, -40) // green
  addSunshade(0xff0000, -100, 16, -40) // red
  addSunshade(0xff0000, -75, 12, -10) // red
  addSunshade(0xE97451, -130, 14, -30) // orange
  addSunshade(0xff00ff, -160, 17, -50) //pink
  addSunshade(0x47C606, -195, 17, -25) // green

  addSunshade(0xff0000, -165, 17, -10) // green

  addSunshade(0xff0000, -212, 19, -50) // red
  addSunshade(0x0000ff, -179, 19, -75) // blue
  addSunshade(0x00ff00, -130, 19, -66) // green
  addSunshade(0xE97451, -70, 18, -60) // orange
  addSunshade(0xff00ff, 0, 18, -50) // pink
  addSunshade(0xE97451, 78, 18, -33) // orange
  
  addSunshade(0xff00ff, 65, 18, -55) // pink

  addBorderLaterais(95.1, -12, -20, 23, 266);
  addBorderLaterais(-235.2, -12, -20, 23, 266);

  addBorderCentrais(-70, -12, 113, 23, 331);

  addBorderCentrais(-70, -12, -153, 20, 331);
  addBorderCentrais(-70, 0, -153, 20, 331);
  addBorderCentrais(-70, 14, -153, 20, 331);

  addBorderFundo(-70, -23, -20, 267, 330);

  addBorderLateraisSand(95.1, -12, -20, 23, 266);

  addTriangleBorder(95, -3, -153);
  addTriangleBorder(-234, -3, -153);
  
  function addBorderLaterais(posX, posY, posZ, width, height) {
    const textureHood = new THREE.TextureLoader().load('/images/madeira2.jpg');
    const geometry = new THREE.PlaneGeometry(width, height)
    const material = new THREE.MeshBasicMaterial({ map: textureHood, side: THREE.DoubleSide })
    const plane = new THREE.Mesh(geometry, material)
    plane.position.set(posX, posY, posZ)
    plane.rotation.x = -Math.PI / 2;
    plane.rotation.y = 1.6
    scene.add(plane)
  }

  function addBorderCentrais(posX, posY, posZ, width, height) {
    const textureHood = new THREE.TextureLoader().load('/images/madeira2.jpg');
    const geometry = new THREE.PlaneGeometry(width, height)
    const material = new THREE.MeshBasicMaterial({ map: textureHood, side: THREE.DoubleSide })
    const plane = new THREE.Mesh(geometry, material)
    plane.position.set(posX, posY, posZ)
    plane.rotation.x = -Math.PI / 2;
    plane.rotation.y = 1.575
    plane.rotateX(Math.PI / 2)
    scene.add(plane)
  }

  function addBorderFundo(posX, posY, posZ, width, height) {
    const textureHood = new THREE.TextureLoader().load('/images/madeira2.jpg');
    const geometry = new THREE.PlaneGeometry(width, height)
    const material = new THREE.MeshBasicMaterial({ map: textureHood })
    const plane = new THREE.Mesh(geometry, material)
    plane.position.set(posX, posY, posZ)
    plane.rotation.x = -6.275 ;
    plane.rotation.y = 1.575
    plane.rotateX(Math.PI / 2)
    scene.add(plane)
  }

  function addBorderLateraisSand(posX, posY, posZ, width, height) {
    const textureHood = new THREE.TextureLoader().load('/images/madeira2.jpg');
    const geometry = new THREE.PlaneGeometry(width, height)
    const material = new THREE.MeshBasicMaterial({ map: textureHood, side: THREE.DoubleSide })
    const plane = new THREE.Mesh(geometry, material)
    plane.position.set(posX, posY, posZ)
    plane.rotation.x = -Math.PI / 2;
    plane.rotation.y = 1.6
    scene.add(plane)
  }

  function addTriangleBorder(posX, posY, posZ) {
    var geom = new THREE.Geometry(100, 100, 100);
    var v1 = new THREE.Vector3(0,0,0);
    var v2 = new THREE.Vector3(0,28,0);
    var v3 = new THREE.Vector3(180,0,0);

    geom.vertices.push(v1);
    geom.vertices.push(v2);
    geom.vertices.push(v3);

    geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
    geom.computeFaceNormals();

    var mesh = new THREE.Mesh(geom, new THREE.MeshBasicMaterial({ color: "rgb(255, 254, 181)", side: THREE.DoubleSide }));
    mesh.position.set(posX, posY, posZ);
    mesh.rotation.y = -Math.PI / 2;
    scene.add(mesh)
  }
  
  function addSunshade(color, x, y, z) {
    const group = new THREE.Group();

    const geometry = new THREE.ConeGeometry(7, 5, 9);
    const material = new THREE.MeshPhongMaterial({ color: color });
    const cone = new THREE.Mesh(geometry, material);
    cone.position.set(x, y, z);    
    cone.castShadow = true;
    cone.receiveShadow = true;
    group.add(cone);

    const geometry2 = new THREE.CylinderGeometry(0.5, 0.5, 10, 9);
    const material2 = new THREE.MeshPhongMaterial({ color: 0x000000 });
    const cylinder = new THREE.Mesh(geometry2, material2);
    cylinder.position.set(x, y - 3, z);
    cylinder.castShadow = true;
    cylinder.receiveShadow = true;
    group.add(cylinder);

    const texture = new THREE.TextureLoader().load( '/images/towel2.png' );
    const geometry3 = new THREE.PlaneGeometry(6, 12);
    const material3 = new THREE.MeshPhongMaterial({ map: texture });
    const plane = new THREE.Mesh(geometry3, material3);

    plane.position.set(x - 5, y - 6, z);
    plane.rotation.x = -Math.PI / 2.22;
    plane.castShadow = true;
    plane.receiveShadow = true;
    group.add(plane);

    scene.add(group);
  }

  this.update = function(time) {
  };
}

export default Terrain;
