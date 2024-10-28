import { Router } from "express";
import { CartController } from "../controllers/cart.controller";

export const getRouter = (controller: CartController): Router => { //cuando quiero agregar una ruta router.get y la ruta con su controller
    const router = Router();
    router.post('/comprar-carrito', controller.buy);
    return router;
};
