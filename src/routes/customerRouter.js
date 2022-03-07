import { Router } from "express";
import { getCustomer, getAllCustomers, postCustomer, updateCustomer } from "../controllers/customerController.js";
import customerMiddleware from "../middlewares/customerMiddleware.js";

const customerRouter = Router();

customerRouter.post('/customers',
    customerMiddleware, 
    postCustomer
);
customerRouter.get('/customers',
    getAllCustomers
);
customerRouter.get('/customers/:id',
    getCustomer
);
customerRouter.put('/customers/:id',
    updateCustomer
);

export default customerRouter;