// storage.js - для работы с 3D-превью на главной странице

export async function initPreview(containerId, modelPath) {
    const THREE = await import('three');
    const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');

    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container ${containerId} not found`);
        return;
    }

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f0f1a);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(2, 1.5, 2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x0f0f1a, 1);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x404060);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(3, 5, 2);
    scene.add(dirLight);

    const loader = new GLTFLoader();
    let model = null;

    loader.load(modelPath,
        (gltf) => {
            model = gltf.scene;

            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center);

            model.traverse((node) => {
                if (node.isMesh) {
                    node.castShadow = true;
                }
            });

            scene.add(model);
        },
        undefined,
        (error) => {
            console.error('Preview error:', error);
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshStandardMaterial({ color: 0xff9800, wireframe: true });
            const placeholder = new THREE.Mesh(geometry, material);
            scene.add(placeholder);
        }
    );

    function animate() {
        requestAnimationFrame(animate);
        if (model) {
            model.rotation.y += 0.005;
        }
        renderer.render(scene, camera);
    }
    animate();

    const resizeObserver = new ResizeObserver(() => {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
    });
    resizeObserver.observe(container);
}
