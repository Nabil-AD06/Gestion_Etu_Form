/**
 * Format de réponse standardisé pour toute l'API.
 * Chaque réponse a toujours la même structure → facilite le travail du frontend.
 *
 * Succès  : { success: true,  data: {...},  message: "..." }
 * Erreur  : { success: false, error: "...", message: "..." }
 */
class ApiResponse {
  static success(res, data, message = 'Succès', statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  }

  static created(res, data, message = 'Créé avec succès') {
    return ApiResponse.success(res, data, message, 201);
  }

  static error(res, message = 'Erreur serveur', statusCode = 500, errors = null) {
    const response = { success: false, message };
    if (errors) response.errors = errors;
    return res.status(statusCode).json(response);
  }

  static notFound(res, message = 'Ressource introuvable') {
    return ApiResponse.error(res, message, 404);
  }

  static unauthorized(res, message = 'Non autorisé') {
    return ApiResponse.error(res, message, 401);
  }

  static forbidden(res, message = 'Accès refusé') {
    return ApiResponse.error(res, message, 403);
  }
}

module.exports = ApiResponse;