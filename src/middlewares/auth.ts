import { NextFunction, Request, Response } from 'express';
import { findStudentByToken } from '../repositories/studentRepository';

async function auth(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace('Bearer ', '');

    let userId = null;

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const user = await findStudentByToken(token);
        if (user === null) {
            res.sendStatus(401);
        }
        userId = user.id;
    } catch (error) {
        res.sendStatus(500);
    }
    res.locals.user = userId;
    return next();
}

export {
    auth,
};
