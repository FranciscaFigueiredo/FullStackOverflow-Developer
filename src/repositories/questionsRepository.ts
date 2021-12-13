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

async function findQuestion(id: number) {
    const result = await connection.query(`
      SELECT * FROM questions WHERE questions.id = $1
    `, [id]);

    return result.rows[0];
}

async function findAnsweredQuestion(id: number) {
    const result = await connection.query(`
        SELECT * FROM questions
        JOIN answers
            ON questions.id = answers.question_id
        WHERE questions.id = $1;
    `, [id]);

    return result.rows[0];
}

async function findUnansweredQuestions() {
    const result = await connection.query(`
        SELECT * FROM questions
        WHERE answered = FALSE;
    `);

    return result.rows;
}

export {
    create,
    findQuestion,
    findAnsweredQuestion,
    findUnansweredQuestions,
};
