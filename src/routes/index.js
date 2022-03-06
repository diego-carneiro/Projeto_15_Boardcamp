import { Router } from "express";
import categoryRouter from "../routes/categoryRouter.js"
import gamesRouter from "../routes/gamesRouter.js"
import customerRouter from "../routes/customerRouter.js";

const router = Router();

router.use(categoryRouter);
router.use(gamesRouter);
router.use(customerRouter);

export default router;