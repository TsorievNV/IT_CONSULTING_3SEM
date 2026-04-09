import { HeaderComponent } from "./components/header/index.js";
import { FooterComponent } from "./components/footer/index.js";
import { MainPage } from "./pages/main/index.js";
import { ServicesPage } from "./pages/services/index.js";
import { ServicePage } from "./pages/service/index.js";
import { RequestPage } from "./pages/request/index.js";

// Состояние приложения
let currentPage = 'main';
let selectedService = null;

// Получаем корневой элемент
const root = document.getElementById('root');

// Функция рендера текущей страницы
function renderPage() {
    root.innerHTML = '';

    // Добавляем хедер
    const header = new HeaderComponent(root);
    header.render(navigateTo);

    // Контейнер для контента
    const contentDiv = document.createElement('div');
    contentDiv.id = 'page-content';
    root.appendChild(contentDiv);

    // Рендерим нужную страницу
    if (currentPage === 'main') {
        const mainPage = new MainPage(contentDiv);
        mainPage.render(navigateTo);
    } else if (currentPage === 'services') {
        const servicesPage = new ServicesPage(contentDiv);
        servicesPage.render(navigateTo);
    } else if (currentPage === 'service' && selectedService) {
        const servicePage = new ServicePage(contentDiv, selectedService);
        servicePage.render(navigateTo);
    } else if (currentPage === 'request') {
        const requestPage = new RequestPage(contentDiv);
        requestPage.render(navigateTo);
    }

    // Добавляем футер
    const footer = new FooterComponent(root);
    footer.render();
}

// Функция навигации
function navigateTo(page, service = null) {
    currentPage = page;
    selectedService = service;
    renderPage();

    // Прокрутка вверх
    window.scrollTo(0, 0);
}

// Запуск приложения
renderPage();
