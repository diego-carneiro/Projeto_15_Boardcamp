import connection from "../database.js";
import dayjs from "dayjs";

export async function getRentals(request, response) {
    const customerId = request.query.customerId;
    const gameId = request.query.gameId;

    try {
        const queryRentals = await connection.query(`
            SELECT *
            FROM rentals
        `);

        const customerInfo = await connection.query(`
            SELECT customers.id 
            AS id, customers.name 
            AS name
            FROM customers
            JOIN rentals
            ON rentals."customerId" = customers.id
        `);

        const gameInfo = await connection.query(`
            SELECT games.id, games.name, games."categoryId", categories.name AS "categoryName"
            FROM games
            JOIN categories
            ON categories.id = games."categoryId"
        `);

        queryRentals.rows = queryRentals.rows.map(item => ({
            id: item.id,
            customerId: item.customerId,
            gameId: item.gameId,
            rentDate: new Date(item.rentDate).toLocaleDateString('en-CA'),
            daysRented: item.daysRented,
            returnDate: item.returnDate ? new Date(item.returnDate).toLocaleDateString('en-CA') : null,
            originalPrice: item.originalPrice,
            delayFee: item.delayFee,
            customer: customerInfo.rows.find(value => item.customerId === value.id),
            game: gameInfo.rows.find(value => item.gameId === value.id)
        }));

        if (customerId !== undefined && gameId !== undefined) {
            queryRentals.rows = queryRentals.rows.filter(value => value.customer.id === parseInt(customerId) && value.game.id === parseInt(gameId));
            return response.send(queryRentals.rows);
        }

        if (customerId !== undefined && gameId === undefined) {
            queryRentals.rows = queryRentals.rows.filter(value => value.customer.id === parseInt(customerId));
            return response.send(queryRentals.rows);
        }

        if (gameId !== undefined && customerId === undefined) {
            queryRentals.rows = queryRentals.rows.filter(value => value.game.id === parseInt(gameId));
            return resp.send(queryRentals.rows);
        }
        response.send(queryRentals.rows);
    }

    catch (error) {
        console.error(error);
        response.sendStatus(500);
    };

}

export async function postRentals(request, response) {
    const { customerId, gameId, daysRented } = request.body;

    try {
        const getGame = await connection.query(`
            SELECT * 
            FROM games 
            WHERE id=$1
        `, [gameId]);

        if (getGame.rows.length === 0) {
            return response.sendStatus(400);
        }

        const openRentals = await connection.query(`
            SELECT * 
            FROM rentals 
            WHERE "gameId" = $1 AND "returnDate" IS null
        `, [gameId]);

        if (openRentals.rows.length >= getGame.rows[0].stockTotal) {
            return response.sendStatus(400);
        }

        const originalPrice = getGame.rows[0].pricePerDay * daysRented;

        await connection.query(
            `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "originalPrice", "returnDate", "delayFee") 
            VALUES ($1, $2, now() , $3, $4, null, null)`,
            [customerId, gameId, daysRented, originalPrice]);

        response.sendStatus(201);
    }

    catch (error) {
        console.error(error);
        response.sendStatus(500);
    }
};

export async function finishRentals(request, response) {
    const { id } = request.params;

    try {
        const rental = await connection.query(`
            SELECT rentals."rentDate", games."pricePerDay", rentals."daysRented" 
            FROM rentals 
            JOIN games 
            ON games.id = rentals."gameId" 
            WHERE rentals.id=$1
        `, [id]);
        console.log(rental);

        const { rentDate, pricePerDay, daysRented } = rental.rows[0];

        const currentDate = dayjs();

        const totalDaysRented = currentDate.diff(rentDate, "day");

        let delayFee = null;

        if (totalDaysRented > daysRented) {
            delayFee = (totalDaysRented - daysRented) * pricePerDay;
        }

        const giveBack = await connection.query(`
            UPDATE rentals 
            SET "returnDate" = now(), "delayFee" = $1
            WHERE id=$2
        `, [delayFee, id]);

        response.sendStatus(200)

    } catch (error) {
        console.error(error)
        response.sendStatus(500);
    }


};

export async function deleteRentals(request, response) {

    try {
        const queryRental = await connection.query(`
            SELECT *
            FROM rentals 
            WHERE id = $1
            AND "returnDate"
            IS not null
        `, [request.params.id]);

        if (queryRental.rows.length > 0) {
            return response.sendStatus(400);
        }

        await connection.query(`
            DELETE FROM rentals 
            WHERE id = $1
        `, [request.params.id]);

        response.sendStatus(200);

    } catch (error) {
        console.error(error);
        response.sendStatus(500);
    }
}