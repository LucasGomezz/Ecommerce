import { GeneroRepository } from '../repositories/genero.repository';
import { GeneroModel } from '../models-objection/genero.model';

export class GeneroService {
  constructor(private readonly generoRepository: GeneroRepository) {}

  public async obtenerGeneros(): Promise<GeneroModel[]> {
    return this.generoRepository.obtenerGeneros();
  }
}
