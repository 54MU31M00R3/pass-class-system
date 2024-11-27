import express from 'express';

import usersController from '../controllers/users-controller.js';

const router = express.Router();

router.post('/signup', usersController.signup)

router.post('/login', usersController.login)

export default router;