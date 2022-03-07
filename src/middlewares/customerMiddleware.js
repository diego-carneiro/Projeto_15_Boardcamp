import customerSchema from "../schemas/customerSchema.js";

export default function customerMiddleware(request, response, next){    
    
    const validation = customerSchema.validate(request.body, { abortEarly: true });

    if (validation.error) {
        return response.sendStatus(422);
    }

    next();
}