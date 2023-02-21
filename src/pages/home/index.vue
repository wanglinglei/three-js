<template>
  <div>
    home
  </div>
</template>
<script setup>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// const blob1 = require('../../assets/imgs/blob1.jpg');
// const blob2 = require('../../assets/imgs/blob2.jpg')
// const blob3 = require('../../assets/imgs/blob3.jpg')
// const blob4 = require('../../assets/imgs/blob4.jpg')
// const blob5 = require('../../assets/imgs/blob5.jpg')
// const blob6=require('../../assets/imgs/blob6.jpg')
// 添加场景 ----------------------------------------------------------------
const scene = new THREE.Scene();

// 创建相机 ----------------------------------------------------------------
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 0, 10)
scene.add(camera)

const cubeTextureLoader = new THREE.CubeTextureLoader();
const list =['blob1', 'blob3', 'blob6', 'blob4', 'blob5', 'blob2']
const textureList = list.map((name) => {
  return "/imgs/" + name + ".jpg";
});
const envMapTexture = cubeTextureLoader.load([...textureList]);

// // 添加物体
// const shapeGeometry = new THREE.SphereGeometry(1, 20, 20);
// const material = new THREE.MeshStandardMaterial({
//   metalness: 0.7,
//   roughness: 0.1,
//   envMap: envMapTexture, //物体的环境贴图
// });
// const shape = new THREE.Mesh(shapeGeometry, material);
// scene.add(shape);


// 添加物体  几何体 材质----------------------------------------------------------------
// const cubeGeometry = new THREE.BoxGeometry(5,5,5);
// const cubeMaterial = new THREE.MeshStandardMaterial({
//   envMap: envMapTexture,
//   metalness: 0.7,
//   roughness: 0.1,})
// // 根据几何体和材质创建材质
// const mesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
// console.log('mesh',mesh);
scene.background = envMapTexture;
// scene.add(mesh)

const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);

// 渲染------------------------------------------------
// 初始化渲染器
const renderer = new THREE.WebGLRenderer()
// 设置渲染器的大小
renderer.setSize(window.innerWidth, window.innerHeight)

// 将渲染的canvas 内容添加到body
document.body.appendChild(renderer.domElement)

renderer.render(scene, camera)

// 创建轨道控制器
const controls= new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true;

// 添加坐标辅助器
const axesHelper=new THREE.AxesHelper(4)
scene.add(axesHelper)
function render () {
  renderer.render(scene, camera);
  requestAnimationFrame(render)
}
render()
</script>