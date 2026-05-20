const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: 'Cet email est déjà utilisé'
    },
    validate: {
      isEmail: { msg: 'Format email invalide' }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('ADMIN', 'ETUDIANT'),
    allowNull: false,
    defaultValue: 'ETUDIANT'
  }
}, {
  tableName: 'users',
  timestamps: true,        // createdAt, updatedAt automatiques
  underscored: true,       // snake_case en base (created_at)
  hooks: {
    // Hash automatique du mot de passe avant sauvegarde
    beforeCreate: async (user) => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 12);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 12);
      }
    }
  }
});

// Méthode pour vérifier le mot de passe (utilisée dans auth.service.js)
User.prototype.verifyPassword = async function(plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

// Méthode pour exclure le mot de passe des réponses JSON
User.prototype.toJSON = function() {
  const values = Object.assign({}, this.get());
  delete values.password;
  return values;
};

module.exports = User;