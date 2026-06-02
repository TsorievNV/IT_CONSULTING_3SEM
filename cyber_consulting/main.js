import { HeaderComponent } from "./components/header/index.js";
import { FooterComponent } from "./components/footer/index.js";
import { MainPage } from "./pages/main/index.js";
import { ServicesPage } from "./pages/services/index.js";
import { ServicePage } from "./pages/service/index.js";
import { RequestPage } from "./pages/request/index.js";

let currentPage = 'main';
let selectedSlug = null;
let selectedId = null;
let isEditMode = false;

const root = document.getElementById('root');

function renderPage() {
    root.innerHTML = '';

    const header = new HeaderComponent(root);
    header.render(navigateTo);

    const contentDiv = document.createElement('div');
    contentDiv.id = 'page-content';
    root.appendChild(contentDiv);

    if (currentPage === 'main') {
        const mainPage = new MainPage(contentDiv);
        mainPage.render(navigateTo);
    }
    else if (currentPage === 'services') {
        const servicesPage = new ServicesPage(contentDiv);
        servicesPage.render(navigateTo);
    }
    else if (currentPage === 'service' && selectedId) {
        const servicePage = new ServicePage(contentDiv, selectedId, isEditMode);
        servicePage.render(navigateTo);
    }
    else if (currentPage === 'request') {
        const requestPage = new RequestPage(contentDiv);
        requestPage.render(navigateTo);
    }

    const footer = new FooterComponent(root);
    footer.render();
}

function navigateTo(page, slug = null, id = null, edit = false) {
    currentPage = page;
    selectedSlug = slug;
    selectedId = id;
    isEditMode = edit;

    // Обновляем URL в браузере (без перезагрузки)
    if (page === 'service' && slug && typeof id === 'number' && !isNaN(id)) {
        window.history.pushState({}, '', `/${slug}/${id}`);
    }
    else if (page === 'main') {
        window.history.pushState({}, '', '/');
    }

    renderPage();
    window.scrollTo(0, 0);
}

renderPage();
