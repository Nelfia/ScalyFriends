import {LineInterface} from "./Line.interface";

export interface CommandInterface {
  idCommand: number;
  idCustomer: number;
  idAgent: number;
  orderDate: string;
  ref: string;
  status: string;
  lastChange: string;
  lines: Array<LineInterface>;

}
