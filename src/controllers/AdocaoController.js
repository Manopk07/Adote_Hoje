import {prismaClient} from "../database/PrismaClient.js";

export class AdocaoController{

    async findAdocoes (request, response) {
        try {
            const adocoes = await prismaClient.adocao.findMany();

            return response.json(adocoes);

        } 
        catch (error) {
            console.error(error);
            return response.status(500).json("Erro ao listar adoções");
        }
    }

    async saveAdocoes (request, response) {
        const {id_pet, id_adotante, data_adocao} = request.body;
        try {
            const [adocao, atualizacao] = await prismaClient.$transaction([
                prismaClient.adocao.create({
                    data: {id_pet, id_adotante, data_adocao}
                }),
                prismaClient.pet.update({
                    where: {id_pet},
                    data: {status: "ADOTADO"}
                })
            ]);
            return response.status(201).json({adocao, atualizacao});
        } 
        catch (error) {
            console.error(error);
            return response.status(500).json("Erro ao registrar adoção");
        }
    }

    async updateAdocoes (request, response) {
        const {id_adocoes} = request.params;
        const {id_pet, id_adotante, data_adocao} = request.body;

        const adocaoExist = await prismaClient.adocao.findUnique({
            where: {id_adocoes}
        });

        if (!adocaoExist) {
            return response.status(404).json("Adoção não encontrada");
        }

        try {
            // Transação porque temos múltiplas operações dependentes
            const result = await prismaClient.$transaction(async (tx) => {
                await tx.pet.update({
                    where: {id_pet: adocaoExist.id_pet},
                    data: {status: "DISPONIVEL"}
                });

                const adocao = await tx.adocao.update({
                    data: {id_pet, id_adotante, data_adocao},
                    where: {id_adocoes}
                });

                await tx.pet.update({
                    where: {id_pet},
                    data: {status: "ADOTADO"}
                });

                return adocao;

            });

            return response.status(200).json(result);
        } 
        catch (error) {
            console.error(error);
            return response.status(500).json("Erro ao atualizar adoção");
        }
    }

    async deleteAdocoes (request, response) {
        const {id_adocoes} = request.params;

        const adocaoExist = await prismaClient.adocao.findUnique({
            where: {id_adocoes}
        });

        if (!adocaoExist) {
            return response.status(404).json("Adoção não encontrada");
        }

        try {
            await prismaClient.$transaction([
                prismaClient.adocao.delete({
                    where: {id_adocoes}
                }),
                prismaClient.pet.update({
                    where: {id_pet: adocaoExist.id_pet},
                    data: {status: "DISPONIVEL"}
                })
            ]);

            return response.status(204).send();

        } 
        catch (error) {
            console.error(error);
            return response.status(500).json("Erro ao excluir adoção");
        }
    }

}