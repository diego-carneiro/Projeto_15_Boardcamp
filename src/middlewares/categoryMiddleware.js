import categorySchema from "../schemas/categorySchema.js";

export default function categoryMiddleware(request, response, next){
    
    const validation = categorySchema.validate(request.body, { abortEarly: true });

    if (validation.error) {
        return response.sendStatus(422);
    }

    next();
}