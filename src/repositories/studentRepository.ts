import { connection } from '../database/database';
import { Student, StudentDB, StudentRegister } from '../protocols/Student';

async function create(studentInfo: StudentRegister): Promise<any> {
    const {
        name,
        classStudent,
        token,
    } = studentInfo;

    const insert = await connection.query(`
        INSERT INTO students
            (name, class_id, token)
        VALUES
            ($1, $2, $3);
    `, [name, classStudent, token]);

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
        JOIN classes 
            ON students.class_id = classes.id
        WHERE students.name = $1 AND classes.name = $2;
    `, [name, classStudent]);

    if (search.rowCount) {
        return search.rows[0];
    }

    return null;
}

async function findStudentByToken(token: string): Promise<StudentDB> {
    const search = await connection.query(`
        SELECT * FROM students
        WHERE token = $1;
    `, [token]);

    if (search.rowCount) {
        return search.rows[0];
    }
    return null;
}

async function findClassByName(name: string): Promise<any> {
    const search = await connection.query(`
        SELECT id FROM classes
        WHERE name = $1;
    `, [name]);

    if (search.rowCount) {
        return search.rows[0];
    }
    return null;
}

export {
    create,
    findStudent,
    findStudentByToken,
    findClassByName,
};
