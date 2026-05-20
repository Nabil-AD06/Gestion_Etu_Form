const authService = require('./auth.service');
const ApiResponse = require('../../utils/ApiResponse');

class AuthController {

  async register(req, res) {
    try {
      const result = await authService.register(req.body);
      return ApiResponse.created(res, result, 'Inscription réussie');
    } catch (error) {
      if (error.isOperational) {
        return ApiResponse.error(res, error.message, error.statusCode);
      }
      console.error('[AuthController.register]', error);
      return ApiResponse.error(res, 'Erreur lors de l\'inscription');
    }
  }

  async login(req, res) {
    try {
      const result = await authService.login(req.body);
      return ApiResponse.success(res, result, 'Connexion réussie');
    } catch (error) {
      if (error.isOperational) {
        return ApiResponse.error(res, error.message, error.statusCode);
      }
      console.error('[AuthController.login]', error);
      return ApiResponse.error(res, 'Erreur lors de la connexion');
    }
  }

  async getMe(req, res) {
    try {
      const profile = await authService.getProfile(req.user.id);
      return ApiResponse.success(res, profile, 'Profil récupéré');
    } catch (error) {
      if (error.isOperational) {
        return ApiResponse.error(res, error.message, error.statusCode);
      }
      return ApiResponse.error(res);
    }
  }
}

module.exports = new AuthController();