import {prismaClient} from "../database/PrismaClient.js";

export class PetController {

    async findAllPets (request, response) {
        try {
            const pet = await prismaClient.pet.findMany();
            return response.json(pet);
        } 
        catch (error) {
            return response.status(500).json({error: "Erro ao buscar pets"});
        }
    }

    async savePets(request, response) {
        try{    
            const {nome_pet, idade, sexo, descricao, status, especie, tamanho, personalidade} = request.body;
            const pet = await prismaClient.pet.create({
                data: {nome_pet, idade, sexo, descricao, status, especie, tamanho, personalidade}
            })
            return response.status(201).json(pet);
        }
        catch (error){
            return response.status(500).json({error: "Erro ao cadastrar o pet"})
        }
    }

    async updatePets(request, response) {
        const {id_pet} = request.params;
        const {nome_pet, idade, sexo, descricao, status, especie, tamanho, personalidade} = request.body;
        try{
            const petExist = await prismaClient.pet.findUnique({
                where: {id_pet}
            })

            if (!petExist){
                return response.status(404).json("Pet não encontrado"); 
            }

            const pet = await prismaClient.pet.update({
                data: {nome_pet, idade, sexo, descricao, status, especie, tamanho, personalidade},
                where: {id_pet}
            })

        return response.status(200).json(pet);

        }
        catch (error){
            return response.status(500).json({error: "Erro ao atualizar pet"});
        }
    }

    async deletePets(request, response) {
        const {id_pet} = request.params;
        try{
            const petExist = await prismaClient.pet.findUnique({
                where: {id_pet}
            })

            if (!petExist){
                return response.status(404).json("Pet não encontrado"); 
            }

            await prismaClient.pet.delete({
                where: {id_pet}
            })

            return response.status(204).send();

        }
        catch (error){
            return response.status(500).json({error: "Erro ao deletar pet"});
        }
    }
}