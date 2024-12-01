import express from 'express';

import usersController from '../controllers/users-controller.js';

// create router for user requests
const router = express.Router();

router.get('/user/:userId', usersController.getUserById)

// post request calls signup function from controller
router.post('/signup', usersController.signup)

// post requests calls login function from controller
router.post('/login', usersController.login)

export default router;