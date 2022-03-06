import newCustomerSchema from "../schemas/newCustomerSchema.js";

export default function newCustomerSchema(request, response, next){    
    
    const validation = newCustomerSchema.validate(request.body, { abortEarly: true });

    if (validation.error) {
        return response.sendStatus(422);
    }

    next();
}