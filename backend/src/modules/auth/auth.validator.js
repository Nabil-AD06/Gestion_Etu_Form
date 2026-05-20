const Joi = require('joi');

// Schéma de validation pour l'inscription
const registerSchema = Joi.object({
  nom: Joi.string().min(2).max(100).required()
    .messages({
      'string.min': 'Le nom doit avoir au moins 2 caractères',
      'any.required': 'Le nom est obligatoire'
    }),
  prenom: Joi.string().min(2).max(100).required()
    .messages({
      'string.min': 'Le prénom doit avoir au moins 2 caractères',
      'any.required': 'Le prénom est obligatoire'
    }),
  email: Joi.string().email().required()
    .messages({
      'string.email': 'Format email invalide',
      'any.required': 'L\'email est obligatoire'
    }),
  password: Joi.string().min(8).required()
    .messages({
      'string.min': 'Le mot de passe doit avoir au moins 8 caractères',
      'any.required': 'Le mot de passe est obligatoire'
    })
});

// Schéma de validation pour la connexion
const loginSchema = Joi.object({
  email: Joi.string().email().required()
    .messages({ 'any.required': 'L\'email est obligatoire' }),
  password: Joi.string().required()
    .messages({ 'any.required': 'Le mot de passe est obligatoire' })
});

module.exports = { registerSchema, loginSchema };