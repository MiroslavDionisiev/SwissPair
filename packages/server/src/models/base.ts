import { Model, ModelOptions, QueryContext } from 'objection';

export class BaseModel extends Model {
  static modelPaths = [__dirname];

  createdAt!: Date;
  updatedAt!: Date;

  async $beforeInsert(context: QueryContext) {
    await super.$beforeInsert(context);
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  async $beforeUpdate(opt: ModelOptions, context: QueryContext) {
    await super.$beforeUpdate(opt, context);
    this.updatedAt = new Date();
  }
}
