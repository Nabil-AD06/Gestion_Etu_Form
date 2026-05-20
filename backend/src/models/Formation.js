const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Formation = sequelize.define('Formation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titre: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Le titre ne peut pas être vide' },
      len: { args: [3, 200], msg: 'Le titre doit faire entre 3 et 200 caractères' }
    }
  },
  duree: {
    type: DataTypes.INTEGER,  // durée en heures
    allowNull: false,
    validate: {
      min: { args: [1], msg: 'La durée doit être d\'au moins 1 heure' }
    }
  }
}, {
  tableName: 'formations',
  timestamps: true,
  underscored: true
});

module.exports = Formation;