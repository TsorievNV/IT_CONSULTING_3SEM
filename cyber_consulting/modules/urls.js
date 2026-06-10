class ServiceUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getServices(title = '') {
        if (title) {
            return `${this.baseUrl}/security_service?title=${encodeURIComponent(title)}`;
        }
        return `${this.baseUrl}/security_service`;
    }

    getServiceById(id) {
        return `${this.baseUrl}/security_service/${id}`;
    }

    addComment(id) {
        return `${this.baseUrl}/security_service/${id}/comments`;
    }
}

export const serviceUrls = new ServiceUrls();
