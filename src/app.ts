import express from 'express';
import cors from 'cors';

import questionRouter from './routers/questionsRouter';
import studentRouter from './routers/studentsRouter';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/questions', questionRouter);
app.use('/users', studentRouter);

export {
    app,
};
