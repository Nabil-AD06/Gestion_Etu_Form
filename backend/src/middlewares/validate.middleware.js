const ApiResponse = require('../utils/ApiResponse');

/**
 * Middleware de validation des données avec Joi.
 * S'utilise dans les routes pour valider req.body.
 *
 * Exemple :
 *   router.post('/login', validate(loginSchema), controller)
 */
const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,  // retourner TOUTES les erreurs, pas juste la première
      stripUnknown: true  // ignorer les champs non définis dans le schéma
    });

    if (error) {
      const errors = error.details.map(detail => detail.message);
      return ApiResponse.error(res, 'Données invalides', 422, errors);
    }

    // Remplacer req.body par les données validées et nettoyées
    req.body = value;
    next();
  };
};

module.exports = { validate };