import { v4 as uuid } from 'uuid';
import BodyError from '../errors/BodyError';
import { Student } from '../protocols/Student';
import * as studentRepository from '../repositories/studentRepository';

async function registerStudent(studentInfo: Student) {
    const {
        name,
        classStudent,
    } = studentInfo;

    const findClass = await studentRepository.findClassByName(classStudent);

    if (!findClass.id) {
        throw new BodyError('Unregistered class');
    }

    const token: string = uuid();

    const userCreated = await studentRepository.create({ name, classStudent: findClass.id, token });
    // console.log({userCreated})
    if (userCreated === 'Invalid class') {
        throw new BodyError('Unregistered class');
    }

    if (userCreated === null) {
        throw new BodyError('Invalid body');
    }

    return token;
}

export {
    registerStudent,
};
