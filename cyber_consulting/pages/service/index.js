import { BackButtonComponent } from "../../components/back-button/index.js";
import { CalculatorComponent } from "../../components/calculator/index.js";

export class ServicePage {
    constructor(parent, service) {
        this.parent = parent;
        this.service = service;
    }

    getHTML() {
        return `
            <div class="container my-4">
                <div id="back-button-placeholder"></div>
                <div class="row">
                    <div class="col-md-5">
                        <div class="card-service p-4">
                            <div class="service-icon display-1">${this.service.icon}</div>
                            <h2>${this.service.title}</h2>
                            <p class="lead">${this.service.description}</p>
                            <hr>
                            <h4>Базовая стоимость: ${this.service.price.toLocaleString()} ₽/час</h4>
                            <p class="mt-3"><i class="fas fa-check-circle text-success"></i> Сертифицированные эксперты</p>
                            <p><i class="fas fa-check-circle text-success"></i> Детальный отчёт по итогам</p>
                            <p><i class="fas fa-check-circle text-success"></i> Рекомендации по устранению</p>
                        </div>
                    </div>
                    <div class="col-md-7">
                        <div id="calculator-placeholder"></div>
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
        backButton.render(() => navigate('services'));

        // Калькулятор
        const calcContainer = document.getElementById('calculator-placeholder');
        const calculator = new CalculatorComponent(calcContainer, this.service.price, this.service.title);
        calculator.render();
    }
}
