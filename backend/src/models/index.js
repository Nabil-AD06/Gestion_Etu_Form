/**
 * Point central pour tous les modèles.
 * C'est ici qu'on définit les associations (relations) entre modèles.
 */
const sequelize = require('../config/database');
const User = require('./User');
const Formation = require('./Formation');
const Etudiant = require('./Etudiant');

// ============================================
// ASSOCIATIONS (Relations entre tables)
// ============================================

// User 1 <--> 1 Etudiant
User.hasOne(Etudiant, {
  foreignKey: 'userId',
  as: 'etudiant',
  onDelete: 'CASCADE'  // si on supprime le user, l'étudiant est supprimé aussi
});
Etudiant.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

// Formation 1 <--> N Etudiants
Formation.hasMany(Etudiant, {
  foreignKey: 'formationId',
  as: 'etudiants',
  onDelete: 'SET NULL'  // si formation supprimée, formationId devient null
});
Etudiant.belongsTo(Formation, {
  foreignKey: 'formationId',
  as: 'formation'
});

module.exports = { sequelize, User, Formation, Etudiant };