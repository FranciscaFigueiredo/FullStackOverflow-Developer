import { Request, Response } from 'express';
import * as answersService from '../services/answersService';

async function postAnswer(req: Request, res: Response) {
    const { id } = req.params;
    const token: string = res.locals.user;

    // eslint-disable-next-line prefer-destructuring
    const answer: string = req.body.answer;

    try {
        const body = await answersService.registerAnswer({ answer, token, id });

        return res.status(201).send(body);
    } catch (error) {
        if (error.name === 'UnauthorizedAccess') {
            return res.status(401).send(error.message);
        }
        return res.status(500);
    }
}

export {
    postAnswer,
};
