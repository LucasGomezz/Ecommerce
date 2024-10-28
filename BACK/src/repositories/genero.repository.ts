import { GeneroModel } from "../models-objection/genero.model";
import { connection } from "../database/connection";
import { ModelClass } from "objection";

export class GeneroRepository {
  constructor(private readonly generoModel: ModelClass<GeneroModel>) {}

  public async obtenerGeneros(): Promise<GeneroModel[]> {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM Generos;";

      connection.query(query, (error: any, results: GeneroModel[]) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(results as GeneroModel[]);
      });
    });
  }
}
