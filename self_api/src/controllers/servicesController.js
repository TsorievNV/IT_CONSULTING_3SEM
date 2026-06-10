const servicesService = require('../services/servicesService');

const getAllServices = (req, res) => {
    const { name } = req.query;
    const services = servicesService.findAll(name);
    res.json(services);
};

const getServiceById = (req, res) => {
    const id = parseInt(req.params.id);
    const service = servicesService.findOne(id);

    if (!service) {
        return res.status(404).json({ error: 'Услуга не найдена' });
    }

    res.json(service);
};

const createService = (req, res) => {
    const { name, description, price, icon } = req.body;

    if (!name || !description || !price) {
        return res.status(400).json({ error: 'Не все поля заполнены (name, description, price)' });
    }

    const newService = servicesService.create({ name, description, price, icon: icon || '📋' });
    res.status(201).json(newService);
};

const updateService = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedService = servicesService.update(id, req.body);

    if (!updatedService) {
        return res.status(404).json({ error: 'Услуга не найдена' });
    }

    res.json(updatedService);
};

const deleteService = (req, res) => {
    const id = parseInt(req.params.id);
    const success = servicesService.remove(id);

    if (!success) {
        return res.status(404).json({ error: 'Услуга не найдена' });
    }

    res.status(204).send();
};

const addComment = (req, res) => {
    const id = parseInt(req.params.id);
    const { text, author } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Текст комментария обязателен' });
    }

    const newComment = servicesService.addComment(id, { text, author });
    if (!newComment) {
        return res.status(404).json({ error: 'Услуга не найдена' });
    }

    res.status(201).json(newComment);
};

module.exports = {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService,
    addComment
};
