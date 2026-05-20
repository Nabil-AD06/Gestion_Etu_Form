const { Formation, Etudiant } = require('../../models');
const AppError = require('../../utils/AppError');

class FormationService {

  async getAll() {
    return Formation.findAll({
      include: [{
        model: Etudiant,
        as: 'etudiants',
        attributes: ['id', 'nom', 'prenom', 'email']
      }],
      order: [['createdAt', 'DESC']]
    });
  }

  async getById(id) {
    const formation = await Formation.findByPk(id, {
      include: [{
        model: Etudiant,
        as: 'etudiants',
        attributes: ['id', 'nom', 'prenom', 'email']
      }]
    });

    if (!formation) throw new AppError('Formation introuvable', 404);
    return formation;
  }

  async create(data) {
    return Formation.create(data);
  }

  async update(id, data) {
    const formation = await this.getById(id);
    await formation.update(data);
    return formation;
  }

  async delete(id) {
    const formation = await this.getById(id);
    await formation.destroy();
    return { message: 'Formation supprimée avec succès' };
  }
}

module.exports = new FormationService();