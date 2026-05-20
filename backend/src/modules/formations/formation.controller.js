const formationService = require('./formation.service');
const ApiResponse = require('../../utils/ApiResponse');

class FormationController {

  async getAll(req, res) {
    try {
      const formations = await formationService.getAll();
      return ApiResponse.success(res, formations);
    } catch (error) {
      return ApiResponse.error(res);
    }
  }

  async getById(req, res) {
    try {
      const formation = await formationService.getById(req.params.id);
      return ApiResponse.success(res, formation);
    } catch (error) {
      if (error.isOperational) return ApiResponse.error(res, error.message, error.statusCode);
      return ApiResponse.error(res);
    }
  }

  async create(req, res) {
    try {
      const formation = await formationService.create(req.body);
      return ApiResponse.created(res, formation, 'Formation créée avec succès');
    } catch (error) {
      if (error.isOperational) return ApiResponse.error(res, error.message, error.statusCode);
      return ApiResponse.error(res);
    }
  }

  async update(req, res) {
    try {
      const formation = await formationService.update(req.params.id, req.body);
      return ApiResponse.success(res, formation, 'Formation mise à jour');
    } catch (error) {
      if (error.isOperational) return ApiResponse.error(res, error.message, error.statusCode);
      return ApiResponse.error(res);
    }
  }

  async delete(req, res) {
    try {
      const result = await formationService.delete(req.params.id);
      return ApiResponse.success(res, result, 'Formation supprimée');
    } catch (error) {
      if (error.isOperational) return ApiResponse.error(res, error.message, error.statusCode);
      return ApiResponse.error(res);
    }
  }
}

module.exports = new FormationController();
