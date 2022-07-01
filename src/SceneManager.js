import * as THREE from 'three';
import GeneralLights from './subjects/GeneralLights';
import Rock from './subjects/Rock';
import Terrain from './subjects/Terrain';
import Water from './subjects/Water';
import Fish from './subjects/Fish';
import Sky from './subjects/Sky';
import Tractor from './subjects/Tractor';
import Corals from './subjects/Corals';


import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'

function SceneManager(canvas) {
  const clock = new THREE.Clock();

  const screenDimensions = {
    width: canvas.width,
    height: canvas.height,
  };

  const DPR = (window.devicePixelRatio) ? Math.min(window.devicePixelRatio, 2) : 1;
  //const DPR = 2;

  const camParams = {
    default: [100, 100, 100],
    range: [200, 200],
    lookat: [10, 0, 100],
  };

  const terrainDimensions = [330, 250];

  const scene = buildScene();
  const bufferScene = buildScene();
  bufferScene.background = new THREE.Color('#add8e6');
  const renderer = buildRender(screenDimensions);
  const camera = buildCamera(screenDimensions);
  const sceneSubjects = createSceneSubjects(scene, camera);
  const {colorTarget, depthTarget} = createTargets();

  let mouseX = camParams.default[0];
  let mouseY = camParams.default[0];

  const materialDepth = new THREE.MeshDepthMaterial({morphTargets: true});
  materialDepth.depthPacking = THREE.RGBADepthPacking;
  materialDepth.blending = THREE.NoBlending;

  const trackballControls = new TrackballControls(camera, renderer.domElement)

  function buildScene() {
    const scene = new THREE.Scene();
    return scene;
  }

  function buildRender({width, height}) {
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: false,
      alpha: true,
      depth: true,
      stencil: false,
    });

    renderer.setPixelRatio(DPR);
    renderer.setSize(width, height);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.autoClear = false;

    return renderer;
  }

  function buildCamera({width, height}) {
    const camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
    camera.position.set(camParams.default[0], camParams.default[0], camParams.default[2]);

    return camera;
  }

  function createSceneSubjects(scene, camera) {
    const sceneSubjects = [
      new GeneralLights(bufferScene),
      new Terrain(bufferScene, terrainDimensions),
      new Water(scene, camera, terrainDimensions, {
        DPR,
        width: screenDimensions.width,
        height: screenDimensions.height,
      }),
      new Rock(bufferScene),
      new Fish(bufferScene),
      new Sky(bufferScene),
      new Tractor(bufferScene),
      new Corals(bufferScene),
    ];

    return sceneSubjects;
  }

  function createTargets() {
    const colorTarget = new THREE.WebGLRenderTarget(
        window.innerWidth * DPR,
        window.innerHeight * DPR );

    colorTarget.texture.format = THREE.RGBFormat;
    colorTarget.texture.minFilter = THREE.NearestFilter;
    colorTarget.texture.magFilter = THREE.NearestFilter;
    colorTarget.depthBuffer = true;
    colorTarget.stencilBuffer = false;

    const depthTarget = new THREE.WebGLRenderTarget(
        window.innerWidth * DPR,
        window.innerHeight * DPR );

    depthTarget.texture.format = THREE.RGBAFormat;
    depthTarget.texture.minFilter = THREE.NearestFilter;
    depthTarget.texture.magFilter = THREE.NearestFilter;
    depthTarget.depthBuffer = true;
    depthTarget.stencilBuffer = false;

    return {colorTarget, depthTarget};
  }

  var D = false; var S = false; var A = false; var W = false;
  document.addEventListener("keyup", onDocumentKeyUp, false);
  function onDocumentKeyUp(event) {
    switch (event.keyCode) {
        case 68: //d
            D = false;
            break;
        case 83: //s
            S = false;
            break;
        case 65: //a
            A = false;
            break;
        case 87: //w
            W = false;
            break;
    }
  }

  this.update = function() {
    const deltaTime = clock.getDelta();

    trackballControls.update();

    renderer.clear();

    for (let i = 0; i < sceneSubjects.length; i++) {
      sceneSubjects[i].update(deltaTime, colorTarget, depthTarget);
    }

    renderer.setRenderTarget( colorTarget );
    renderer.render(bufferScene, camera);

    // render buffer scene for water depth texture
    bufferScene.overrideMaterial = materialDepth;
    renderer.setRenderTarget( depthTarget );
    renderer.render(bufferScene, camera);

    renderer.setRenderTarget( null );
    bufferScene.overrideMaterial = null;

    // render buffer scene and then render water on top
    renderer.render( bufferScene, camera );
    renderer.render( scene, camera );
  };

  this.onWindowResize = function() {
    const {width, height} = canvas;

    screenDimensions.width = width;
    screenDimensions.height = height;

    renderer.setSize(width, height);
    const dpr = Math.min(renderer.getPixelRatio(), 2);
    // const dpr = 1;
    depthTarget.setSize( width * dpr, height * dpr );
    colorTarget.setSize( width * dpr, height * dpr );

    for (const subject of sceneSubjects) {
      if (subject.onResize) {
        subject.onResize({
          width: width,
          height: height,
          DPR: dpr,
        });
      }
    }
  };

};


export default SceneManager;
