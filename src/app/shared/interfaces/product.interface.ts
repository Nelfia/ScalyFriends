export interface ProductInterface {
  idProduct: number;
  idAuthor: number;
  category: string;
  type: string;
  name: string;
  description: string;
  img: string;
  ref: string;
  price: number;
  stock: number;
  gender: string;
  species: string;
  race: string;
  birth: number;
  requiresCertification: boolean;
  dimensionsMax: number;
  dimensionsUnit: string;
  specification: string;
  specificationValue: number;
  specificationUnit: string;
  isVisible: boolean;

}
