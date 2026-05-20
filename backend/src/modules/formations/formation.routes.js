const router = require('express').Router();
const formationController = require('./formation.controller');
const { authenticate } = require('../../middlewares/auth.middleware');
const { authorize } = require('../../middlewares/role.middleware');
const { validate } = require('../../middlewares/validate.middleware');
const { createFormationSchema, updateFormationSchema } = require('./formation.validator');

// GET /api/formations         - Tous peuvent voir (auth requis)
router.get('/', authenticate, formationController.getAll);

// GET /api/formations/:id     - Détail d'une formation
router.get('/:id', authenticate, formationController.getById);

// POST /api/formations        - Créer (ADMIN seulement)
router.post('/',
  authenticate,
  authorize('ADMIN'),
  validate(createFormationSchema),
  formationController.create
);

// PUT /api/formations/:id     - Modifier (ADMIN seulement)
router.put('/:id',
  authenticate,
  authorize('ADMIN'),
  validate(updateFormationSchema),
  formationController.update
);

// DELETE /api/formations/:id  - Supprimer (ADMIN seulement)
router.delete('/:id',
  authenticate,
  authorize('ADMIN'),
  formationController.delete
);

module.exports = router;