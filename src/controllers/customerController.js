import connection from "../database.js";

export async function getAllCustomers(request, response) {
    const cpf = request.query.cpf;

    try {
        if (!cpf) {
            const queryAllCustomers = await connection.query(`
                SELECT * 
                FROM customers
            `);
            res.send(queryAllCustomers.rows);
        } else {
            const queryCustomers = await connection.query(`
                SELECT *
                FROM customers
                WHERE cpf 
                LIKE $1
            `, [`${cpf}%`]);

            response.send(queryCustomers.rows);
        }
    } catch (error) {
        console.error(error);
        response.sendStatus(500);
    }
};

export async function getCustomer(request, response) {
    const id = parseInt(request.params.id);

    try {
        const queryCustomer = await connection.query(`
            SELECT *
            FROM customers
        `);
        const searchedCustomer = queryCustomer.rows.find(consulted => consulted.id === id);

        if(searchedCustomer){
            const queryCustomer = await connection.query(`
                SELECT * 
                FROM customers
                WHERE id=$1
            `, [id]);
            
            response.send(queryCustomer.rows[0]);
        } else {
            return response.sendStatus(404);
        }

    } catch (error) {
        console.error(error);
        response.sendStatus(500);
    }
}

export async function postCustomer(request, response) {
    const newCustomer = request.body;

    try {
        const queryCustomers = await connection.query(`
            SELECT * 
            FROM customers
        `);

        const searchedCustomers = queryCustomers.rows.find(consulted => consulted.cpf === CustomElementRegistry.cpf);

        const searchedGame = queryGames.rows.find(consulted => consulted.name === game.name);

        if (searchedGame === undefined) {
            await connection.query(`
                INSERT INTO
                customers (name, phone, cpf, birthday)
                VALUES ($1, $2, $3, $4)`,
                [customer.name, customer.phone, customer.cpf, customer.birthday]
            );

            response.sendStatus(201);

        } else {
            return response.sendStatus(409);
        }

    } catch (error) {
        console.error(error);
        response.sendStatus(500);
    }
};

export async function updateCustomer(request, response) {
    const id = parseInt(request.params.id);
    const newInfos = request.body;

    try {
        await connection.queryCustomer(`
            UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4
            WHERE customers.id=$5`,
            [newInfos.name, newInfos.phone, newInfos.cpf, newInfos




                .birthday, id]
        );

        response.sendStatus(200);

    } catch (error) {
        console.error(error);
        response.sendStatus(500);
    }
}