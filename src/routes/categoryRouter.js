import { Router } from "express";
import { getCategory, postCategory } from "../controllers/categoryController.js";
import categoryMiddleware from "../middlewares/categoryMiddleware.js";

const categoryRouter = Router();

categoryRouter.post('/categories',
    categoryMiddleware, 
    postCategory
);
categoryRouter.get('/categories',
    getCategory
);

export default categoryRouter;