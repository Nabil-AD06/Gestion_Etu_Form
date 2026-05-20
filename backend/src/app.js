require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize, User } = require('./models');
const bcrypt = require('bcryptjs');

// Import des routes
const authRoutes = require('./modules/auth/auth.routes');
const formationRoutes = require('./modules/formations/formation.routes');
const etudiantRoutes = require('./modules/etudiants/etudiant.routes');
const ApiResponse = require('./utils/ApiResponse');

const app = express();

// ============================================
// MIDDLEWARES GLOBAUX
// ============================================

// CORS - Autoriser le frontend à appeler l'API
app.use(cors({
  origin: '*',  // En prod: mettre l'URL exacte du frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parser le JSON des requêtes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// ROUTES
// ============================================

app.use('/api/auth', authRoutes);
app.use('/api/formations', formationRoutes);
app.use('/api/etudiants', etudiantRoutes);

// Route de santé — utile pour vérifier que l'API tourne
app.get('/api/health', (req, res) => {
  ApiResponse.success(res, { status: 'OK', timestamp: new Date() }, 'API opérationnelle');
});

// Route 404 — toute URL non définie
app.use((req, res) => {
  ApiResponse.notFound(res, `Route ${req.originalUrl} introuvable`);
});


// ============================================
// DÉMARRAGE DU SERVEUR
// ============================================

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // 1. Connexion à la base de données
    await sequelize.authenticate();
    console.log('✅ Connexion PostgreSQL établie');

    // 2. Synchronisation des modèles (crée les tables si elles n'existent pas)
    await sequelize.sync({ alter: true });
    console.log('✅ Tables synchronisées');

    // 3. Créer le compte admin par défaut si inexistant
    await createDefaultAdmin();

    // 4. Lancer le serveur
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
      console.log(`📋 Health check : http://localhost:${PORT}/api/health`);
    });

  } catch (error) {
    console.error('❌ Erreur démarrage serveur:', error);
    process.exit(1);
  }
}

/**
 * Crée un compte administrateur par défaut au premier démarrage.
 */
async function createDefaultAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@app.com';
  const existingAdmin = await User.findOne({ where: { email: adminEmail } });

  if (!existingAdmin) {
    await User.create({
      email: adminEmail,
      password: process.env.ADMIN_PASSWORD || 'Admin@123456',
      role: 'ADMIN'
    });
    console.log(`👤 Admin créé : ${adminEmail}`);
  }
}

startServer();