import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Получаем параметры из URL
const urlParams = new URLSearchParams(window.location.search);
const modelPath = decodeURIComponent(urlParams.get('model') || './models/shield.glb');
const modelName = decodeURIComponent(urlParams.get('name') || '3D Модель');

// Устанавливаем заголовок
document.getElementById('modelTitle').innerHTML = `🛡️ ${modelName}`;

// Инициализация
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a1a);
scene.fog = new THREE.FogExp2(0x0a0a1a, 0.01);

// Камера
const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(5, 3, 5);

// Рендер
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.shadowMap.enabled = true;
container.appendChild(renderer.domElement);

// Орбит контрол
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.autoRotate = false;
controls.enableZoom = true;
controls.enablePan = true;
controls.zoomSpeed = 1.2;

// Освещение
const ambientLight = new THREE.AmbientLight(0x404060);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 7);
dirLight.castShadow = true;
scene.add(dirLight);

const fillLight = new THREE.PointLight(0x4466cc, 0.3);
fillLight.position.set(0, -2, 0);
scene.add(fillLight);

const rimLight = new THREE.PointLight(0xffaa66, 0.5);
rimLight.position.set(-2, 2, -3);
scene.add(rimLight);

// Пол
const gridHelper = new THREE.GridHelper(20, 20, 0xff9800, 0x333333);
gridHelper.position.y = -1;
scene.add(gridHelper);

// Загрузка модели
const loader = new GLTFLoader();
let model = null;

loader.load(modelPath,
    (gltf) => {
        model = gltf.scene;

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        model.position.sub(center);
        model.position.y += size.y / 2;

        model.traverse((node) => {
            if (node.isMesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });

        scene.add(model);

        const maxDim = Math.max(size.x, size.y, size.z);
        const distance = maxDim * 2;
        camera.position.set(distance, distance * 0.6, distance);
        controls.target.set(0, size.y / 2, 0);
        controls.update();
    },
    undefined,
    (error) => {
        console.error('Ошибка:', error);
        const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
        const material = new THREE.MeshStandardMaterial({ color: 0xff9800, wireframe: true });
        const placeholder = new THREE.Mesh(geometry, material);
        scene.add(placeholder);
    }
);

// Анимация
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Изменение размера окна
window.addEventListener('resize', () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
});

// Управление ракурсами
document.getElementById('view-front').addEventListener('click', () => {
    camera.position.set(0, 1.5, 5);
    controls.target.set(0, 1, 0);
    controls.update();
});
document.getElementById('view-back').addEventListener('click', () => {
    camera.position.set(0, 1.5, -5);
    controls.target.set(0, 1, 0);
    controls.update();
});
document.getElementById('view-left').addEventListener('click', () => {
    camera.position.set(-5, 1.5, 0);
    controls.target.set(0, 1, 0);
    controls.update();
});
document.getElementById('view-right').addEventListener('click', () => {
    camera.position.set(5, 1.5, 0);
    controls.target.set(0, 1, 0);
    controls.update();
});
document.getElementById('zoom-in').addEventListener('click', () => {
    camera.position.multiplyScalar(0.8);
    controls.update();
});
document.getElementById('zoom-out').addEventListener('click', () => {
    camera.position.multiplyScalar(1.2);
    controls.update();
});
document.getElementById('reset-view').addEventListener('click', () => {
    camera.position.set(5, 3, 5);
    controls.target.set(0, 1, 0);
    controls.update();
});
