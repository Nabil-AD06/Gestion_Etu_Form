const ApiResponse = require('../utils/ApiResponse');

/**
 * Middleware de vérification des rôles.
 * S'utilise APRÈS authenticate.
 *
 * Exemple d'utilisation dans les routes :
 *   router.post('/formations', authenticate, authorize('ADMIN'), controller)
 *   router.get('/formations', authenticate, authorize('ADMIN', 'ETUDIANT'), controller)
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return ApiResponse.unauthorized(res, 'Vous devez être connecté');
    }

    if (!roles.includes(req.user.role)) {
      return ApiResponse.forbidden(
        res,
        `Accès refusé. Rôle requis : ${roles.join(' ou ')}`
      );
    }

    next();
  };
};

module.exports = { authorize };