import { initPreview } from './storage.js';

// 4 услуги с 4 разными 3D-моделями
const services = [
    {
        id: 1,
        name: 'Аудит кибербезопасности',
        description: 'Комплексная проверка защищенности ИТ-инфраструктуры',
        modelPath: './models/shield.glb',
        icon: '🛡️'
    },
    {
        id: 2,
        name: 'Тестирование на проникновение',
        description: 'Эмуляция атак реальных хакеров для поиска уязвимостей',
        modelPath: './models/lock.glb',
        icon: '🔐'
    },
    {
        id: 3,
        name: 'Внедрение SIEM',
        description: 'Система сбора и анализа событий безопасности',
        modelPath: './models/server.glb',
        icon: '⚙️'
    },
    {
        id: 4,
        name: 'Обучение сотрудников',
        description: 'Повышение осведомленности о киберугрозах',
        modelPath: './models/classroom.glb',
        icon: '👨‍🏫'
    }
];

// Рендер галереи (4 карточки в ряд)
function renderGallery() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    services.forEach(service => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.id = service.id;
        card.dataset.model = service.modelPath;
        card.dataset.name = service.name;
        card.dataset.description = service.description;

        card.innerHTML = `
            <div class="card-preview" id="preview-${service.id}"></div>
            <div class="card-info">
                <h3>${service.icon} ${service.name}</h3>
                <p>${service.description}</p>
            </div>
        `;

        card.addEventListener('click', () => {
            window.location.href = `detail.html?id=${service.id}&model=${encodeURIComponent(service.modelPath)}&name=${encodeURIComponent(service.name)}&desc=${encodeURIComponent(service.description)}`;
        });

        gallery.appendChild(card);

        // Создаём превью с соответствующей моделью
        initPreview(`preview-${service.id}`, service.modelPath);
    });
}

// Запуск
renderGallery();
