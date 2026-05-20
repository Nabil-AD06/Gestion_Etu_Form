const router = require('express').Router();
const authController = require('./auth.controller');
const { authenticate } = require('../../middlewares/auth.middleware');
const { validate } = require('../../middlewares/validate.middleware');
const { registerSchema, loginSchema } = require('./auth.validator');

// POST /api/auth/register  - Inscription (public)
router.post('/register', validate(registerSchema), authController.register);

// POST /api/auth/login     - Connexion (public)
router.post('/login', validate(loginSchema), authController.login);

// GET  /api/auth/me        - Profil connecté (authentifié)
router.get('/me', authenticate, authController.getMe);

module.exports = router;