import { Document } from "mongoose";

export interface Indicator extends Document {
  code: string;
  title: string;
  classifier: string
  description: string;
  configuration: Configuration;
  source?: DataIndicator[];
}

export interface DataIndicator {
  name: string;
  series: SerieIndicator[];
}

export interface SerieIndicator {
  name: string;
  value: number;
}

export interface Configuration {
  maxY: string;
}