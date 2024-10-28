import { Router } from "express";
import { UserController } from "../controllers";

export const getRouter = (controller: UserController): Router => { //cuando quiero agregar una ruta router.get y la ruta con su controller
  const router = Router();
  router.post("/registro", controller.createUser);
  router.post("/login", controller.login);
  router.post("/confirmar-email", controller.confirmEmail);
  router.get("/usuario-logeado", controller.isUserLoggedIn);
  router.get("/logout", controller.logout);
  router.get("/recover-password", controller.recoverPassword);
  router.post("/confirm-recover-password", controller.confirmRecoverPassword);
  router.post("/change-password", controller.changePassword);

  return router;
};
