import { ServiceCardComponent } from "../../components/service-card/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { ajax } from "../../modules/ajax.js";
import { serviceUrls } from "../../modules/urls.js";

export class ServicesPage {
    constructor(parent) {
        this.parent = parent;
        this.allServices = [];
    }

    getHTML() {
        return `
            <div class="container my-4">
                <div id="back-button-placeholder"></div>
                <div class="section-title">
                    <h2>Все услуги</h2>
                </div>

                <!-- Блок поиска -->
                <div class="row justify-content-center mb-4">
                    <div class="col-md-6">
                        <div class="input-group">
                            <input type="text" id="searchInput" class="form-control" placeholder="🔍 Поиск по названию услуги...">
                            <button id="searchBtn" class="btn btn-primary">Найти</button>
                            <button id="clearSearchBtn" class="btn btn-outline-secondary">Сброс</button>
                        </div>
                    </div>
                </div>

                <div id="services-list" class="row"></div>
            </div>
        `;
    }

    renderServices(services, navigate) {
        const servicesList = document.getElementById('services-list');
        servicesList.innerHTML = '';

        if (services.length === 0) {
            servicesList.innerHTML = `<div class="col-12 text-center"><p>😕 Услуги не найдены</p></div>`;
            return;
        }

        services.forEach(service => {
            const card = new ServiceCardComponent(servicesList);
            card.render(service, () => navigate('service', service.id));
        });
    }

    loadServices(navigate) {
        ajax.get(serviceUrls.getServices(), (data) => {
            if (Array.isArray(data)) {
                this.allServices = data;
                this.renderServices(this.allServices, navigate);
            } else {
                console.error('Ошибка загрузки услуг');
            }
        });
    }

    render(navigate) {
        this.parent.innerHTML = this.getHTML();

        // Кнопка назад
        const backPlaceholder = document.getElementById('back-button-placeholder');
        const backButton = new BackButtonComponent(backPlaceholder);
        backButton.render(() => navigate('main'));

        // Загружаем услуги с сервера
        this.loadServices(navigate);

        // Поиск (фильтрация по загруженным данным)
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        const clearBtn = document.getElementById('clearSearchBtn');

        const performSearch = () => {
            const query = searchInput.value.toLowerCase().trim();
            if (query === '') {
                this.renderServices(this.allServices, navigate);
            } else {
                const filtered = this.allServices.filter(service =>
                    service.name.toLowerCase().includes(query)
                );
                this.renderServices(filtered, navigate);
            }
        };

        if (searchBtn) searchBtn.addEventListener('click', performSearch);
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                searchInput.value = '';
                this.renderServices(this.allServices, navigate);
            });
        }
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') performSearch();
            });
        }
    }
}
