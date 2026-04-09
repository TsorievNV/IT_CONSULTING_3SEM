export class FooterComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <footer>
                <div class="container">
                    <div class="row">
                        <div class="col-md-3">
                            <h5>CyberConsult</h5>
                            <p>Аудит ИТ-систем и кибербезопасность для бизнеса</p>
                        </div>
                        <div class="col-md-3">
                            <h5>Услуги</h5>
                            <a href="#">Аудит безопасности</a>
                            <a href="#">Тестирование на проникновение</a>
                            <a href="#">Внедрение SIEM</a>
                            <a href="#">Обучение сотрудников</a>
                        </div>
                        <div class="col-md-3">
                            <h5>Контакты</h5>
                            <a href="#">+7 (495) 231-20-02</a>
                            <a href="#">info@cyberconsult.ru</a>
                            <a href="#">Москва, ул. Тверская, 25</a>
                        </div>
                        <div class="col-md-3">
                            <h5>Документы</h5>
                            <a href="#">Скачать прайс-лист</a>
                            <a href="#">Политика конфиденциальности</a>
                            <a href="#">Пользовательское соглашение</a>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <p>© 2025 CyberConsult. Все права защищены.</p>
                    </div>
                </div>
            </footer>
        `;
    }

    render() {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
    }
}
