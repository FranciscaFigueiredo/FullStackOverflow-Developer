import { Request, Response } from 'express';
import * as answersService from '../services/answersService';

async function postAnswer(req: Request, res: Response) {
    const answer: string = req.body.question;

    try {
        const body = await answersService.registerAnswer(answer);

        res.status(201).send(body);
    } catch (error) {
        res.status(500);
    }
}

export {
    postAnswer,
};
