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
      SELECT * FROM questions WHERE id = $1
    `, [id]);

    return result.rows[0];
}

async function updateAnswer(id: number) {
    const result = await connection.query(`
      UPDATE questions SET answered = TRUE WHERE id = $1
    `, [id]);

    return result.rows[0];
}

async function findAnsweredQuestion(id: number) {
    const result = await connection.query(`
        SELECT 
            questions.question, questions.tags, questions.answered, questions."submitAt",
            answered_questions."answeredAt",
            answers.answer,
            students.name AS "answeredBy"
        FROM questions
        JOIN answered_questions
            ON answered_questions.question_id = questions.id
        JOIN answers
            ON answered_questions.answer_id = answers.id
        JOIN students
            ON students.id = answers.student_id
        WHERE questions.id = $1;
    `, [id]);

    return result.rows[0];
}

async function findUnansweredQuestions() {
    const result = await connection.query(`
        SELECT
            questions.id, questions.question, questions."submitAt",
            students.name AS student,
            classes.name AS class
        FROM questions
        JOIN students
            ON questions.student_id = students.id
        JOIN classes
            ON students.class_id = classes.id
        WHERE answered = FALSE;
    `);

    return result.rows;
}

export {
    create,
    findQuestion,
    updateAnswer,
    findAnsweredQuestion,
    findUnansweredQuestions,
};
