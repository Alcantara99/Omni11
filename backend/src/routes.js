const express = require('express');
const ongController = require('./controllers/ongController');
const incidentController = require('./controllers/incidentController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');
const { celebrate, Segments, Joi } = require('celebrate');

const routes = express.Router();

// [Segments.BODY]: Joi.object().keys({
        
// })

//! criar uma sessão
routes.post('/sessions', sessionController.create);

//! listar ongs
routes.get('/ongs', ongController.listar);
//! criar ong
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), ongController.create)
//! listar casos especificos de uma ong
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown()
}), profileController.listar);

//! listar casos
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), incidentController.listar);
//! criar caso
routes.post('/incidents', incidentController.create);
//! apagar caso
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown()
}), incidentController.delete);

module.exports = routes;