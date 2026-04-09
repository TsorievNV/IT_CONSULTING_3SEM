export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `<button id="backButton" class="btn btn-secondary mb-3">← Назад к услугам</button>`;
    }

    addListeners(listener) {
        document.getElementById('backButton').addEventListener('click', listener);
    }

    render(listener) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        this.addListeners(listener);
    }
}
