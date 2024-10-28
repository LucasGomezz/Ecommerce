import { Router } from "express";
import { GeneroController } from "../controllers";

export const getRouter = (controller: GeneroController): Router => {
  const router = Router();
  router.get("/generos", controller.getGeneros);
  return router;
};
