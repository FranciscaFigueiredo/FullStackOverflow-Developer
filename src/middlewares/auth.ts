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
        userId = user.id;
    } catch (error) {
        res.sendStatus(401);
    }
    res.locals.user = userId;
    return next();
}

export {
    auth,
};
