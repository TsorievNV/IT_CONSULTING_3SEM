export class ServiceCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card-service" data-id="${data.id}">
                    <div class="card-body">
                        <div class="service-icon">${data.icon}</div>
                        <h5 class="card-title">${data.title}</h5>
                        <p class="card-text">${data.description}</p>
                        <p class="fw-bold text-primary">от ${data.price.toLocaleString()} ₽/час</p>
                        <button class="btn btn-sm btn-outline-primary" data-id="${data.id}" id="btn-service-${data.id}">Подробнее →</button>
                    </div>
                </div>
            </div>
        `;
    }ы

    addListeners(data, listener) {
        document.getElementById(`btn-service-${data.id}`)?.addEventListener('click', listener);
    }

    render(data, listener) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
        this.addListeners(data, listener);
    }
}
