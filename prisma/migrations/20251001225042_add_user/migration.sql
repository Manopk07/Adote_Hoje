-- CreateTable
CREATE TABLE "public"."User" (
    "id_user" TEXT NOT NULL,
    "nome_user" TEXT NOT NULL,
    "email_user" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_user_key" ON "public"."User"("email_user");
