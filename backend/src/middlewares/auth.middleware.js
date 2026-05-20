const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const { User } = require('../models');
const ApiResponse = require('../utils/ApiResponse');

/**
 * Middleware d'authentification.
 * Vérifie que le token JWT dans le header est valide.
 *
 * Le frontend doit envoyer : Authorization: Bearer <token>
 */
const authenticate = async (req, res, next) => {
  try {
    // 1. Récupérer le token depuis le header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return ApiResponse.unauthorized(res, 'Token d\'authentification manquant');
    }

    const token = authHeader.split(' ')[1]; // "Bearer TOKEN" → "TOKEN"

    // 2. Vérifier et décoder le token
    let decoded;
    try {
      decoded = jwt.verify(token, jwtConfig.secret);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return ApiResponse.unauthorized(res, 'Session expirée, veuillez vous reconnecter');
      }
      return ApiResponse.unauthorized(res, 'Token invalide');
    }

    // 3. Vérifier que l'utilisateur existe toujours en base
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return ApiResponse.unauthorized(res, 'Utilisateur introuvable');
    }

    // 4. Attacher l'utilisateur à la requête pour les prochains middlewares
    req.user = user;
    next();

  } catch (error) {
    return ApiResponse.error(res, 'Erreur d\'authentification', 500);
  }
};

module.exports = { authenticate };