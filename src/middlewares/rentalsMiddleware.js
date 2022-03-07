import rentalSchema from "../schemas/rentalSchema.js";

export default function validateRentalsSchemaMiddleware(request, response, next) {
    const validate = rentalSchema.validate(request.body, { abortEarly: true });
    
    if (validate.error) {
        return response.sendStatus(422);
    }

    next();
}