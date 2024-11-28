import express from 'express';

import contentController from '../controllers/content-controller.js';

const router = express.Router();

router.get('/:sectionId', contentController.getContentBySectionId);

router.post('/worksheet/:contentId', contentController.getWorksheet);

router.post('/announcement/:contentId', contentController.getAnnouncement);

router.post('/worksheet', contentController.uploadWorksheet);

router.post('/announcement', contentController.uploadAnnouncement);

export default router;