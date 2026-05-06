export class CalculatorComponent {
    constructor(parent, pricePerHour, serviceName = '') {
        this.parent = parent;
        this.pricePerHour = pricePerHour;
        this.serviceName = serviceName;
        this.hours = 5;
        this.urgency = 1;
        this.offices = 1;
        this.a = '';      // для хранения числа с экрана (лямбда)
        this.b = '';
        this.selectedOperation = null;
    }

    // Факториал для Пуассона
    factorial(n) {
        if (n < 0) return NaN;
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) result *= i;
        return result;
    }

    // Формула Пуассона
    poissonProbability(lambda, k) {
        return (Math.pow(lambda, k) * Math.exp(-lambda)) / this.factorial(k);
    }

    getHTML() {
        return `
            <div class="calculator-card">
                <h4><i class="fas fa-calculator"></i> Калькулятор стоимости</h4>
                <p>Услуга: <strong>${this.serviceName || 'ИТ-консалтинг'}</strong></p>
                <p>Базовая ставка: <strong>${this.pricePerHour.toLocaleString()} ₽/час</strong></p>

                <hr>

                <div class="mb-3">
                    <label class="form-label">Количество часов:</label>
                    <input type="range" id="hoursRange" class="form-range" min="1" max="40" value="${this.hours}">
                    <div class="d-flex justify-content-between">
                        <span>1 ч</span>
                        <span><span id="hoursValue">${this.hours}</span></span>
                        <span>40 ч</span>
                    </div>
                </div>

                <div class="mb-3">
                    <label class="form-label">Срочность:</label>
                    <select id="urgencySelect" class="form-select">
                        <option value="1">Обычная (без наценки)</option>
                        <option value="1.3">Срочная (+30%)</option>
                        <option value="1.5">Очень срочная (+50%)</option>
                        <option value="2">Критическая (+100%)</option>
                    </select>
                </div>

                <div class="mb-3">
                    <label class="form-label">Количество офисов:</label>
                    <input type="number" id="officesInput" class="form-control" min="1" max="100" value="${this.offices}">
                </div>

                <div class="mb-3">
                    <label class="form-label">Дополнительные опции:</label>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="optionReport" value="5000">
                        <label class="form-check-label">Развёрнутый отчёт (+5000 ₽)</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="optionSupport" value="3000">
                        <label class="form-check-label">Пост-консультация 1 месяц (+3000 ₽)</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="optionUrgent" value="10000">
                        <label class="form-check-label">Выезд специалиста на объект (+10000 ₽)</label>
                    </div>
                </div>

                <hr>

                <!-- НОВАЯ КНОПКА ПУАССОНА -->
                <div class="text-center mb-3">
                    <button id="btn_poisson" class="btn btn-success" style="width: 100%;">
                        <i class="fas fa-chart-line"></i> 📊 Рассчитать нагрузку
                    </button>
                    <small class="text-muted d-block mt-1">
                        Прогноз вероятности инцидентов (λ → P(k))
                    </small>
                </div>

                <hr>

                <div class="text-center">
                    <h5>Итоговая стоимость:</h5>
                    <div class="total-price" id="totalCost">0 ₽</div>
                    <button id="calcBtn" class="btn btn-primary mt-3">
                        <i class="fas fa-sync-alt"></i> Пересчитать
                    </button>
                </div>

                <div class="alert alert-info mt-3 small">
                    <i class="fas fa-info-circle"></i> Окончательная стоимость фиксируется после согласования с менеджером.
                </div>
            </div>
        `;
    }

    calculateTotal() {
        let baseCost = this.pricePerHour * this.hours * this.urgency * this.offices;

        const optionReport = document.getElementById('optionReport')?.checked ? 5000 : 0;
        const optionSupport = document.getElementById('optionSupport')?.checked ? 3000 : 0;
        const optionUrgent = document.getElementById('optionUrgent')?.checked ? 10000 : 0;

        const total = baseCost + optionReport + optionSupport + optionUrgent;
        return Math.round(total);
    }

    updateDisplay(value) {
        const totalElement = document.getElementById('totalCost');
        const hoursElement = document.getElementById('hoursValue');

        if (totalElement && value === undefined) {
            const total = this.calculateTotal();
            totalElement.innerHTML = total.toLocaleString() + ' ₽';
        } else if (totalElement && value !== undefined) {
            totalElement.innerHTML = value;
        }

        if (hoursElement) {
            hoursElement.innerHTML = this.hours;
        }
    }

    // Функция для отображения сообщений на экране калькулятора
    showMessage(msg, duration = 2000) {
        const totalElement = document.getElementById('totalCost');
        if (totalElement) {
            const originalText = totalElement.innerHTML;
            totalElement.innerHTML = msg;
            setTimeout(() => {
                const newTotal = this.calculateTotal();
                totalElement.innerHTML = newTotal.toLocaleString() + ' ₽';
            }, duration);
        }
    }

    addListeners() {
        const hoursRange = document.getElementById('hoursRange');
        const urgencySelect = document.getElementById('urgencySelect');
        const officesInput = document.getElementById('officesInput');
        const calcBtn = document.getElementById('calcBtn');
        const optionReport = document.getElementById('optionReport');
        const optionSupport = document.getElementById('optionSupport');
        const optionUrgent = document.getElementById('optionUrgent');
        const poissonBtn = document.getElementById('btn_poisson');

        const update = () => {
            this.hours = parseInt(hoursRange.value);
            this.urgency = parseFloat(urgencySelect.value);
            this.offices = parseInt(officesInput.value) || 1;
            this.updateDisplay();
        };

        // Пуассон (расчёт нагрузки)
        if (poissonBtn) {
            poissonBtn.addEventListener('click', () => {
                // Берём значение из поля "Количество часов" как λ
                const lambda = this.hours;

                if (lambda <= 0) {
                    this.showMessage("Ошибка: λ > 0");
                    return;
                }

                let k = prompt(`📊 Расчёт нагрузки по Пуассону\n\nВведите k (количество событий/инцидентов)\nλ (среднее) = ${lambda}`);
                if (k === null) return;
                k = parseInt(k);

                if (isNaN(k) || k < 0) {
                    this.showMessage("Ошибка: k ≥ 0");
                    return;
                }

                const probability = this.poissonProbability(lambda, k);
                const percent = (probability * 100).toFixed(6);

                let message = '';
                if (probability < 0.01) {
                    message = `⚠️ Вероятность ${percent}% — очень низкая`;
                } else if (probability < 0.1) {
                    message = `📉 Вероятность ${percent}% — низкая`;
                } else if (probability < 0.3) {
                    message = `📊 Вероятность ${percent}% — средняя`;
                } else {
                    message = `⚠️ Вероятность ${percent}% — высокая!`;
                }

                this.showMessage(`P(${k}|λ=${lambda}) = ${percent}%`);
                setTimeout(() => {
                    alert(`📈 Результат расчёта Пуассона:\n\nP(${k}) при λ=${lambda} = ${percent}%\n\n${message}`);
                }, 100);

                console.log(`Пуассон: λ=${lambda}, k=${k}, P=${probability}, ${percent}%`);
            });
        }

        if (hoursRange) hoursRange.addEventListener('input', update);
        if (urgencySelect) urgencySelect.addEventListener('change', update);
        if (officesInput) officesInput.addEventListener('input', update);
        if (calcBtn) calcBtn.addEventListener('click', update);
        if (optionReport) optionReport.addEventListener('change', update);
        if (optionSupport) optionSupport.addEventListener('change', update);
        if (optionUrgent) optionUrgent.addEventListener('change', update);

        update();
    }

    render() {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        this.addListeners();
    }
}
