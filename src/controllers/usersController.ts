import { Request, Response } from 'express';
import UnauthorizedAccess from '../errors/unauthorizedAccess';
import * as answersService from '../services/answersService';

async function posUser(req: Request, res: Response) {
    const answer: string = req.body.question;

    try {
        const token = await answersService.registerAnswer(answer);

        res.status(201).send(token);
    } catch (error) {
        if (error instanceof UnauthorizedAccess) {
            res.status(401).send(error.message);
        }
        res.status(500);
    }
}

export {
    posUser,
};
