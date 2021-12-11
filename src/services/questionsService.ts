import * as studentRepository from '../repositories/studentRepository';
import * as questionsRepository from '../repositories/questionsRepository';

import { Question } from '../protocols/Question';

async function registerQuestion(questionInfo: Question): Promise<Question> {
    const {
        question,
        student,
        classStudent,
        tags,
    } = questionInfo;

    let user = await studentRepository.findStudent({ name: student, classStudent });

    if (user === null) {
        user = await studentRepository.create({ name: student, classStudent });
    }

    const questionCreated = await questionsRepository.create({
        question,
        studentId: user.id,
        tags,
    });

    return questionCreated;
}

export {
    registerQuestion,
};
