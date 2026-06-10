import { ServiceCardComponent } from "../../components/service-card/index.js";
import { serviceUrls } from "../../modules/urls.js";

export class ServicesPage {
    constructor(parent) {
        this.parent = parent;
        this.allServices = [];
    }

    getHTML() {
        return `
            <div class="container my-4">
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

    async deleteService(serviceId, navigate) {
        try {
            const response = await fetch(serviceUrls.getServiceById(serviceId), {
                method: 'DELETE'
            });
            if (response.ok) {
                console.log(`Услуга ${serviceId} удалена`);
                this.loadServices(navigate);
            } else {
                console.error('Ошибка удаления');
            }
        } catch (error) {
            console.error('Ошибка DELETE:', error);
        }
    }

    renderServices(services, navigate) {
        const servicesList = document.getElementById('services-list');
        servicesList.innerHTML = '';

        if (services.length === 0) {
            servicesList.innerHTML = `<div class="col-12 text-center"><p>😕 Услуги не найдены</p></div>`;
            return;
        }

        services.forEach(service => {
            const col = document.createElement('div');
            col.className = 'col-md-3 mb-4';
            col.innerHTML = `
                <div class="card-service text-center p-3">
                    <h5 class="mt-3">${service.name}</h5>
                    <p>${service.description || ''}</p>
                    <p><strong>${service.price} ₽/час</strong></p>
                    <div>
                        <button class="btn btn-sm btn-primary view-btn">Подробнее</button>
                        <button class="btn btn-sm btn-warning edit-btn ms-2">✏️ Редактировать</button>
                        <button class="btn btn-sm btn-danger delete-btn ms-2">🗑️ Удалить</button>
                    </div>
                </div>
            `;
            servicesList.appendChild(col);

            const viewBtn = col.querySelector('.view-btn');
            if (viewBtn) {
                viewBtn.addEventListener('click', () => navigate('service', 'security_service', service.id, false));
            }

            const editBtn = col.querySelector('.edit-btn');
            if (editBtn) {
                editBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    navigate('service', 'security_service', service.id, true);
                });
            }

            const deleteBtn = col.querySelector('.delete-btn');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', async (e) => {
                    e.stopPropagation();
                    await this.deleteService(service.id, navigate);
                });
            }
        });
    }

    async loadServices(navigate) {
        try {
            const response = await fetch(serviceUrls.getServices());
            const data = await response.json();
            if (Array.isArray(data)) {
                this.allServices = data;
                this.renderServices(this.allServices, navigate);
            } else {
                console.error('Ошибка загрузки услуг');
            }
        } catch (error) {
            console.error('Ошибка fetch:', error);
        }
    }

    render(navigate) {
        this.parent.innerHTML = this.getHTML();
        this.loadServices(navigate);

        // Поиск
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
