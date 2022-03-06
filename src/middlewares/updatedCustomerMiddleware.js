import updatedCustomerSchema from "../schemas/updatedCustomerSchema.js";

export default function updatedCustomerSchema(request, response, next){    
    
    const validation = updatedCustomerSchema.validate(request.body, { abortEarly: true });

    if (validation.error) {
        return response.sendStatus(422);
    }

    next();
}