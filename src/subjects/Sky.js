import * as THREE from 'three';
  
function Sky(scene) {

  const loader = new THREE.TextureLoader();
  let smokeParticles = [];

  [].forEach.call(smokeParticles, sp => {
    sp.rotation.z += delta * 0.2;
  });

  loader.load('images/cloud3.png',
  function onLoad(texture) {
    const smokeGeo = new THREE.PlaneBufferGeometry(60, 60);
    let smokeMaterial = new THREE.MeshPhongMaterial({
        map: texture,
        transparent: true,
    });

      for (let p = 0, l = 1; p < l; p++) {
        let particle = new THREE.Mesh(smokeGeo, smokeMaterial);

        particle.position.set(
          -100,
          40,
          -30
      );

        scene.add(particle);
        smokeParticles.push(particle);
      }
    });

  this.update = function (deltaTime) {
    [].forEach.call(smokeParticles, sp => {
      sp.position.x += deltaTime * 2;
    });
  }
}

export default Sky;