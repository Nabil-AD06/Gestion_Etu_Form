const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Etudiant = sequelize.define('Etudiant', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Le nom ne peut pas être vide' }
    }
  },
  prenom: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Le prénom ne peut pas être vide' }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: { msg: 'Cet email étudiant est déjà utilisé' },
    validate: {
      isEmail: { msg: 'Format email invalide' }
    }
  },
  // Clés étrangères définies dans models/index.js via associations
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true  // relation 1-1 avec User
  },
  formationId: {
    type: DataTypes.INTEGER,
    allowNull: true  // null = pas encore inscrit
  }
}, {
  tableName: 'etudiants',
  timestamps: true,
  underscored: true
});

module.exports = Etudiant;