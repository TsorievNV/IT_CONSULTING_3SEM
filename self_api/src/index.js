const express = require('express');
const path = require('path');
const servicesRouter = require('./routes/services');
const servicesService = require('./services/servicesService');

const app = express();
const PORT = 3000;

const DATA_FILE_PATH = path.join(__dirname, 'data/services.json');

servicesService.init(DATA_FILE_PATH);

app.use(express.json());

// Раздача статики (фронтенд)
app.use(express.static(path.join(__dirname, '../public')));

// Логирование
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// API маршруты
app.use('/security_service', servicesRouter);

// ★★★ ГЛАВНОЕ: все остальные GET-запросы отдаём index.html (для фронтенд-роутинга) ★★★
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Обработка 404 (сработает только если ни один маршрут не подошёл, но после app.get('*') это не случится)
app.use((req, res) => {
    res.status(404).json({ error: 'Маршрут не найден' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
    console.log(`API доступно по адресу http://localhost:${PORT}/services`);
});

// Long Polling эндпоинт
app.get('/random-number', (req, res) => {
    // Устанавливаем таймаут соединения 30 секунд
    req.socket.setTimeout(30000);

    // Случайная задержка от 0 до 10000 мс
    const delay = Math.random() * 10000;

    setTimeout(() => {
        const randomNum = Math.floor(Math.random() * 100) + 1;
        res.json({ number: randomNum });
    }, delay);
});
