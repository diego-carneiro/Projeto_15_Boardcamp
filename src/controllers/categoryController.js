import connection from "../database.js";

export async function getCategory(_request, response) {
    try {
        const categories = await connection.query(`
        SELECT *
        FROM categories
        `);

        response.send(categories.rows);

    } catch (error) {
        console.error(error);
        response.sendStatus(500);

    }
};

export async function postCategory(request, response) {
    const { name } = request.body;

    try {
        const queryCategories = await connection.query(`
            SELECT * 
            FROM categories
        `);
        const seachedCategory = queryCategories.rows.find(consulted => consulted.name === name);

        if (!seachedCategory) {
            await connection.query(`
                INSERT INTO
                categories (name)
                VALUES ($1)`, [name]
            );

            response.sendStatus(201);

        } else {
            return response.sendStatus(409);
        };

    } catch (error) {
        console.error(error);
        response.sendStatus(500);

    }
};