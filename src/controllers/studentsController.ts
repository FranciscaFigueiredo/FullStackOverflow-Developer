import { Request, Response } from 'express';
import * as studentsService from '../services/studentsService';

async function postUser(req: Request, res: Response) {
    // eslint-disable-next-line prefer-destructuring
    const name: string = req.body.name;
    const classStudent: string = req.body.class;

    try {
        const token = await studentsService.registerStudent({ name, classStudent });

        res.status(201).send(token);
    } catch (error) {
        if (error.name === 'BodyError') {
            res.status(400).send(error.message);
        }
        res.status(500);
    }
}

export {
    postUser,
};
