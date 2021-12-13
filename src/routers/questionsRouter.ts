import express from 'express';
import * as answersController from '../controllers/answersController';
import * as questionsController from '../controllers/questionsController';
// import { auth } from '../middlewares/auth';

const router = express.Router();

router.post('/', questionsController.postQuestions);
router.get('/', questionsController.findUnansweredQuestions);
router.post('/:id', answersController.postAnswer);
router.get('/:id', questionsController.findQuestionById);
// router.post('/users',);

export default router;
