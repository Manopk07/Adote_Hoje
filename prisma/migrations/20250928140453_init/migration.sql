-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('DISPONIVEL', 'ADOTADO', 'INDISPONIVEL');

-- CreateEnum
CREATE TYPE "public"."Sexo" AS ENUM ('MACHO', 'FEMEA');

-- CreateEnum
CREATE TYPE "public"."Especie" AS ENUM ('CACHORRO', 'GATO', 'OUTRO');

-- CreateEnum
CREATE TYPE "public"."Tamanho" AS ENUM ('PEQUENO', 'MEDIO', 'GRANDE');

-- CreateEnum
CREATE TYPE "public"."Personalidade" AS ENUM ('BRINCALHAO', 'CALMO', 'AGRESSIVO');

-- CreateTable
CREATE TABLE "public"."pets" (
    "id_pet" TEXT NOT NULL,
    "nome_pet" VARCHAR(100) NOT NULL,
    "idade" INTEGER,
    "descricao" VARCHAR(255),
    "status" "public"."Status" NOT NULL,
    "especie" "public"."Especie" NOT NULL,
    "tamanho" "public"."Tamanho" NOT NULL,
    "personalidade" VARCHAR(20),
    "sexo" "public"."Sexo" NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id_pet")
);

-- CreateTable
CREATE TABLE "public"."adotantes" (
    "id_adotante" TEXT NOT NULL,
    "nome_adotante" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "telefone" VARCHAR(15),
    "endereco" VARCHAR(255),

    CONSTRAINT "adotantes_pkey" PRIMARY KEY ("id_adotante")
);

-- CreateTable
CREATE TABLE "public"."adocoes" (
    "id_adocoes" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "id_adotante" TEXT NOT NULL,
    "id_pet" TEXT NOT NULL,

    CONSTRAINT "adocoes_pkey" PRIMARY KEY ("id_adocoes")
);

-- CreateIndex
CREATE UNIQUE INDEX "adocoes_id_pet_key" ON "public"."adocoes"("id_pet");

-- AddForeignKey
ALTER TABLE "public"."adocoes" ADD CONSTRAINT "adocoes_id_pet_fkey" FOREIGN KEY ("id_pet") REFERENCES "public"."pets"("id_pet") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."adocoes" ADD CONSTRAINT "adocoes_id_adotante_fkey" FOREIGN KEY ("id_adotante") REFERENCES "public"."adotantes"("id_adotante") ON DELETE RESTRICT ON UPDATE CASCADE;
