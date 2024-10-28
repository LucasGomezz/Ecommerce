import { CreateJuegoDas, type CreateJuegoDto } from "../dto/juego.dto";
import { JuegoModel } from "../models-objection";
import { JuegoRepository } from "../repositories/juego.repository";

export class JuegoService {
  constructor(private readonly juegoRepository: JuegoRepository) {}

  public async crearJuego(juego: CreateJuegoDto): Promise<void> {
    const juegoDas: CreateJuegoDas = {
      ...juego,
    };

    await this.juegoRepository.createJuego(juegoDas);
  }
  public async buscarJuegosPorGenero(genero: string): Promise<JuegoModel[]> {
    try {
      const juegos = await this.juegoRepository.buscarJuegoPorGenero(genero);

      return juegos;
    } catch (error) {
      console.error("Error al buscar juegos por género:", error);
      throw new Error("No se pudo buscar los juegos por género");
    }
  }

  public async obtenerJuegos(): Promise<JuegoModel[]> {
    return this.juegoRepository.obtenerJuegos();
  }
}
