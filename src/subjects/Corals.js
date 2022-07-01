import * as THREE from 'three';

function Corals(scene) {


    const vertexShader = `
    varying vec2 vUv;
    uniform float time;

    void main() {

    vUv = uv;
    
    // VERTEX POSITION
    
    vec4 mvPosition = vec4( position, 1.0 );
    #ifdef USE_INSTANCING
        mvPosition = instanceMatrix * mvPosition;
    #endif
    
    // DISPLACEMENT
    
    // here the displacement is made stronger on the blades tips.
    float dispPower = 1.0 - cos( uv.y * 3.1416 / 2.0 );
    
    float displacement = sin( mvPosition.z + time * 10.0 ) * ( 0.1 * dispPower );
    mvPosition.z += displacement;
    
    //
    
    vec4 modelViewPosition = modelViewMatrix * mvPosition;
    gl_Position = projectionMatrix * modelViewPosition;

    }
    `;

    const fragmentShader = `
    varying vec2 vUv;

    void main() {
        vec3 baseColor = vec3( 0.41, 1.0, 0.5 );
    float clarity = ( vUv.y * 0.5 ) + 0.5;
    gl_FragColor = vec4( baseColor * clarity, 1 );
    }
    `;

    const uniforms = {
        time: { value: 0 }
    }

    const leavesMaterial = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        side: THREE.DoubleSide
    });
        
    const instanceNumber = 2000;
    const dummy = new THREE.Object3D();

    createCorals(20, -9, 60);
    createCorals(25, -9, 65);
    createCorals(30, -9, 60);
    createCorals(35, -10, 65);
    createCorals(40, -10, 60);
    createCorals(45, -10, 65);

    createCorals(-130, -2, 30);
    createCorals(-135, -2, 30);
    createCorals(-140, -2, 30);
    createCorals(-130, -2, 40);
    createCorals(-125, -2, 40);
    createCorals(-125, -2, 30);
    createCorals(-125, -2, 25);
    createCorals(-125, -2, 20);

    function createCorals(posX, posY, posZ) {
        const geometry = new THREE.PlaneGeometry( 0.1, 6, 4, 1 );
        geometry.translate( 0, 0.5, 0 ); // move grass blade geometry lowest point at 0.

        const instancedMesh = new THREE.InstancedMesh( geometry, leavesMaterial, instanceNumber );

        instancedMesh.position.set( posX, posY, posZ );
        scene.add(instancedMesh);

        for ( let i=0 ; i < instanceNumber ; i++ ) {
            dummy.position.set(( Math.random() - 0.5 ) * 10, 0, ( Math.random() - 0.5 ) * 10);
            dummy.scale.setScalar(0.5 + Math.random() * 0.5);
            dummy.rotation.y = Math.random() * Math.PI;
            dummy.updateMatrix();
            instancedMesh.setMatrixAt( i, dummy.matrix );
        }
    }

    const clock = new THREE.Clock();

    this.update = function (deltaTime) {
        leavesMaterial.uniforms.time.value = clock.getElapsedTime()/5;
        leavesMaterial.uniformsNeedUpdate = true;
    }
}

export default Corals;