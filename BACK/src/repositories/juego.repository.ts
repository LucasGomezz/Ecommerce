import { ModelClass } from "objection";
import { CreateJuegoDas } from "../dto/juego.dto";
import { JuegoModel } from "../models-objection";
import { connection } from "../database/connection";

export class JuegoRepository {
  constructor(private readonly juegoModel: ModelClass<JuegoModel>) {}

  public async createJuego(juegoDto: CreateJuegoDas): Promise<void> {
    const {
      nombre,
      descripcion,
      genero,
      imagen,
      clasificacion,
      precio,
      imagenHorizontal,
    } = juegoDto;

    const query = `
      INSERT INTO Productos (nombre, descripcion, genero, imagen, clasificacion, precio, imagenHorizontal)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      nombre,
      descripcion,
      genero,
      imagen,
      clasificacion,
      precio,
      imagenHorizontal || null,
    ];

    try {
      await connection.query(query, values);
      console.log("Juego created");
      connection.end();
    } catch (error) {
      if ((error as any).code === "ER_DUP_ENTRY") {
        connection.end();
        throw new Error("Juego already exists");
      }
      connection.end();
      throw error;
    }
  }
  public async buscarJuegoPorGenero(genero: string): Promise<JuegoModel[]> {
    const query = `
      SELECT * FROM Productos WHERE genero = ?
    `;

    try {
      const [rows] = await connection.query(query, [genero]);
      connection.end();

      return rows as JuegoModel[];
    } catch (error) {
      connection.end();
      throw error;
    }
  }

  public async obtenerJuegos(): Promise<JuegoModel[]> {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM Productos;";

      connection.query(query, (error: any, results: JuegoModel[]) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(results as JuegoModel[]);
      });
    });
  }
}
