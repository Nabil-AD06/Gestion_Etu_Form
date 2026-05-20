const router = require('express').Router();
const etudiantController = require('./etudiant.controller');
const { authenticate } = require('../../middlewares/auth.middleware');
const { authorize } = require('../../middlewares/role.middleware');

// GET /api/etudiants           - Liste (ADMIN)
router.get('/', authenticate, authorize('ADMIN'), etudiantController.getAll);

// GET /api/etudiants/:id       - Détail (ADMIN)
router.get('/:id', authenticate, authorize('ADMIN'), etudiantController.getById);

// PUT /api/etudiants/:id       - Modifier (ADMIN)
router.put('/:id', authenticate, authorize('ADMIN'), etudiantController.update);

// DELETE /api/etudiants/:id    - Supprimer (ADMIN)
router.delete('/:id', authenticate, authorize('ADMIN'), etudiantController.delete);

// POST /api/etudiants/inscription - S'inscrire à une formation (ETUDIANT)
router.post('/inscription', authenticate, authorize('ETUDIANT'), etudiantController.inscrireAFormation);

module.exports = router;