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
                            <h2 class="text-center mb-4">📝 Оставить заявку</h2>
                            <p class="text-center">Страница заявки (в разработке для 5-й лабораторной)</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(navigate) {
        this.parent.innerHTML = this.getHTML();

        const backPlaceholder = document.getElementById('back-button-placeholder');
        if (backPlaceholder) {
            const backButton = new BackButtonComponent(backPlaceholder);
            backButton.render(() => navigate('main'));
        }
    }
}
