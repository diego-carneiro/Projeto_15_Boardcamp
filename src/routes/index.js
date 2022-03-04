import { Router } from "express";
import categoryRouter from "../routes/categoryRouter.js"
import gamesRouter from "../routes/gamesRouter.js"

const router = Router();

router.use(categoryRouter);
router.use(gamesRouter);

export default router;