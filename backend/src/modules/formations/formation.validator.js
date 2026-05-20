const Joi = require('joi');

const createFormationSchema = Joi.object({
  titre: Joi.string().min(3).max(200).required()
    .messages({
      'string.min': 'Le titre doit avoir au moins 3 caractères',
      'any.required': 'Le titre est obligatoire'
    }),
  duree: Joi.number().integer().min(1).required()
    .messages({
      'number.min': 'La durée doit être d\'au moins 1 heure',
      'any.required': 'La durée est obligatoire'
    })
});

const updateFormationSchema = Joi.object({
  titre: Joi.string().min(3).max(200),
  duree: Joi.number().integer().min(1)
}).min(1).messages({ 'object.min': 'Au moins un champ à modifier est requis' });

module.exports = { createFormationSchema, updateFormationSchema };