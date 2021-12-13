import { connection } from '../database/database';
import { AnswerToCreate } from '../protocols/Answer';

async function insertAnsweredQuestion(answerId: any, questionId: number) {
    console.log(answerId, questionId)
    const insert = await connection.query(`
        INSERT INTO answered_questions 
            (question_id, answer_id, "answeredAt") 
        VALUES 
            ($1, $2, now());
    `, [questionId, answerId]);

    if (insert.rowCount) {
        return insert.rows[0];
    }
    return null;
}

async function create(answerInfo: AnswerToCreate) {
    const {
        answer,
        userId,
        questionId,
    } = answerInfo;

    const insert = await connection.query(`
        INSERT INTO answers (answer, student_id) VALUES ($1, $2)
        RETURNING *;
    `, [answer, userId]);

    if (!insert.rowCount) {
        return null;
    }
    console.log(insert.rows[0])

    const answeredQuestion = await insertAnsweredQuestion(insert.rows[0].id, questionId);

    if (answeredQuestion) {
        return insert.rows[0];
    }
    return null;
}

export {
    create,
};
