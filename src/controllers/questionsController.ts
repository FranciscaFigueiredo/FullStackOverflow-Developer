/* eslint-disable prefer-destructuring */
import { Request, Response } from 'express';

import * as questionsService from '../services/questionsService';

async function postQuestions(req: Request, res: Response) {
    const question: string = req.body.question;
    const student: string = req.body.student;
    const classStudent: string = req.body.class;
    const tags: string = req.body.tags;

    try {
        const body = await questionsService.registerQuestion({
            question,
            student,
            classStudent,
            tags,
        });

        res.status(201).send(body);
    } catch (error) {
        res.status(500);
    }
}

async function findQuestionById(req: Request, res: Response) {
    const id: number = Number(req.params.id);
    try {
        const body = await questionsService.findQuestionById(id);

        res.status(201).send(body);
    } catch (error) {
        res.status(500);
    }
}

export {
    postQuestions,
    findQuestionById,
};
