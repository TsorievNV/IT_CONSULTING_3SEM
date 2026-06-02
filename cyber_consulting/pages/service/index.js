import { BackButtonComponent } from "../../components/back-button/index.js";
import { ajax } from "../../modules/ajax.js";
import { serviceUrls } from "../../modules/urls.js";

export class ServicePage {
    constructor(parent, id, isEdit = false) {
        this.parent = parent;
        this.id = id;
        this.isEdit = isEdit;
        this.service = null;
    }

    getEditHTML() {
        return `
            <div class="container my-4">
                <div id="back-button-placeholder"></div>
                <div class="card-service p-4">
                    <h2>Редактирование услуги (просмотр)</h2>
                    <div class="mb-3">
                        <label class="form-label">Название</label>
                        <input type="text" id="editName" class="form-control" value="${this.service?.name || ''}">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Описание</label>
                        <textarea id="editDescription" class="form-control" rows="3">${this.service?.description || ''}</textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Цена (₽/час)</label>
                        <input type="number" id="editPrice" class="form-control" value="${this.service?.price || ''}">
                    </div>
                </div>
            </div>
        `;
    }

    getViewHTML() {
        return `
            <div class="container my-4">
                <div id="back-button-placeholder"></div>
                <div class="card-service p-4 text-center">
                    <h2>${this.service.name}</h2>
                    <p>${this.service.description || 'Описание отсутствует'}</p>
                    <p><strong>Цена: ${this.service.price.toLocaleString()} ₽/час</strong></p>
                    <button id="editButton" class="btn btn-warning mt-3">✏️ Редактировать</button>
                </div>
            </div>
        `;
    }

    getHTML() {
        if (!this.service) return '<div class="container my-4"><p>Загрузка...</p></div>';
        return this.isEdit ? this.getEditHTML() : this.getViewHTML();
    }

    bindFormData() {
        const nameInput = document.getElementById('editName');
        const descInput = document.getElementById('editDescription');
        const priceInput = document.getElementById('editPrice');
        if (nameInput) nameInput.addEventListener('input', () => console.log('Изменено название:', nameInput.value));
        if (descInput) descInput.addEventListener('input', () => console.log('Изменено описание'));
        if (priceInput) priceInput.addEventListener('input', () => console.log('Изменена цена:', priceInput.value));
    }

    render(navigate) {
        this.parent.innerHTML = this.getHTML();

        ajax.get(serviceUrls.getServiceById(this.id), (data) => {
            if (data && data.id) {
                this.service = data;
                this.parent.innerHTML = this.getHTML();

                const backPlaceholder = document.getElementById('back-button-placeholder');
                if (backPlaceholder) {
                    const backButton = new BackButtonComponent(backPlaceholder);
                    backButton.render(() => navigate('main'));
                }

                if (!this.isEdit) {
                    const editBtn = document.getElementById('editButton');
                    if (editBtn) {
                        editBtn.addEventListener('click', () => navigate('service', this.id, true));
                    }
                } else {
                    this.bindFormData();
                }
            } else {
                this.parent.innerHTML = '<p class="text-danger">Ошибка загрузки услуги</p>';
            }
        });
    }
}
