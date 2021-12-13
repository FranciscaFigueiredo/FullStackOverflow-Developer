import { connection } from '../database/database';

async function create(answer: string) {
    const insert = await connection.query(`
        INSERT INTO answers (answer) VALUES ($1);
    `, [answer]);
    if (insert.rowCount) {
        return insert.rows[0];
    }
    return null;
}

export {
    create,
};
