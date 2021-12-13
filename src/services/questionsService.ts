import * as studentRepository from '../repositories/studentRepository';
import * as questionsRepository from '../repositories/questionsRepository';

import { Question } from '../protocols/Question';
import UnauthorizedAccess from '../errors/UnauthorizedAccess';

async function registerQuestion(questionInfo: Question): Promise<Question> {
    const {
        question,
        student,
        classStudent,
        tags,
    } = questionInfo;

    const user = await studentRepository.findStudent({ name: student, classStudent });

    if (user === null) {
        throw new UnauthorizedAccess('User not registered');
    }

    const questionCreated = await questionsRepository.create({
        question,
        studentId: user.id,
        tags,
    });

    return questionCreated;
}

async function findQuestionById(id: number) {
    const question = await questionsRepository.findQuestion(id);

    if (question.answered === false) {
        return question;
    }

    const questionAnswered = await questionsRepository.findAnsweredQuestion(id);

    return questionAnswered;
}

async function findUnansweredQuestions() {
    const questions = await questionsRepository.findUnansweredQuestions();

    return questions;
}

export {
    registerQuestion,
    findQuestionById,
    findUnansweredQuestions,
};
