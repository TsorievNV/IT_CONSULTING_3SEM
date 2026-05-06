import { BackButtonComponent } from "../../components/back-button/index.js";

export class RequestPage {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <div class="container my-4">
                <div id="back-button-placeholder"></div>
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <div class="request-form">
                            <h2 class="text-center mb-4"><i class="fas fa-file-signature"></i> Оставить заявку на консалтинг</h2>
                            <p class="text-center">Мы свяжемся с вами в течение дня. Обсудим вашу задачу, расскажем подробнее об аудите и рассчитаем окончательную стоимость.</p>

                            <form id="consulting-form">
                                <div class="mb-3">
                                    <label class="form-label">Ваше имя *</label>
                                    <input type="text" class="form-control" id="name" required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Компания</label>
                                    <input type="text" class="form-control" id="company">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Телефон *</label>
                                    <input type="tel" class="form-control" id="phone" required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Email *</label>
                                    <input type="email" class="form-control" id="email" required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Интересующая услуга</label>
                                    <select class="form-select" id="service">
                                        <option value="Аудит кибербезопасности">Аудит кибербезопасности</option>
                                        <option value="Тестирование на проникновение">Тестирование на проникновение</option>
                                        <option value="Анализ защищенности">Анализ защищенности</option>
                                        <option value="Внедрение SIEM">Внедрение SIEM</option>
                                        <option value="Обучение сотрудников">Обучение сотрудников</option>
                                        <option value="Аудит серверных мощностей">Аудит серверных мощностей</option>
                                        <option value="Аудит сетевой топологии">Аудит сетевой топологии</option>
                                        <option value="Аудит системного ПО">Аудит системного ПО</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Комментарий</label>
                                    <textarea class="form-control" id="comment" rows="3" placeholder="Опишите вашу задачу..."></textarea>
                                </div>
                                <button type="submit" class="btn btn-primary w-100">Отправить заявку</button>
                            </form>

                            <div class="alert alert-success mt-3 d-none" id="success-alert">
                                Спасибо! Мы свяжемся с вами в ближайшее время.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(navigate) {
        this.parent.innerHTML = this.getHTML();

        // Кнопка назад
        const backPlaceholder = document.getElementById('back-button-placeholder');
        const backButton = new BackButtonComponent(backPlaceholder);
        backButton.render(() => navigate('main'));

        // Обработка формы
        const form = document.getElementById('consulting-form');
        const successAlert = document.getElementById('success-alert');

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Собираем данные
            const formData = {
                name: document.getElementById('name').value,
                company: document.getElementById('company').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                service: document.getElementById('service').value,
                comment: document.getElementById('comment').value,
                date: new Date().toLocaleString()
            };

            console.log('Заявка отправлена:', formData);

            // Показываем уведомление
            successAlert.classList.remove('d-none');

            // Очищаем форму
            form.reset();

            // Через 3 секунды возвращаемся на главную
            setTimeout(() => {
                navigate('main');
            }, 3000);
        });
    }
}
