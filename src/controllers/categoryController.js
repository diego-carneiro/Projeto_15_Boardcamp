import connection from "../database.js";

export async function getCategory(_request, response) {
    try {
        const categories = await connection.query(`
        SELECT *
        FROM categories
        `);

        response.send(categories.rows);

    } catch (error) {
        console.log(error);
        response.sendStatus(500);

    }
};

export async function postCategory(request, response) {
    const { name } = request.body;

    if (name === "") {
        return response.sendStatus(400);
    }

    try {
        await connection.query(`
        INSERT INTO
        categories (name)
        VALUES ($1)`, [name]);

        response.sendStatus(201);

    } catch (error) {
        console.error(error);
        response.sendStatus(500);

    }
};