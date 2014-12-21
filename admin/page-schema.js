var Joi = require('joi');

module.exports = Joi.object().keys({
    title: Joi.string().max(50).required(),
    subtitle: Joi.string().max(45),
    view: Joi.string().min(5).max(50).required(),
    intro: Joi.string().min(15).required(),
    description: Joi.string().min(0).max(125),
    content: Joi.string().min(5).max(5050).required(),
    createdBy: Joi.string().min(3).max(50).required(),
    createdOn: Joi.date(),
    editedBy: Joi.string().max(50),
    editedOn: Joi.date()
});