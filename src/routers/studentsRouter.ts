import express from 'express';
import * as studentsController from '../controllers/studentsController';

const router = express.Router();

router.post('/', studentsController.postUser);

export default router;
