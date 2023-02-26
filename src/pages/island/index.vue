<template>
  <div></div>
</template>

<script setup>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Water } from "three/examples/jsm/objects/Water2"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader"
// 添加场景 ----------------------------------------------------------------
const scene = new THREE.Scene();

// const light = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(light);

// 创建相机 ----------------------------------------------------------------
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
camera.position.set(-50, 50, 130)
camera.aspect = window.innerWidth / window.innerHeight
camera.updateProjectionMatrix();
scene.add(camera);


// 初始化渲染器
const renderer = new THREE.WebGLRenderer({
  // 设置抗锯齿
  antialias: true,
  //   对数深度缓冲区
  logarithmicDepthBuffer: true,
});
renderer.outputEncoding = THREE.sRGBEncoding;

// 设置渲染器宽高
renderer.setSize(window.innerWidth, window.innerHeight);

// 监听屏幕的大小改变，修改渲染器的宽高，相机的比例
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// 将渲染器添加到页面
document.body.appendChild(renderer.domElement);

// 实例化控制器
const controls = new OrbitControls(camera, renderer.domElement);

function render () {
  // 渲染场景
  renderer.render(scene, camera);
  // 引擎自动更新渲染器
  requestAnimationFrame(render);
}
render();


// 创建一个巨大的天空球体
let texture = new THREE.TextureLoader().load("./assets/island/textures/sky.jpg");
const skyGeometry = new THREE.SphereGeometry(1000, 60, 60);
const skyMaterial = new THREE.MeshBasicMaterial({
  map: texture,
});
skyGeometry.scale(1, 1, -1);
const sky = new THREE.Mesh(skyGeometry, skyMaterial);
// scene.background = texture;
// scene.environment = texture;
scene.add(sky);

// 视频纹理
const video = document.createElement("video");
video.src = "./assets/island/textures/sky.mp4"
video.loop = true;

window.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    skyMaterial.map = new THREE.VideoTexture(video);
    skyMaterial.map.needsUpdate = true;
  }
})


// 环境纹理
const hdrLoader = new RGBELoader();
hdrLoader.loadAsync('./assets/island/model/050.hdr').then((texture) => {
  texture.mapping = THREE.EquirectangularRefractionMapping;
  scene.background = texture;
  scene.environment = texture;
})


// 创建水面
const waterGeometry = new THREE.CircleBufferGeometry(300, 64);
const water = new Water(waterGeometry, {
  textureWidth: 1024,
  textureHeight: 1024,
  color: 0xeeeeff,
  flowDirection: new THREE.Vector2(1, 1), //水流方向
  scale: 1
});
water.rotation.x = -Math.PI / 2;
water.position.y = 2;
scene.add(water);


// 添加小岛模型
const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('./assets/island/draco/');
gltfLoader.setDRACOLoader(dracoLoader);
gltfLoader.load('./assets/island/model/island2.glb', (gltf) => {
  const island = gltf.scene;
  // island.position.y = -50;
  scene.add(island);
})
// const isLandGeometry = new THREE.

</script>
