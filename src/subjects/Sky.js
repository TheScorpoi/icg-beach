import * as THREE from 'three';


function Sky(scene) {
  const skyGeometry = new THREE.SphereGeometry(1000, 60, 40);
  const skyMaterial = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('images/cloud.jpg'),
    side: THREE.BackSide,
  });
  const sky = new THREE.Mesh(skyGeometry, skyMaterial);
  scene.add(sky);
}