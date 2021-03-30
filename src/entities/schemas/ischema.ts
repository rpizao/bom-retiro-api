import { Schema } from "mongoose";

export abstract class CollectionSchema<T> extends Schema<T>{
  abstract collectionName(): string;
  abstract modelName(): string;
}