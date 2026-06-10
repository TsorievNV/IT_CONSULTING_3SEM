import { serviceUrls } from "../../modules/urls.js";

// Простая защита от XSS
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

export class ServicePage {
    constructor(parent, id, isEdit = false) {
        this.parent = parent;
        this.id = id;
        this.isEdit = isEdit;
        this.service = null;
        this.longPollingActive = false;
    }

    getEditHTML() {
        return `
            <div class="container my-4">
                <div class="card-service p-4">
                    <h2>✏️ Редактирование услуги</h2>
                    <div class="mb-3">
                        <label class="form-label">Название</label>
                        <input type="text" id="editName" class="form-control" value="${escapeHtml(this.service?.name) || ''}">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Описание</label>
                        <textarea id="editDescription" class="form-control" rows="3">${escapeHtml(this.service?.description) || ''}</textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Цена (₽/час)</label>
                        <input type="number" id="editPrice" class="form-control" value="${this.service?.price || ''}">
                    </div>
                    <div class="mt-3 d-flex gap-2">
                        <button id="saveServiceBtn" class="btn btn-success">💾 Сохранить</button>
                        <button id="deleteServiceBtn" class="btn btn-danger">🗑️ Удалить</button>
                    </div>
                </div>
            </div>
        `;
    }

    renderComments() {
        const comments = this.service.comments || [];
        if (!Array.isArray(comments) || comments.length === 0) {
            return '<p class="text-muted">💬 Нет комментариев. Будьте первым!</p>';
        }
        return comments.map(comment => `
            <div class="border-bottom pb-2 mb-2">
                <strong>${escapeHtml(comment.author || 'Аноним')}</strong>
                <small class="text-muted ms-2">${new Date(comment.createdAt).toLocaleString()}</small>
                <p class="mb-0 mt-1">${escapeHtml(comment.text)}</p>
            </div>
        `).join('');
    }

    getViewHTML() {
        return `
            <div class="container my-4">
                <div class="card-service p-4 text-center">
                    <h2>${escapeHtml(this.service.name)}</h2>
                    <p>${escapeHtml(this.service.description) || 'Описание отсутствует'}</p>
                    <p><strong>Цена: ${this.service.price.toLocaleString()} ₽/час</strong></p>
                    <button id="editButton" class="btn btn-warning mt-3">✏️ Редактировать</button>
                </div>

                <!-- Блок комментариев -->
                <div class="card-service p-4 mt-4">
                    <h4>💬 Комментарии</h4>
                    <div id="comments-list" class="mt-3">
                        ${this.renderComments()}
                    </div>
                    <hr>
                    <div class="mt-3">
                        <input type="text" id="commentAuthor" class="form-control mb-2" placeholder="Ваше имя (необязательно)">
                        <textarea id="commentText" class="form-control" rows="2" placeholder="Ваш комментарий..."></textarea>
                        <button id="submitCommentBtn" class="btn btn-primary mt-2">📝 Отправить комментарий</button>
                    </div>
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

    async saveService() {
        const updatedData = {
            name: document.getElementById('editName').value,
            description: document.getElementById('editDescription').value,
            price: parseInt(document.getElementById('editPrice').value)
        };

        try {
            const response = await fetch(serviceUrls.getServiceById(this.id), {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData)
            });

            if (response.ok) {
                console.log('✅ Услуга сохранена');
                window.location.reload();
            } else {
                console.error('❌ Ошибка сохранения');
            }
        } catch (error) {
            console.error('Ошибка PATCH:', error);
        }
    }

    async deleteService() {
        try {
            const response = await fetch(serviceUrls.getServiceById(this.id), {
                method: 'DELETE'
            });

            if (response.ok) {
                console.log('✅ Услуга удалена');
                window.location.href = '/';
            } else {
                console.error('❌ Ошибка удаления');
            }
        } catch (error) {
            console.error('Ошибка DELETE:', error);
        }
    }

    async addComment() {
        const text = document.getElementById('commentText').value;
        const author = document.getElementById('commentAuthor').value;

        if (!text.trim()) return;

        try {
            const response = await fetch(serviceUrls.addComment(this.id), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, author })
            });

            if (response.ok) {
                document.getElementById('commentText').value = '';
                document.getElementById('commentAuthor').value = '';
                await this.loadComments();
            }
        } catch (error) {
            console.error('Ошибка POST комментария:', error);
        }
    }

    async loadComments() {
        try {
            const response = await fetch(serviceUrls.getServiceById(this.id));
            const data = await response.json();
            if (data && data.id === this.id && data.comments) {
                this.service.comments = data.comments;
                const commentsContainer = document.getElementById('comments-list');
                if (commentsContainer) {
                    commentsContainer.innerHTML = this.renderComments();
                }
            }
        } catch (error) {
            console.error('Ошибка загрузки комментариев:', error);
        }
    }

    // Long Polling
    async startLongPolling() {
        this.longPollingActive = true;

        while (this.longPollingActive && !this.isEdit) {
            try {
                const response = await fetch(serviceUrls.getServiceById(this.id));
                const data = await response.json();

                if (data && data.id === this.id && data.comments) {
                    const oldCount = this.service.comments?.length || 0;
                    const newCount = data.comments?.length || 0;

                    if (newCount > oldCount) {
                        this.service.comments = data.comments;
                        this.updateCommentsUI();
                    }
                }
            } catch (error) {
                console.error('Long polling error:', error);
                await new Promise(resolve => setTimeout(resolve, 3000));
            }
        }
    }

    stopLongPolling() {
        this.longPollingActive = false;
        console.log('Long Polling остановлен');
    }

    updateCommentsUI() {
        const commentsContainer = document.getElementById('comments-list');
        if (commentsContainer) {
            commentsContainer.innerHTML = this.renderComments();
        }
    }

    async render(navigate) {
        this.service = null;
        this.stopLongPolling();
        this.parent.innerHTML = '<div class="container my-4"><p>Загрузка...</p></div>';

        try {
            const response = await fetch(serviceUrls.getServiceById(this.id));
            const data = await response.json();
            if (data && data.id === this.id) {
                this.service = data;
                this.parent.innerHTML = this.getHTML();

                if (!this.isEdit) {
                    const editBtn = document.getElementById('editButton');
                    if (editBtn) {
                        editBtn.addEventListener('click', () => navigate('service', 'security_service', this.id, true));
                    }
                    this.startLongPolling();

                    const submitBtn = document.getElementById('submitCommentBtn');
                    if (submitBtn) {
                        submitBtn.addEventListener('click', () => this.addComment());
                    }
                } else {
                    this.bindFormData();

                    const saveBtn = document.getElementById('saveServiceBtn');
                    if (saveBtn) saveBtn.addEventListener('click', () => this.saveService());

                    const deleteBtn = document.getElementById('deleteServiceBtn');
                    if (deleteBtn) deleteBtn.addEventListener('click', () => this.deleteService());
                }
            } else {
                this.parent.innerHTML = '<p class="text-danger">Ошибка загрузки услуги</p>';
            }
        } catch (error) {
            console.error('Ошибка fetch:', error);
            this.parent.innerHTML = '<p class="text-danger">Ошибка загрузки услуги</p>';
        }
    }

    cleanup() {
        this.stopLongPolling();
    }
}
