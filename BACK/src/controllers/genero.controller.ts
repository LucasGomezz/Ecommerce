import { Request, Response } from "express";
import { GeneroService } from "../services/genero.service";
import { bindClassMethods } from "../util/bindeo-de-clases";

export class GeneroController {
  constructor(private readonly generoService: GeneroService) {
    bindClassMethods(this);
  }

  public async getGeneros(req: Request, res: Response): Promise<void> {
    try {
      const generos = await this.generoService.obtenerGeneros();
      res.send(generos);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
