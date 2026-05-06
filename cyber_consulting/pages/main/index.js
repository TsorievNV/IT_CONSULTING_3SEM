import { ServiceCardComponent } from "../../components/service-card/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    getServices() {
        return [
            { id: 1, icon: "🛡️", title: "Аудит кибербезопасности", description: "Комплексная проверка защищенности ИТ-инфраструктуры", price: 5000 },
            { id: 2, icon: "🔐", title: "Тестирование на проникновение", description: "Эмуляция атак реальных хакеров", price: 7000 },
            { id: 3, icon: "📊", title: "Анализ защищенности", description: "Оценка рисков и соответствие стандартам", price: 6000 },
            { id: 4, icon: "⚙️", title: "Внедрение SIEM", description: "Система сбора и анализа событий", price: 8000 },
            { id: 5, icon: "👨‍🏫", title: "Обучение сотрудников", description: "Повышение осведомленности о киберугрозах", price: 4000 },
            { id: 6, icon: "💻", title: "Аудит серверных мощностей", description: "Проверка серверов и оборудования", price: 5500 },
            { id: 7, icon: "🌐", title: "Аудит сетевой топологии", description: "Анализ сетевой инфраструктуры", price: 4500 },
            { id: 8, icon: "📦", title: "Аудит системного ПО", description: "Проверка программного обеспечения", price: 3500 }
        ];
    }

    getHTML() {
        return `
            <div class="hero">
                <div class="container">
                    <div class="row">
                        <div class="col-md-7">
                            <h1>АУДИТ ИТ-СИСТЕМ</h1>
                            <p>Проведем аудит ИТ-окружения вашей компании. Дадим рекомендации по улучшению системы и снижению затрат на ИТ-инфраструктуру. При необходимости поможем с реализацией изменений.</p>
                            <button class="btn-orange" id="hero-request">Оставить заявку</button>
                        </div>
                        <div class="col-md-5">
                            <img src="https://img.icons8.com/fluency/200/security-checked.png" alt="security" class="img-fluid">
                        </div>
                    </div>
                </div>
            </div>

            <div class="container my-5">
                <div class="section-title">
                    <h2>Когда вам поможет аудит</h2>
                </div>
                <div class="row text-center mb-5">
                    <div class="col-md-3">
                        <div class="card-service p-3">
                            <i class="fas fa-chart-line fa-3x" style="color:#ff9800"></i>
                            <h5 class="mt-3">При росте бизнеса</h5>
                            <p>Открытии новых офисов или увеличении сотрудников</p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card-service p-3">
                            <i class="fas fa-bullseye fa-3x" style="color:#ff9800"></i>
                            <h5 class="mt-3">Цели и метрики</h5>
                            <p>Разработка стратегии развития ИТ-инфраструктуры</p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card-service p-3">
                            <i class="fas fa-chart-pie fa-3x" style="color:#ff9800"></i>
                            <h5 class="mt-3">План и бюджет</h5>
                            <p>Оптимизация затрат на ИТ</p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card-service p-3">
                            <i class="fas fa-shield-virus fa-3x" style="color:#ff9800"></i>
                            <h5 class="mt-3">Киберугрозы</h5>
                            <p>Защита от современных атак</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container my-5">
                <div class="section-title">
                    <h2>Наши услуги</h2>
                </div>
                <div id="services-list" class="row"></div>
                <div class="text-center mt-4">
                    <button class="btn btn-outline-primary" id="all-services-btn">Все услуги →</button>
                </div>
            </div>

            <div class="container my-5">
                <div class="row">
                    <div class="col-md-6">
                        <div class="calculator-card" id="calculator-placeholder"></div>
                    </div>
                    <div class="col-md-6">
                        <div class="request-form">
                            <h3>Оставьте заявку</h3>
                            <p>Мы свяжемся с вами в течение дня. Обсудим вашу задачу, расскажем подробнее об аудите и рассчитаем окончательную стоимость.</p>
                            <button class="btn btn-primary w-100" id="request-btn">Оставить заявку</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(navigate) {
        this.parent.innerHTML = this.getHTML();

        // Рендер карточек услуг (первые 4)
        const servicesList = document.getElementById('services-list');
        const services = this.getServices().slice(0, 4);

        services.forEach(service => {
            const card = new ServiceCardComponent(servicesList);
            card.render(service, (e) => {
                navigate('service', service);
            });
        });

        // Кнопка "Все услуги"
        document.getElementById('all-services-btn')?.addEventListener('click', () => {
            navigate('services');
        });

        // Кнопка заявки
        document.getElementById('hero-request')?.addEventListener('click', () => {
            navigate('request');
        });
        document.getElementById('request-btn')?.addEventListener('click', () => {
            navigate('request');
        });

        // Калькулятор (краткая форма)
        const calcContainer = document.getElementById('calculator-placeholder');
        calcContainer.innerHTML = `
            <h4><i class="fas fa-calculator"></i> Калькулятор стоимости</h4>
            <div class="mb-3">
                <label>Количество часов консультации:</label>
                <input type="range" id="quickHours" class="form-range" min="1" max="40" value="5">
                <span id="quickHoursValue" class="badge bg-secondary mt-2">5 ч</span>
            </div>
            <div class="mb-3">
                <label>Тип услуги:</label>
                <select id="quickService" class="form-select">
                    <option value="5000">Аудит безопасности (5000 ₽/ч)</option>
                    <option value="7000">Pentest (7000 ₽/ч)</option>
                    <option value="6000">Анализ защищенности (6000 ₽/ч)</option>
                </select>
            </div>
            <hr>
            <div class="text-center">
                <h5>Примерная стоимость:</h5>
                <div class="total-price" id="quickTotal">25 000 ₽</div>
            </div>
        `;

        const hoursRange = document.getElementById('quickHours');
        const hoursValue = document.getElementById('quickHoursValue');
        const serviceSelect = document.getElementById('quickService');
        const totalSpan = document.getElementById('quickTotal');

        const updateQuickCalc = () => {
            const hours = parseInt(hoursRange.value);
            const price = parseInt(serviceSelect.value);
            const total = hours * price;
            hoursValue.innerHTML = hours + ' ч';
            totalSpan.innerHTML = total.toLocaleString() + ' ₽';
        };

        hoursRange.addEventListener('input', updateQuickCalc);
        serviceSelect.addEventListener('change', updateQuickCalc);
        updateQuickCalc();
    }
}
