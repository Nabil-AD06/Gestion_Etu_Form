/**
 * Classe d'erreur personnalisée pour l'API.
 * Permet de créer des erreurs avec un code HTTP spécifique.
 *
 * Utilisation :
 *   throw new AppError('Email déjà utilisé', 409);
 */
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // erreur prévue (pas un bug)
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;