import { connection } from '../database/database';
import { QuestionCreate } from '../protocols/Question';

async function create(questionInfo: QuestionCreate) {
    const {
        question,
        studentId,
        tags,
    } = questionInfo;

    const insert = await connection.query(`
        INSERT INTO questions
            (question, student_id, tags)
        VALUES
            ($1, $2, $3);
    `, [question, studentId, tags]);
    if (insert.rowCount) {
        return insert.rows[0];
    }
    return null;
}

export {
    create,
};
