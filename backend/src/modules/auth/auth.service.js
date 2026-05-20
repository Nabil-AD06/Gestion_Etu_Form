const jwt = require('jsonwebtoken');
const jwtConfig = require('../../config/jwt');
const { User, Etudiant } = require('../../models');
const AppError = require('../../utils/AppError');

class AuthService {

  /**
   * Inscription d'un nouvel étudiant.
   * Crée un User + un Etudiant lié dans la même transaction.
   */
  async register({ nom, prenom, email, password }) {
    // Vérifier si l'email est déjà utilisé
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new AppError('Cet email est déjà utilisé', 409);
    }

    // Créer le compte utilisateur (le hash du password est fait dans le hook du modèle)
    const user = await User.create({
      email,
      password,
      role: 'ETUDIANT'
    });

    // Créer le profil étudiant lié
    const etudiant = await Etudiant.create({
      nom,
      prenom,
      email,
      userId: user.id
    });

    // Générer le token JWT
    const token = this._generateToken(user);

    return {
      token,
      user: user.toJSON(),
      etudiant
    };
  }

  /**
   * Connexion d'un utilisateur (admin ou étudiant).
   */
  async login({ email, password }) {
    // Chercher l'utilisateur (inclure le password pour la vérification)
    const user = await User.findOne({ where: { email } });

    if (!user) {
      // Message générique pour ne pas révéler si l'email existe
      throw new AppError('Email ou mot de passe incorrect', 401);
    }

    // Vérifier le mot de passe
    const isPasswordValid = await user.verifyPassword(password);
    if (!isPasswordValid) {
      throw new AppError('Email ou mot de passe incorrect', 401);
    }

    // Générer le token
    const token = this._generateToken(user);

    return {
      token,
      user: user.toJSON()
    };
  }

  /**
   * Retourne le profil complet de l'utilisateur connecté.
   */
  async getProfile(userId) {
    const user = await User.findByPk(userId, {
      include: [{
        model: Etudiant,
        as: 'etudiant',
        include: ['formation']  // inclure la formation si inscrit
      }]
    });

    if (!user) throw new AppError('Utilisateur introuvable', 404);
    return user;
  }

  /**
   * Génère un token JWT signé avec l'id et le rôle de l'utilisateur.
   * @private
   */
  _generateToken(user) {
    return jwt.sign(
      { id: user.id, role: user.role },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );
  }
}

module.exports = new AuthService();