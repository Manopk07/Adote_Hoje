import jwt from "jsonwebtoken"

export default function(request, response, next){
    const {authorization} = request.headers;

    try {
        if(!authorization){
            return response.status(401).json("Não autorizado");
        }

        const {admin} = jwt.verify(authorization, process.env.SECRET_JWT);

        if(!admin){
            return response.status(403).json("Ação proibida")
        }

        next();

    }
    catch(error){
        return response.status(500).json(error)
    }
}