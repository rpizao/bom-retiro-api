import { Connection, Document, Model } from "mongoose";
import { CreateConnections } from "./config/create-connections";

export abstract class BasicRepository<T extends Document> {
  private _dbReference: string;
  protected conn: Connection;

  constructor(db: string = "default"){
    this._dbReference = db;

    this.conn = CreateConnections.on(this.dbName);
  }
  
  protected get dbReference(): string {
    return this._dbReference;
  }

  protected get dbIsDefault(): boolean {
    return this._dbReference == "default";
  }

  private get dbName(): string {
    let dbName;
    if(this.dbIsDefault) dbName = process.env.DB;
    else dbName = process.env[this._dbReference.toUpperCase() + "_DB"];
    
    if(!dbName) throw new Error("DB não foi informado no arquivo .env");
    return dbName;
  }

  protected getModel(model: string): Model<T, {}> {
    return CreateConnections.model(this.dbName, model);
  }

  isSameId<R extends Document>(evt1: R, evt2: R): boolean {
    return evt1.id == evt2.id || evt1._id == evt2._id || evt1._id == evt2.id || evt1.id == evt2._id;
  }

}