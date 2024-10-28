import { GeneroController, JuegoController } from "../controllers";
import { CartController } from "../controllers/cart.controller";
import { UserController } from "../controllers/user.controller";
import { JuegoModel, UserModel } from "../models-objection";
import { GeneroModel } from "../models-objection/genero.model";
import { GeneroRepository } from "../repositories/genero.repository";
import { JuegoRepository } from "../repositories/juego.repository";
import { UserRepository } from "../repositories/user.repository";
import { JuegoService } from "../services";
import { GeneroService } from "../services/genero.service";
import { UserService } from "../services/user.service";
import { getRouter as getCartRouter } from "./cart.routes";
import { getRouter as getGeneroRouter } from "./genero.routes";
import { getRouter as getJuegoRouter } from "./juego.routes";
import { getRouter as getUserRouter } from "./user.routes";

const userRepository = new UserRepository(UserModel);
const userService = new UserService(userRepository);
const userRouter = getUserRouter(new UserController(userService));

const generoRepository = new GeneroRepository(GeneroModel);
const generoService = new GeneroService(generoRepository);
const generoRouter = getGeneroRouter(new GeneroController(generoService));

const juegoRepository = new JuegoRepository(JuegoModel);
const juegoService = new JuegoService(juegoRepository);
const juegoRouter = getJuegoRouter(new JuegoController(juegoService));
const cartRouter = getCartRouter(new CartController(userService));
const routers = [userRouter, juegoRouter, cartRouter, generoRouter];

export { routers };

