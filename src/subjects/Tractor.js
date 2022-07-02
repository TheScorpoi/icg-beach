import * as THREE from 'three';

function Tractor(scene) {

    let tractor = createTractor();

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
        tractor.add(createAlfaia());
        

        tractor.position.set(0, 4, -100);
        tractor.rotation.x = 0.2;
        tractor.rotation.y = -0.1

        scene.add(tractor);

        return tractor;
    }

    function createAlfaia() {
        const alfaia = new THREE.Group();
        alfaia.name = 'alfaia';

        const geometryAlfaia = new THREE.BoxGeometry(15, 1.5, 25);
        const materialAlfaia = new THREE.MeshStandardMaterial({ color: 0xff0000, side: THREE.DoubleSide });
        const base = new THREE.Mesh(geometryAlfaia, materialAlfaia);
        base.position.set(28, 15, 0);

        let light_wing1 = new THREE.SpotLight(0xffffff, 2.5, 1, 0.5, 0.4);
        light_wing1.castShadow = true;
        
        let lightT = new THREE.Object3D();
        light_wing1.target = lightT;
        alfaia.add(light_wing1, lightT);

        const geometryRotor = new THREE.BoxGeometry(5, 5, 5);
        const materialRotor = new THREE.MeshStandardMaterial({ color: 0x0000ff, side: THREE.DoubleSide });
        const rotor = new THREE.Mesh(geometryRotor, materialRotor);
        rotor.position.set(28, 18, 0);

        const geometryCardan = new THREE.BoxGeometry(23, 1, 1);
        const materialCardan = new THREE.MeshStandardMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
        const cardan = new THREE.Mesh(geometryCardan, materialCardan);
        cardan.position.set(18, 19, 0);

        const geometryBracoEsq = new THREE.BoxGeometry(20, 1, 1);
        const materialBracoEsq = new THREE.MeshStandardMaterial({ color: 0x000000, side: THREE.DoubleSide });
        const bracoEsq = new THREE.Mesh(geometryBracoEsq, materialBracoEsq);
        bracoEsq.position.set(17, 18, 5);
        bracoEsq.rotateY(-0.3);
        bracoEsq.rotateZ(-0.3);

        const geometryBracoDir = new THREE.BoxGeometry(20, 1, 1);
        const materialBracoDir = new THREE.MeshStandardMaterial({ color: 0x000000, side: THREE.DoubleSide });
        const bracoDir = new THREE.Mesh(geometryBracoDir, materialBracoDir);
        bracoDir.position.set(17, 18, -5);
        bracoDir.rotateY(0.3);
        bracoDir.rotateZ(-0.3);

        const geometryCorrente = new THREE.BoxGeometry(10, 0.25, 2);
        const materialCorrente = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide });
        const correnteEsq = new THREE.Mesh(geometryCorrente, materialCorrente);
        correnteEsq.position.set(27, 12.5, -5);
        correnteEsq.name = "correnteEsq";

        const correnteDir = new THREE.Mesh(geometryCorrente, materialCorrente);
        correnteDir.position.set(27, 12.5, 5);
        correnteDir.name = "correnteDir";

        alfaia.position.set(7, 0, 0);

        alfaia.add(base);
        alfaia.add(rotor);
        alfaia.add(cardan);

        alfaia.add(bracoEsq);
        alfaia.add(bracoDir);

        alfaia.add(correnteEsq)
        alfaia.add(correnteDir)

        return alfaia;
    }

    function createWheels(x, y, z, c1, c2, c3) {
        const geometrywheels = new THREE.CylinderGeometry(c1, c2, c3, 32);
        const materialwheels = new THREE.MeshStandardMaterial({ color: 0x000000, side: THREE.DoubleSide });
        const wheel = new THREE.Mesh(geometrywheels, materialwheels);
        wheel.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
        wheel.position.set(x, y, z);
        return wheel;
    }
    
    var S = false;var W = false;var A = false;var D = false;
    document.addEventListener("keydown", onDocumentKeyDown, false);
    document.addEventListener("keyup", onDocumentKeyUp, false);
    function onDocumentKeyUp(event) {
      switch (event.keyCode) {
        case 83: //s
              S = false;
              break;
        case 87: //w
              W = false;
              break;
        case 68: //d
              D = false;
              break;
        case 65: //a
              A = false;
              break;
      }
    }
    function onDocumentKeyDown(event) {
    switch (event.keyCode) {
        case 83: //s
            S = true;
            break;
        case 87: //w
            W = true;
            break;
        case 68: //d
            D = true;
            break;
        case 65: //a
            A = true;
            break;
        }
    }

    this.update = function (deltaTime) {

        var correnteEsq = scene.getObjectByName('correnteEsq');
        var correnteDir = scene.getObjectByName('correnteDir');
        
        correnteEsq.rotation.y += 0.86;
        correnteDir.rotation.y += 0.86;

        var alfaia = scene.getObjectByName('alfaia');
        console.log(alfaia.position);
        if (A) alfaia.rotation.z += 0.01;
        if (D) alfaia.rotation.z -= 0.01;


        if (tractor.position.x < 50 && tractor.position.x > -217) {
            if (W) { tractor.translateX(-1); }
            if (S) { tractor.translateX(1); }
        }
    }
}

export default Tractor;