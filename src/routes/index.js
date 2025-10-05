// Importação dos módulos necessários para a construção do roteador.
import { Router } from "express";
import { PetController } from "../controllers/PetController.js";
import { AdotController } from "../controllers/AdotController.js";
import { AdocaoController } from "../controllers/adocaoController.js";
import { UserController } from "../controllers/UserController.js";
import { LoginController } from "../controllers/LoginController.js";

// Middlewares para tratamento de requisições na pipeline do Express.
import authenticate from "../middleware/authenticate.js";
import authorization from "../middleware/authorization.js";

/* Instancia o roteador do Express. Este objeto irá agregar todas
   as definições de rotas deste módulo.*/
const router = Router();

/* Instanciação dos controllers. As instâncias serão usadas para
   vincular seus métodos aos handlers das rotas. */
const petController = new PetController();
const adotController = new AdotController();
const adocaoController = new AdocaoController();
const userController = new UserController();
const loginController = new LoginController();

// --- Rotas para o recurso 'Pet' ---
router.get("/pet", authenticate, petController.findAllPets) // Requer autenticação
router.post ("/pet", authenticate, petController.savePets) // Requer autenticação
router.put ("/pet/:id_pet", authorization, petController.updatePets) // Requer autorização de admin
router.delete ("/pet/:id_pet", authorization, petController.deletePets) // Requer autorização de admin

// --- Rotas para o recurso 'Adotante' ---
router.get ("/adotante", authenticate, adotController.findAllAdots) // Requer autenticação
router.post ("/adotante", authenticate, adotController.saveAdots) // Requer autenticação
router.put ("/adotante/:id_adotante", authorization, adotController.updateAdots) // Requer autorização de admin
router.delete ("/adotante/:id_adotante", authorization, adotController.deleteAdots) // Requer autorização de admin

// --- Rotas para o recurso 'Adoção' ---
router.get("/adocao", authenticate, adocaoController.findAdocoes) // Requer autenticação
router.post("/adocao", authenticate, adocaoController.saveAdocoes) // Requer autenticação
router.put("/adocao/:id_adocoes", authorization, adocaoController.updateAdocoes) // Requer autorização de admin
router.delete("/adocao/:id_adocoes", authorization, adocaoController.deleteAdocoes) // Requer autorização de admin

// --- Rotas para o recurso 'User' ---
router.get("/user", authorization, userController.findAllUsers) // Requer autorização de admin
router.post("/user", userController.saveUsers) // Acesso público
router.put("/user/:id_user", authorization, userController.updateUsers) // Requer autorização de admin
router.delete("/user/:id_user", authorization, userController.deleteUsers) // Requer autorização de admin

// --- Rota de Autenticação ---
router.post("/login", loginController.login)

// Exporta a instância configurada do roteador
export default router