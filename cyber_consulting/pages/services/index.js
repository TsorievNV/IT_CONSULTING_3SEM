import { ServiceCardComponent } from "../../components/service-card/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";

export class ServicesPage {
    constructor(parent) {
        this.parent = parent;
    }

    getServices() {
        return [
            { id: 1, icon: "🛡️", title: "Аудит кибербезопасности", description: "Комплексная проверка защищенности ИТ-инфраструктуры", price: 5000 },
            { id: 2, icon: "🔐", title: "Тестирование на проникновение", description: "Эмуляция атак реальных хакеров для поиска уязвимостей", price: 7000 },
            { id: 3, icon: "📊", title: "Анализ защищенности", description: "Оценка рисков и соответствия стандартам ISO 27001", price: 6000 },
            { id: 4, icon: "⚙️", title: "Внедрение SIEM", description: "Настройка системы сбора и анализа событий безопасности", price: 8000 },
            { id: 5, icon: "👨‍🏫", title: "Обучение сотрудников", description: "Повышение осведомленности о киберугрозах", price: 4000 },
            { id: 6, icon: "💻", title: "Аудит серверных мощностей", description: "Проверка серверов, оборудования и конфигураций", price: 5500 },
            { id: 7, icon: "🌐", title: "Аудит сетевой топологии", description: "Анализ сетевой инфраструктуры и маршрутизации", price: 4500 },
            { id: 8, icon: "📦", title: "Аудит системного ПО", description: "Проверка программного обеспечения и лицензий", price: 3500 },
            { id: 9, icon: "☁️", title: "Облачная инфраструктура", description: "Аудит облачных сервисов и их безопасности", price: 6500 },
            { id: 10, icon: "📱", title: "Мобильная безопасность", description: "Проверка мобильных приложений и устройств", price: 4800 }
        ];
    }

    getHTML() {
        return `
            <div class="container my-4">
                <div id="back-button-placeholder"></div>
                <div class="section-title">
                    <h2>Все услуги ИТ-консалтинга</h2>
                    <p class="text-center">Выберите услугу для детального расчёта стоимости</p>
                </div>
                <div id="services-list" class="row"></div>
            </div>
        `;
    }

    render(navigate) {
        this.parent.innerHTML = this.getHTML();

        // Кнопка назад
        const backPlaceholder = document.getElementById('back-button-placeholder');
        const backButton = new BackButtonComponent(backPlaceholder);
        backButton.render(() => navigate('main'));

        // Список всех услуг
        const servicesList = document.getElementById('services-list');
        const services = this.getServices();

        services.forEach(service => {
            const card = new ServiceCardComponent(servicesList);
            card.render(service, (e) => {
                navigate('service', service);
            });
        });
    }
}
