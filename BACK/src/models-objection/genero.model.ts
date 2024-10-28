import { Model } from "objection";

export class GeneroModel extends Model {
  static tableName = "Generos";

  nombre!: string;
}
