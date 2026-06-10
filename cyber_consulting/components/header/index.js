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
                        </div>
                    </div>
                </div>
            </div>
            <div class="main-header">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-md-4">
                            <div class="logo">
                                <a href="#" id="nav-main" style="text-decoration: none; color: inherit;">
                                    Cyber<span style="color:#ff9800;">Consult</span>
                                </a>
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
        `;
    }

    addListeners(navigate) {
        const navMain = document.getElementById('nav-main');
        if (navMain) {
            navMain.addEventListener('click', (e) => {
                e.preventDefault();
                navigate('main');
            });
        }
    }

    render(navigate) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        this.addListeners(navigate);
    }
}
