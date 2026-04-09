export class HeaderComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <div class="top-bar">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6">
                            <i class="fas fa-map-marker-alt"></i> Москва, ул. Тверская, 25
                        </div>
                        <div class="col-md-6 text-end">
                            <i class="far fa-clock"></i> Пн-Пт: 9:00 - 20:00
                            <a href="#" class="ms-3" id="request-link-header">Оставить заявку</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="main-header">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-md-4">
                            <div class="logo">
                                Cyber<span style="color:#ff9800;">Consult</span>
                            </div>
                        </div>
                        <div class="col-md-4 text-center">
                            <i class="fas fa-shield-alt"></i> Аудит ИТ-систем
                        </div>
                        <div class="col-md-4 text-end">
                            <div class="phone">
                                <i class="fas fa-phone-alt"></i> +7 (495) 231-20-02
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="nav-menu">
                <div class="container">
                    <a href="#" id="nav-main">Главная</a>
                    <a href="#" id="nav-services">Услуги</a>
                    <a href="#" id="nav-request">Заявка на консалтинг</a>
                    <a href="#">Отзывы</a>
                    <a href="#">Поддержка</a>
                    <a href="#">О компании</a>
                    <a href="#" class="float-end"><i class="far fa-user"></i> Личный кабинет</a>
                </div>
            </div>
        `;
    }

    addListeners(navigate) {
        document.getElementById('nav-main')?.addEventListener('click', (e) => {
            e.preventDefault();
            navigate('main');
        });
        document.getElementById('nav-services')?.addEventListener('click', (e) => {
            e.preventDefault();
            navigate('services');
        });
        document.getElementById('nav-request')?.addEventListener('click', (e) => {
            e.preventDefault();
            navigate('request');
        });
        document.getElementById('request-link-header')?.addEventListener('click', (e) => {
            e.preventDefault();
            navigate('request');
        });
    }

    render(navigate) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        this.addListeners(navigate);
    }
}
