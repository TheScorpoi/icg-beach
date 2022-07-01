import * as THREE from 'three';

function Tractor(scene) {

    createTractor();

    function createTractor() {
        
        const tractor = new THREE.Group();
        tractor.name = 'tractor';

        const geometryChassi = new THREE.BoxGeometry(30, 10, 15);
        const materialChassi = new THREE.MeshStandardMaterial({ color: 0x0000ff, side: THREE.DoubleSide });
        const chassi = new THREE.Mesh(geometryChassi, materialChassi);
        chassi.position.set(-0, 20, 0);

        tractor.add(chassi);
        
        const geometryCabin = new THREE.BoxGeometry(9.5, 9.5, 9.5);
        const materialCabin = new THREE.MeshStandardMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
        const cabin = new THREE.Mesh(geometryCabin, materialCabin);
        cabin.position.set(8, 27, 0);

        tractor.add(cabin);
        tractor.add(createWheels(8, 18, 0, 6, 6, 20));
        tractor.add(createWheels(-8, 15, 0, 3, 3, 20));

        tractor.position.set(0, 3, -90);
        tractor.rotation.x = 0.2;
        tractor.rotation.y = -0.1
        scene.add(tractor);
    }

    function createWheels(x, y, z, c1, c2, c3) {
        const geometrywheels = new THREE.CylinderGeometry(c1, c2, c3, 32);
        const materialwheels = new THREE.MeshStandardMaterial({ color: 0x000000, side: THREE.DoubleSide });
        const wheel = new THREE.Mesh(geometrywheels, materialwheels);
        wheel.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
        wheel.position.set(x, y, z);
        return wheel;
      }

    this.update = function(deltaTime) {}
}

export default Tractor;