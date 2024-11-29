import express from 'express';

import sectionsController from '../controllers/sections-controller.js';

// creates router for sections requests
const router = express.Router();

// get request calls for all sections from controller
router.get('/', sectionsController.getAllSections)

// get request calls for sections associated with userId from controller
router.get('/user/:userId', sectionsController.getSectionsByUserId)

// get request calls for section associated with its own id from controller
router.get('/section/:sectionId', sectionsController.getSectionById)

// get request calls for section and user to update relationship and 
// associate with eachother based on ids
// not yet implemented on frontend, a post request may be better here
router.get('/section/:sectionId/user/:userId', sectionsController.enrolSection)

// post request to create a new section for students to enrol in
router.post('/create', sectionsController.createSection);

export default router;