import { Router } from "express";
import { getAuthenticatedUser, loginController, registerController } from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const routes = Router();

routes.post( '/register', registerController );

routes.post( '/login', loginController );

routes.get( '/user', authMiddleware, getAuthenticatedUser );


export default routes;