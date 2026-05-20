const { Etudiant, Formation, User } = require('../../models');
const AppError = require('../../utils/AppError');

class EtudiantService {

  async getAll() {
    return Etudiant.findAll({
      include: [
        { model: Formation, as: 'formation', attributes: ['id', 'titre', 'duree'] },
        { model: User, as: 'user', attributes: ['id', 'email', 'role'] }
      ],
      order: [['createdAt', 'DESC']]
    });
  }

  async getById(id) {
    const etudiant = await Etudiant.findByPk(id, {
      include: [
        { model: Formation, as: 'formation' },
        { model: User, as: 'user', attributes: ['id', 'email'] }
      ]
    });
    if (!etudiant) throw new AppError('Étudiant introuvable', 404);
    return etudiant;
  }

  async update(id, data) {
    const etudiant = await this.getById(id);
    await etudiant.update(data);
    return etudiant;
  }

  async delete(id) {
    const etudiant = await this.getById(id);
    // Supprimer aussi le compte user associé
    await User.destroy({ where: { id: etudiant.userId } });
    return { message: 'Étudiant supprimé avec succès' };
  }

  /**
   * Un étudiant s'inscrit à une formation.
   * Un étudiant ne peut s'inscrire qu'à UNE seule formation.
   */
  async inscrireAFormation(userId, formationId) {
    // Retrouver l'étudiant via son userId
    const etudiant = await Etudiant.findOne({ where: { userId } });
    if (!etudiant) throw new AppError('Profil étudiant introuvable', 404);

    // Vérifier si déjà inscrit
    if (etudiant.formationId) {
      throw new AppError(
        'Vous êtes déjà inscrit à une formation. Contactez l\'admin pour changer.',
        409
      );
    }

    // Vérifier que la formation existe
    const formation = await Formation.findByPk(formationId);
    if (!formation) throw new AppError('Formation introuvable', 404);

    // Inscrire l'étudiant
    await etudiant.update({ formationId });

    // Retourner les données complètes
    return Etudiant.findByPk(etudiant.id, {
      include: [{ model: Formation, as: 'formation' }]
    });
  }
}

module.exports = new EtudiantService();