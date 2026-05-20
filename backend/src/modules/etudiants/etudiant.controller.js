const etudiantService = require('./etudiant.service');
const ApiResponse = require('../../utils/ApiResponse');

class EtudiantController {

  async getAll(req, res) {
    try {
      const etudiants = await etudiantService.getAll();
      return ApiResponse.success(res, etudiants);
    } catch (error) {
      return ApiResponse.error(res);
    }
  }

  async getById(req, res) {
    try {
      const etudiant = await etudiantService.getById(req.params.id);
      return ApiResponse.success(res, etudiant);
    } catch (error) {
      if (error.isOperational) return ApiResponse.error(res, error.message, error.statusCode);
      return ApiResponse.error(res);
    }
  }

  async update(req, res) {
    try {
      const etudiant = await etudiantService.update(req.params.id, req.body);
      return ApiResponse.success(res, etudiant, 'Étudiant mis à jour');
    } catch (error) {
      if (error.isOperational) return ApiResponse.error(res, error.message, error.statusCode);
      return ApiResponse.error(res);
    }
  }

  async delete(req, res) {
    try {
      const result = await etudiantService.delete(req.params.id);
      return ApiResponse.success(res, result);
    } catch (error) {
      if (error.isOperational) return ApiResponse.error(res, error.message, error.statusCode);
      return ApiResponse.error(res);
    }
  }

  async inscrireAFormation(req, res) {
    try {
      const { formationId } = req.body;
      if (!formationId) {
        return ApiResponse.error(res, 'formationId est requis', 422);
      }
      const etudiant = await etudiantService.inscrireAFormation(req.user.id, formationId);
      return ApiResponse.success(res, etudiant, 'Inscription réussie !');
    } catch (error) {
      if (error.isOperational) return ApiResponse.error(res, error.message, error.statusCode);
      return ApiResponse.error(res);
    }
  }
}

module.exports = new EtudiantController();