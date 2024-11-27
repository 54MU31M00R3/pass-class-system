import express from 'express';

import sectionsController from '../controllers/sections-controller.js';

const router = express.Router();

router.get('/', sectionsController.getAllSections)

router.get('/user/:userId', sectionsController.getSectionsByUserId)

router.get('/section/:sectionId', sectionsController.getSectionById)

router.post('/create', sectionsController.createSection);

export default router;