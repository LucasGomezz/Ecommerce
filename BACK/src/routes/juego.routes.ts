import { Router } from "express";
import { JuegoController } from "../controllers";

export const getRouter = (controller: JuegoController): Router => {
  const router = Router();
  router.get("/juegos", controller.getJuegos);
  router.post("/juego", controller.createJuego);
  return router;
};
