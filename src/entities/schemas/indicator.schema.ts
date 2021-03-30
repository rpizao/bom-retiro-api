import { Indicator } from "../models/indicator";
import { CollectionSchema } from "./ischema";

export class IndicatorSchema extends CollectionSchema<Indicator> {
  
  modelName(): string {
    return "IndicatorModel";
  }

  collectionName(): string {
    return "indicators";
  }
  
  constructor(){
    super({
      code: String,
      title: String,
      classifier: String,
      configuration: {
        dimension: String,
        maxY: String
      },
      dimension: String,
      source1D: [
        {
          name: String,
          value: Number
        }
      ],
      source2D: [
        {
          name: String,
          series: [
            {
              name: String,
              value: Number
            }
          ]
        }
      ]
    });
  }

}