import { NextFunction, Request, Response } from 'express';
import * as studentRepository from '../repositories/studentRepository';

async function auth(req: Request, res: Response, next: NextFunction) {
    const token: string = req.headers.authorization?.replace('Bearer ', '');

    // let idUser = null;

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const user = await studentRepository.findStudentByToken(token);

        if (user === null) {
            res.sendStatus(401);
        }
        // idUser = user.id;
    } catch (error) {
        res.sendStatus(500);
    }
    res.locals.user = token;
    return next();
}

export {
    auth,
};
