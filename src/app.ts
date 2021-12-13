import express from 'express';
import cors from 'cors';

import questionRouter from './routers/questionsRouter';

const app = express();

app.use(cors());
app.use(express.json());

app.use(questionRouter);

export {
    app,
};
