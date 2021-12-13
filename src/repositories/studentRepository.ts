import { connection } from '../database/database';
import { Student, StudentDB } from '../protocols/Student';

async function create(studentInfo: Student) {
    const {
        name,
        classStudent,
    } = studentInfo;

    const insert = await connection.query(`
        INSERT INTO students
            (name, class, token)
        VALUES
            ($1, $2);
    `, [name, classStudent]);
    if (insert.rowCount) {
        return insert.rows[0];
    }
    return null;
}

async function findStudent(studentInfo: Student): Promise<StudentDB> {
    const {
        name,
        classStudent,
    } = studentInfo;

    const search = await connection.query(`
        SELECT * FROM students
        WHERE name = $1 AND class = $2;
    `, [name, classStudent]);

    return search.rows[0];
}

async function findStudentByToken(token: string): Promise<StudentDB> {
    const search = await connection.query(`
        SELECT * FROM students
        WHERE token = $1;
    `, [token]);

    return search.rows[0];
}

export {
    create,
    findStudent,
    findStudentByToken,
};
