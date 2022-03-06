import connection from "../database.js";

export async function getGames(request, response) {
    const name = request.query.name;

    try {
        const queryGames = await connection.query(`
            SELECT games.*, categories.name as "categoryId" 
            FROM games
            JOIN categories ON games."categoryId"=categories.id
            WHERE LOWER(games.name) LIKE LOWER($1)
        `, [`${name}%`]);

        response.send(queryGames.rows);

    } catch (error) {
        console.error(error);
        response.sendStatus(500);
    }
};

export async function postGames(request, response) {
    const game = request.body;

    try {
        const queryCategories = await connection.query(`
            SELECT * 
            FROM categories
        `);
        const searchedCategory = queryCategories.rows.find(consulted => consulted.id === game.categoryId);

        const queryGames = await connection.query(`
            SELECT *
            FROM games
        `);

        const searchedGame = queryGames.rows.find(consulted => consulted.name === game.name);

        if (searchedCategory !== undefined) {
            if (searchedGame === undefined) {
                await connection.query(`
                    INSERT INTO
                    games (name, image, "stockTotal", "categoryId", "pricePerDay")
                    VALUES ($1, $2, $3, $4, $5)`,
                    [game.name, game.image, parseInt(game.stockTotal), game.categoryId, parseInt(game.pricePerDay)]
                );

                response.sendStatus(201);

            } else {
                return response.sendStatus(409);
            }
        } else {
            return response.sendStatus(400);
        }

    } catch (error) {
        console.error(error);
        response.sendStatus(500);
    }
};