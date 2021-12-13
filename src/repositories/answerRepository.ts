import { connection } from '../database/database';
import { AnswerToCreate } from '../protocols/Answer';

async function create(answerInfo: AnswerToCreate) {
    const {
        answer,
        userId,
    } = answerInfo;

    const insert = await connection.query(`
        INSERT INTO answers (answer, student_id) VALUES ($1, $2);
    `, [answer, userId]);
    if (insert.rowCount) {
        return insert.rows[0];
    }
    return null;
}

export {
    create,
};
