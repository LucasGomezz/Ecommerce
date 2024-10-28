import { Model, type Page, QueryBuilder, type QueryContext } from "objection";
import { v4 as uuidv4 } from "uuid";

class CustomDeleteQueryBuilder<M extends Model, R = M[]> extends QueryBuilder<
  M,
  R
> {
  public ArrayQueryBuilderType!: CustomDeleteQueryBuilder<M, M[]>;
  public SingleQueryBuilderType!: CustomDeleteQueryBuilder<M, M>;
  public MaybeSingleQueryBuilderType!: CustomDeleteQueryBuilder<
    M,
    M | undefined
  >;
  public NumberQueryBuilderType!: CustomDeleteQueryBuilder<M, number>;
  public PageQueryBuilderType!: CustomDeleteQueryBuilder<M, Page<M>>;
}

export class BaseModel extends Model {
  public $beforeInsert(queryContext: QueryContext): void | Promise<any> {
    this.id = uuidv4();
  }

  public readonly QueryBuilderType: CustomDeleteQueryBuilder<this>;

  public static QueryBuilder = CustomDeleteQueryBuilder;

  public id?: string;
}
