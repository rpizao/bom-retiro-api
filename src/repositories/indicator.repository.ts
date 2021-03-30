import { Model } from 'mongoose';
import { Indicator } from '../entities/models/indicator';
import { BasicRepository } from './basic-repository';

export class IndicatorRepository extends BasicRepository<Indicator> {

  private Model: Model<Indicator, {}>;

  constructor() {
    super();

    this.Model = this.getModel("IndicatorModel");
  }

  async get(code: string): Promise<Indicator | null> {
    return await this.Model.findOne({"code": code});
  }

  async list(): Promise<Indicator[] | null> {
    return this.Model.find({}, {'_id': 0, 'source1d': 0, 'source2d': 0});
  }

}