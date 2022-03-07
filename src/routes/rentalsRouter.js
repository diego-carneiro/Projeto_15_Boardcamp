import { Router } from "express";
import { getRentals, postRentals, finishRentals, deleteRentals } from "../controllers/rentalsController.js";
import rentalsMiddleware from "../middlewares/rentalsMiddleware.js";

const rentalsRouter = Router();

rentalsRouter.post('/rentals',
    rentalsMiddleware, 
    postRentals
);
rentalsRouter.get('/rentals',
    getRentals,
);
rentalsRouter.post('/rentals/:id/return',
    finishRentals,
);
rentalsRouter.delete('/rentals/:id',
    deleteRentals,
);

export default rentalsRouter;