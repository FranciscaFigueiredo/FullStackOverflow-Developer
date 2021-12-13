import * as answerRepository from '../repositories/answerRepository';
import { AnswerDB } from '../protocols/Answer';
import * as studentRepository from '../repositories/studentRepository';
import UnauthorizedAccess from '../errors/UnauthorizedAccess';

async function registerAnswer(answerInfo: any): Promise<AnswerDB> {
    const {
        answer,
        token,
        id,
    } = answerInfo;

    const user = await studentRepository.findStudentByToken(token);

    if (!user) {
        throw new UnauthorizedAccess('Unregistered user');
    }

    const answerTheQuestion = await answerRepository.create({
        answer,
        userId: user.id,
        questionId: id,
    });

    return answerTheQuestion;
}

export {
    registerAnswer,
};
