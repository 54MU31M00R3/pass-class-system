import express from 'express';

import contentController from '../controllers/content-controller.js';

// create router for content requests
const router = express.Router();

// get request that calls for all content associated with a section id
router.get('/:sectionId', contentController.getContentBySectionId);

// get request that calls for a worksheet associated with a spefific content id
router.get('/worksheet/:contentId', contentController.getWorksheet);

// get request that calls for a announcement associated with a spefific content id
router.get('/announcement/:contentId', contentController.getAnnouncement);

// post request that calls for the creation of a worksheet 
router.post('/worksheet', contentController.uploadWorksheet);

// post request that calls for the creation of an announcement
router.post('/announcement', contentController.uploadAnnouncement);

export default router;