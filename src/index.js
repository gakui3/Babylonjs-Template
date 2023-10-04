import * as BABYLON from '@babylonjs/core';

import testVert from './shaders/test.vert?raw';
import testFrag from './shaders/test.frag?raw';

const canvas = document.getElementById('renderCanvas');
const engine = new BABYLON.Engine(canvas);
const scene = new BABYLON.Scene(engine);
const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);
camera.setTarget(BABYLON.Vector3.Zero());

camera.attachControl(canvas, true);

const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
light.intensity = 0.7;

const material = new BABYLON.StandardMaterial('test', scene);
var shaderMaterial = new BABYLON.ShaderMaterial(
  'shaderMaterial',
  scene,
  {
    vertexSource: testVert,
    fragmentSource: testFrag,
  },
  {
    attributes: ['position'],
    uniforms: ['worldViewProjection'],
  }
);

const sphere = BABYLON.CreateSphere('sphere1', { segments: 16, diameter: 2 }, scene);
sphere.position.y = 1;
// sphere.material = material;
sphere.material = shaderMaterial;

const ground = BABYLON.CreateGround('ground1', { width: 6, height: 6, subdivisions: 2 }, scene);
ground.material = material;

// Render every frame
engine.runRenderLoop(() => {
  scene.render();
});
