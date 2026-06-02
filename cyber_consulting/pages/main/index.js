import { ajax } from "../../modules/ajax.js";
import { serviceUrls } from "../../modules/urls.js";
import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

function initPreview(containerId, modelPath) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f0f1a);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(1.5, 1.2, 1.8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x0f0f1a, 1);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x606060);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(2, 3, 2);
    scene.add(dirLight);

    const loader = new GLTFLoader();
    let model = null;

    loader.load(modelPath, (gltf) => {
        model = gltf.scene;
        scene.add(model);
    }, undefined, (error) => {
        console.error('Ошибка загрузки модели:', modelPath, error);
    });

    function animate() {
        requestAnimationFrame(animate);
        if (model) model.rotation.y += 0.005;
        renderer.render(scene, camera);
    }
    animate();

    new ResizeObserver(() => {
        const w = container.clientWidth, h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    }).observe(container);
}

function getModelFileName(title) {
    if (title.includes("Аудит")) return "shield";
    if (title.includes("Тестирование")) return "lock";
    if (title.includes("Анализ") || title.includes("SIEM")) return "server";
    if (title.includes("Обучение")) return "classroom";
    return "shield";
}

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `<div id="services-list" class="row"></div>`;
    }

    renderServices(services, navigate) {
        const servicesList = document.getElementById('services-list');
        if (!servicesList) return;
        servicesList.innerHTML = '';

        services.forEach(service => {
            // Проверка id
            const actualId = Number(service.id);
            if (isNaN(actualId)) {
                console.error('ID не число, пропускаем:', service);
                return;
            }

            console.log('service.id:', service.id, typeof service.id);

            const col = document.createElement('div');
            col.className = 'col-md-3 mb-4';
            col.innerHTML = `
                <div class="card-service text-center p-3">
                    <div id="preview-${service.id}" style="height: 180px; background: #0f0f1a; border-radius: 12px;"></div>
                    <h5 class="mt-3">${service.name}</h5>
                    <p>${service.description || ''}</p>
                    <div>
                        <button class="btn btn-sm btn-primary view-btn">Подробнее</button>
                        <button class="btn btn-sm btn-warning edit-btn ms-2">✏️ Редактировать</button>
                    </div>
                </div>
            `;
            servicesList.appendChild(col);

            const modelFile = getModelFileName(service.name);
            initPreview(`preview-${service.id}`, `./${modelFile}.glb`);

            const viewBtn = col.querySelector('.view-btn');
            if (viewBtn) {
                viewBtn.addEventListener('click', () => navigate('service', actualId, false));
            }

            const editBtn = col.querySelector('.edit-btn');
            if (editBtn) {
                editBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    navigate('service', actualId, true);
                });
            }
        });
    }

    loadServices(navigate) {
        ajax.get(serviceUrls.getServices(), (data) => {
            if (Array.isArray(data)) {
                this.renderServices(data, navigate);
            } else {
                console.error('Ошибка загрузки услуг');
            }
        });
    }

    render(navigate) {
        this.parent.innerHTML = this.getHTML();
        this.loadServices(navigate);
    }
}
