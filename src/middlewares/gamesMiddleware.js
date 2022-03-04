import gameSchema from "../schemas/gameSchema.js";

export default function gamesMiddleware(request, response, next){    
    
    const validation = gameSchema.validate(request.body, { abortEarly: true });

    if (validation.error) {
        return response.sendStatus(422);
    }

    next();
}