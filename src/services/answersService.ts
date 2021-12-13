import * as answerRepository from '../repositories/answerRepository';
import { AnswerDB } from '../protocols/Answer';

async function registerAnswer(answer: string): Promise<AnswerDB> {
    const answerTheQuestion = await answerRepository.create(answer);

    return answerTheQuestion;
}

export {
    registerAnswer,
};
