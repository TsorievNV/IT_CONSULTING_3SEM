window.onload = function() {
    // ===== Переменные для хранения чисел и операций =====
    let a = ''           // Первое число
    let b = ''           // Второе число
    let expressionResult = ''  // Результат вычисления
    let selectedOperation = null  // Выбранная операция

    // ===== Получаем доступ к экрану калькулятора =====
    const outputElement = document.getElementById("result")

    // ===== Получаем все кнопки с цифрами =====
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')

    // ===== Функция обновления экрана =====
    function updateDisplay(value) {
        outputElement.innerHTML = value
    }

    // ===== Функция обработки нажатия на цифровые кнопки =====
    function onDigitButtonClicked(digit) {
        // Если операция не выбрана, работаем с первым числом (a)
        if (!selectedOperation) {
            // Проверяем, не пытаемся ли мы добавить вторую точку
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
                a += digit
            }
            updateDisplay(a || '0')
        }
        // Если операция выбрана, работаем со вторым числом (b)
        else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) {
                b += digit
                updateDisplay(b)
            }
        }
    }

    // ===== Настройка обработчиков для цифровых кнопок =====
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    });

    // ===== Обработчики для кнопок операций =====
    document.getElementById("btn_op_mult").onclick = function() {
        if (a === '') return
        selectedOperation = 'x'
    }
    document.getElementById("btn_op_plus").onclick = function() {
        if (a === '') return
        selectedOperation = '+'
    }
    document.getElementById("btn_op_minus").onclick = function() {
        if (a === '') return
        selectedOperation = '-'
    }
    document.getElementById("btn_op_div").onclick = function() {
        if (a === '') return
        selectedOperation = '/'
    }

    // ===== Кнопка очистки C =====
    document.getElementById("btn_op_clear").onclick = function() {
        a = ''
        b = ''
        selectedOperation = null
        expressionResult = ''
        updateDisplay('0')
    }

    // ===== Кнопка равно =====
    document.getElementById("btn_op_equal").onclick = function() {
        // Проверяем, что у нас есть оба числа и операция
        if (a === '' || b === '' || !selectedOperation)
            return

        let numA = parseFloat(a)
        let numB = parseFloat(b)

        // Выполняем выбранную операцию
        switch(selectedOperation) {
            case 'x':
                expressionResult = numA * numB
                break
            case '+':
                expressionResult = numA + numB
                break
            case '-':
                expressionResult = numA - numB
                break
            case '/':
                if (numB === 0) {
                    updateDisplay("Ошибка")
                    return
                }
                expressionResult = numA / numB
                break
            default:
                break
        }

        // Сохраняем результат и очищаем второе число
        a = expressionResult.toString()
        b = ''
        selectedOperation = null

        // Показываем результат на экране
        updateDisplay(a)
    }

    // ===== ЗАДАНИЕ 1: Смена знака +/- =====
    document.getElementById("btn_op_sign").onclick = function() {
        if (!selectedOperation) {
            if (a !== '' && a !== '0') {
                if (a.startsWith('-')) {
                    a = a.substring(1)
                } else {
                    a = '-' + a
                }
                updateDisplay(a)
            }
        } else {
            if (b !== '' && b !== '0') {
                if (b.startsWith('-')) {
                    b = b.substring(1)
                } else {
                    b = '-' + b
                }
                updateDisplay(b)
            }
        }
    }

    // ===== ЗАДАНИЕ 2: Процент % =====
    document.getElementById("btn_op_percent").onclick = function() {
        if (!selectedOperation) {
            if (a !== '') {
                a = (parseFloat(a) / 100).toString()
                updateDisplay(a)
            }
        } else {
            if (b !== '') {
                b = (parseFloat(b) / 100).toString()
                updateDisplay(b)
            }
        }
    }

    // ===== ЗАДАНИЕ 3: Backspace (стирание последней цифры) =====
    document.getElementById("btn_op_backspace").onclick = function() {
        if (!selectedOperation) {
            if (a !== '' && a !== '0') {
                a = a.slice(0, -1)
                updateDisplay(a || '0')
            }
        } else {
            if (b !== '' && b !== '0') {
                b = b.slice(0, -1)
                updateDisplay(b || '0')
            }
        }
    }

    // ===== ЗАДАНИЕ 5: Квадратный корень =====
    document.getElementById("btn_op_sqrt").onclick = function() {
        if (!selectedOperation) {
            if (a !== '') {
                let num = parseFloat(a)
                if (num >= 0) {
                    a = Math.sqrt(num).toString()
                    updateDisplay(a)
                } else {
                    updateDisplay("Ошибка")
                    setTimeout(() => updateDisplay(a || '0'), 1000)
                }
            }
        } else {
            if (b !== '') {
                let num = parseFloat(b)
                if (num >= 0) {
                    b = Math.sqrt(num).toString()
                    updateDisplay(b)
                } else {
                    updateDisplay("Ошибка")
                }
            }
        }
    }

    // ===== ЗАДАНИЕ 6: Возведение в квадрат =====
    document.getElementById("btn_op_square").onclick = function() {
        if (!selectedOperation) {
            if (a !== '') {
                let num = parseFloat(a)
                a = (num * num).toString()
                updateDisplay(a)
            }
        } else {
            if (b !== '') {
                let num = parseFloat(b)
                b = (num * num).toString()
                updateDisplay(b)
            }
        }
    }

    // ===== ЗАДАНИЕ 7: Факториал =====
    document.getElementById("btn_op_factorial").onclick = function() {
        function factorial(n) {
            if (n < 0) return NaN
            if (n === 0 || n === 1) return 1
            let result = 1
            for (let i = 2; i <= n; i++) {
                result *= i
            }
            return result
        }

        if (!selectedOperation) {
            if (a !== '') {
                let num = parseInt(a)
                if (!isNaN(num) && num >= 0 && num <= 170) {
                    a = factorial(num).toString()
                    updateDisplay(a)
                } else {
                    updateDisplay("Ошибка")
                    setTimeout(() => updateDisplay(a || '0'), 1000)
                }
            }
        } else {
            if (b !== '') {
                let num = parseInt(b)
                if (!isNaN(num) && num >= 0 && num <= 170) {
                    b = factorial(num).toString()
                    updateDisplay(b)
                } else {
                    updateDisplay("Ошибка")
                }
            }
        }
    }

    // ===== ЗАДАНИЕ 8: Добавление трёх нулей =====
    document.getElementById("btn_digit_000").onclick = function() {
        if (!selectedOperation) {
            if (a !== '') {
                a += '000'
                updateDisplay(a)
            } else {
                a = '000'
                updateDisplay(a)
            }
        } else {
            if (b !== '') {
                b += '000'
                updateDisplay(b)
            } else {
                b = '000'
                updateDisplay(b)
            }
        }
    }

    // ===== ИНДИВИДУАЛЬНАЯ ОПЕРАЦИЯ: Расчёт стоимости консультации =====
    document.getElementById("btn_consulting").onclick = function() {
        let hours = parseFloat(a)

        if (isNaN(hours) || hours <= 0) {
            updateDisplay("Ошибка: введите часы")
            setTimeout(() => updateDisplay(a || '0'), 1500)
            return
        }

        const RATE = 5000  // Ставка консультанта в рублях за час
        let total = hours * RATE

        // Сохраняем результат как текущее число
        a = total.toString()
        b = ''
        selectedOperation = null

        updateDisplay(`${total.toLocaleString()} ₽`)
    }

    const themeToggle = document.getElementById('themeToggle')
    const themeSelect = document.getElementById('themeSelect')

    function setTheme(theme) {
        if (theme === 'light') {
            document.body.classList.add('light-theme')
        } else {
            document.body.classList.remove('light-theme')
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme')
            if (document.body.classList.contains('light-theme')) {
                themeSelect.value = 'light'
            } else {
                themeSelect.value = 'dark'
            }
        })
    }

    if (themeSelect) {
        themeSelect.addEventListener('change', (e) => {
            setTheme(e.target.value)
        })
    }
}
