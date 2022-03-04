import { Router } from "express";
import { getGames, postGames } from "../controllers/gameController.js";
import gamesMiddleware from "../middlewares/gamesMiddleware.js";

const gamesRouter = Router();

gamesRouter.post('/games',
    gamesMiddleware, 
    postGames
);
gamesRouter.get('/games',
    getGames,
);

export default gamesRouter;