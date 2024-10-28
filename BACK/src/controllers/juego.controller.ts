import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { CreateJuegoDto } from "../dto/juego.dto";
import { JuegoService } from "../services/juego.service";
import { bindClassMethods } from "../util/bindeo-de-clases";

export class JuegoController {
  constructor(private readonly juegoService: JuegoService) {
    bindClassMethods(this);
  }

  public async createJuego(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const juegoData = plainToInstance(CreateJuegoDto, req.body);
      this.juegoService.crearJuego(juegoData);
      res.status(201).send("funcionó!");
    } catch (e) {
      next(e);
    }
  }

  public async getJuegos(req: Request, res: Response): Promise<void> {
    try {
      const juegos = await this.juegoService.obtenerJuegos();
      res.send(juegos);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async getJuegosPorGenero(req: Request, res: Response): Promise<void> {
    const genero = req.params.genero;

    try {
      const juegos = await this.juegoService.buscarJuegosPorGenero(genero);

      res.status(200).json(juegos);
    } catch (error) {
      res.status(500).json({ message: "Error al buscar juegos por género" });
    }
  }
}
