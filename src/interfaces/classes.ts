import { ICreator } from "./creator";

export interface IClasses {
  id: number;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  location: string;
  creator_id: number;
  class_type_id: number;
  creator: ICreator;
}
