import {ProductInterface} from "./product.interface";

export interface LineInterface {
  idLine: number;
  idCommand: number;
  idProduct: number;
  quantity: number;
  price: number;
  product: ProductInterface;

}
