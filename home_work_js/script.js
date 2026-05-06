// Задание 1.3: Сумма квадратов значений массива
function sumOfSquares(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i] * arr[i];
    }
    return sum;
}

// Задание 1.8: Среднее арифметическое элементов массива
function average(arr) {
    if (arr.length === 0) return 0;
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum / arr.length;
}

// ========== 2 УРОВЕНЬ ==========

// Задание 2.12: isEqual - сравнение любых двух значений
function isEqual(a, b) {
    // Если ссылка на один и тот же объект
    if (a === b) return true;

    // Разные типы
    if (typeof a !== typeof b) return false;

    // null или примитивы
    if (a === null || b === null) return a === b;
    if (typeof a !== 'object') return a === b;

    // Массивы
    const isArrayA = Array.isArray(a);
    const isArrayB = Array.isArray(b);

    if (isArrayA !== isArrayB) return false;

    if (isArrayA) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (!isEqual(a[i], b[i])) return false;
        }
        return true;
    }

    // Объекты
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    for (let key of keysA) {
        if (!b.hasOwnProperty(key)) return false;
        if (!isEqual(a[key], b[key])) return false;
    }

    return true;
}

// ========== 3 УРОВЕНЬ ==========

// Задание 3.1: merge - объединение объектов
function merge(...objects) {
    const result = {};
    for (let obj of objects) {
        for (let key in obj) {
            if (!(key in result)) {
                result[key] = obj[key];
            }
        }
    }
    return result;
}

// ========== ПРИМЕРЫ ИСПОЛЬЗОВАНИЯ ==========

console.log('=== 1.3 Сумма квадратов ===');
console.log(sumOfSquares([1, 2, 3, 4])); // 1+4+9+16 = 30

console.log('\n=== 1.8 Среднее арифметическое ===');
console.log(average([10, 20, 30, 40])); // 25

console.log('\n=== 2.12 isEqual ===');
console.log(isEqual([1, 2, 3], [1, 2, 3])); // true
console.log(isEqual({a: 1, b: 2}, {a: 1, b: 2})); // true
console.log(isEqual([1, 2], {0: 1, 1: 2})); // false

console.log('\n=== 3.1 merge ===');
console.log(merge({a: 1}, {b: 2}, {a: 3})); // {a: 1, b: 2}
console.log(merge({x: 10}, {y: 20}, {z: 30})); // {x: 10, y: 20, z: 30}
