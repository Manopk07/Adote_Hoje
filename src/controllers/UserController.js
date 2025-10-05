import {prismaClient} from "../database/PrismaClient.js";
import bcrypt from "bcryptjs";

export class UserController {

    async findAllUsers (request, response) {
        try{
            const user = await prismaClient.user.findMany();
            return response.json(user);  
        }
        catch (error){
            return response.status(500).json({error: "Erro ao buscar o usuário"});
        }
    }

    async saveUsers (request, response) {
        const {nome_user, email_user, senha, is_admin} = request.body;
        const senhaHash = bcrypt.hashSync(senha, 10)
        try {
            const user = await prismaClient.user.create({
                data: {nome_user, email_user, senha: senhaHash, is_admin},
                select: {id_user: true, nome_user: true, email_user: true, is_admin: true}
            })

            return response.status(201).json(user);

        }
        catch (error) {
            return response.status(500).json({error: "Erro ao cadastrar usuário"});
        }
    }

    async updateUsers (request, response) {
        const {id_user} = request.params;
        const {nome_user, email_user, senha, is_admin} = request.body;
        const senhaHash = bcrypt.hashSync(senha, 10)
        try {
            const userExist = await prismaClient.user.findUnique({
                where: {id_user}
            })

            if (!userExist){
                return response.status(404).json("Usuário não encontrado"); 
            }

            const user = await prismaClient.user.update({
                data: {nome_user, email_user, senha: senhaHash, is_admin},
                where: {id_user},
                select: {id_user: true, nome_user: true, email_user: true, is_admin: true}
            })

            return response.status(200).json(user);
        }
        catch (error){
            return response.status(500).json({error: "Erro ao atualizar o usuário"});
        }  
    }

    async deleteUsers (request, response) {
        const {id_user} = request.params;
        try{
            const userExist = await prismaClient.user.findUnique({
                where: {id_user}
            })

            if (!userExist){
                return response.status(404).json("Usuário não encontrado"); 
            }

            await prismaClient.user.delete({
                where: {id_user}
            })

            return response.status(204).send();
        }
        catch (error){
            return response.status(500).json({error: "Erro ao deletar usuário"});
        } 
    }
    
}