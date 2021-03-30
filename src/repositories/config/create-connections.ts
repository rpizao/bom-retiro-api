import { Connection, Document, Model } from "mongoose";
import { AuthUserSchema } from "../../entities/schemas/auth-user.schema";
import { IndicatorSchema } from "../../entities/schemas/indicator.schema";
import { CollectionSchema } from "../../entities/schemas/ischema";
import { ProjectSchema } from "../../entities/schemas/project.schema";

export class CreateConnections {

  private static conn: {key?: string, mongoosing: Connection, models: Model<any, {}>[]}[] = [];

  static on(db: string): Connection{
    return this.getConnection(db);
  }

  static model<T extends Document>(db: string, modelName: string): Model<T, {}>{
    const model = CreateConnections.conn.find(c => c.key == db)?.models.find(m => m.modelName == modelName);
    if(model == null) throw new Error("Model " + modelName + " não encontrado para o db " + db);
    return model;
  }

  protected static getConnection(dbNameSelect: string): Connection {
    let conn = CreateConnections.conn.find(c => c.key == dbNameSelect);
    if(conn != null) {
      return conn.mongoosing;
    }

    const url = 'mongodb://' + process.env.DB_HOST + ':27018/' + dbNameSelect;
    const params = {
      authSource: dbNameSelect,
      poolSize: 10,
      useCreateIndex: true,
      user: process.env.DB_USER,
      pass: process.env.DB_PASSWORD,
      useNewUrlParser: true,
      useUnifiedTopology: true
    };
    const mongoose  = require('mongoose');
    let newConn = mongoose.createConnection(url, params);

    CreateConnections.conn.push({key: dbNameSelect, mongoosing: newConn, models: this.createModels(newConn)});
    return newConn;
  }

  private static createModels(conn: Connection): Model<any, {}>[]{
    const models: Model<any, {}>[] = [];
    
    models.push(this.createModel(conn, new IndicatorSchema()));
    models.push(this.createModel(conn, new ProjectSchema()));
    models.push(this.createModel(conn, new AuthUserSchema()));

    return models;
  }

  private static createModel<T>(conn: Connection, schema: CollectionSchema<T>): Model<any, {}>{
    return conn.model(schema.modelName(), schema, schema.collectionName());
  }

}