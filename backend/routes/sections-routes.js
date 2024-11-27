import express from 'express';

import sectionsController from '../controllers/sections-controller.js';

const router = express.Router();

router.post('/create', sectionsController.createSection);

export default router;