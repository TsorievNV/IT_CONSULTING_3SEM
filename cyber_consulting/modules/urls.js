class ServiceUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getServices(title = '') {
        if (title) {
            return `${this.baseUrl}/services?title=${encodeURIComponent(title)}`;
        }
        return `${this.baseUrl}/services`;
    }

    getServiceById(id) {
        return `${this.baseUrl}/services/${id}`;
    }
}

export const serviceUrls = new ServiceUrls();
