import {prismaClient} from "../database/PrismaClient.js";
import bcrypt from "bcryptjs";
import  jwt  from "jsonwebtoken";

export class LoginController{

    async login (request, response){
        const {email_user, senha} = request.body
        const user = await prismaClient.user.findUnique({where: {email_user}});

        if (!user){
            return response.status(404).json("Usuário não encontrado");
        }

        const senhaValida = bcrypt.compareSync(senha, user.senha);

        if(!senhaValida){
            return response.status(404).json("Usuário não encontrado");
        }

        const payload = {id: user.id_user, nome: user.nome_user, admin: user.is_admin}
        const token = jwt.sign(payload, process.env.SECRET_JWT, {expiresIn: '2h'})

        return response.status(200).json({...payload, token})

    }
}
