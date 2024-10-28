import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { CreateJuegoDto } from "../dto/juego.dto";
import { UserService } from "../services";
import { bindClassMethods } from "../util/bindeo-de-clases";

export class CartController {
  constructor(private readonly userService: UserService) {
    bindClassMethods(this);
  }

  public async buy(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id_token = req.cookies.id_token;
      const refresh_token = req.cookies.refresh_token;
      if (!id_token || !refresh_token) {
        res.status(401).send("user_not_authenticated");
      } else {
        this.userService.isUserLoggedIn(id_token, refresh_token)
          .then(() => {
            const juegos = plainToInstance(CreateJuegoDto, req.body);
            validate(juegos).then((errors) => {
              if (errors.length) {
                const errorMsg = errors
                  .map((err) => Object.values(err.constraints!))
                  .join(" - ");
                res.status(400).json(errorMsg);
              } else {
                console.log(juegos);
                res.status(200).send(juegos);
              }
            });
          })
          .catch(err => {
            res.status(401).send("user_not_authenticated");
            next(err);
          });
      }
    } catch (err: any) {
      res.status(400).send(err.message);
      next(err);
    }
  }
}
