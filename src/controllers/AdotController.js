import {prismaClient} from "../database/PrismaClient.js";

export class AdotController {

    async findAllAdots (request, response) {
        try{
            const adotante = await prismaClient.adotante.findMany();
            return response.json(adotante);  
        }
        catch (error){
            return response.status(500).json({error: "Erro ao buscar o adotante"});
        }
    }

    async saveAdots (request, response) {
        const {nome_adotante, email, telefone, endereco} = request.body;
        try{
            const adotante = await prismaClient.adotante.create({
                data: {nome_adotante, email, telefone, endereco}
            })

            return response.status(201).json(adotante);

        }
        catch (error){
            return response.status(500).json({error: "Erro ao cadastrar adotante"});
        }
    }

    async updateAdots (request, response) {
        const {id_adotante} = request.params;
        const {nome_adotante, email, telefone, endereco} = request.body;
        try{
            const adotanteExist = await prismaClient.adotante.findUnique({
                where: {id_adotante}
            })

            if (!adotanteExist){
                return response.status(404).json("Adotante não encontrado"); 
            }

            const adotante = await prismaClient.adotante.update({
                data: {nome_adotante, email, telefone, endereco},
                where: {id_adotante}
            })

            return response.status(200).json(adotante);
        }
        catch (error){
            return response.status(500).json({error: "Erro ao atualizar o adotante"});
        }  
    }

    async deleteAdots (request, response) {
        const {id_adotante} = request.params;
        try{
            const adotanteExist = await prismaClient.adotante.findUnique({
                where: {id_adotante}
            })

            if (!adotanteExist){
                return response.status(404).json("Adotante não encontrado"); 
            }

            await prismaClient.adotante.delete({
                where: {id_adotante}
            })

            return response.status(204).send();
        }
        catch (error){
            return response.status(500).json({error: "Erro ao deletar adotante"});
        } 
    }
    
}