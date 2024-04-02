import { Moment } from "moment";
import { ICarCategory } from "./category";

export interface ICar {
  vin: number | null;
  color: string | null;
  brand: string | null;
  doorNr: number | null;
  category: ICarCategory | null;
  airConditioning: boolean | null;
  electricWindow: boolean | null;
  parkingSenzor: boolean | null;
  USBPort: boolean | null;
  parktronicSystem: boolean | null;
  infotainmentSystem: boolean | null;
  radio: RadioType | null;
  type: string| null;
  fuel: Fuel | null;
  createdOn: Moment | null;
  updatedOn: Moment | null;

  //createdOn: Date | null;
  //updatedOn: Date | null;
 


 }

 export enum RadioType {
  'ANALOG',
  'DIGITAL'
}

export enum Fuel {
  'GASOLINE',
  'DIESEL',
  'HYBRID'
}


/*export const CARS: ICar[] = [
  { vin: 1, brand: 'Dacia' },
  { vin: 2, brand: 'Ford' },
  { vin: 3, brand: 'Hyundai' },
  { vin: 4, brand: 'BMW' },
  { vin: 5, brand: 'Skoda' },
  { vin: 6, brand: 'Opel' },
  { vin: 7, brand: 'KIA' },
  { vin: 8, brand: 'Mazda' },
  { vin: 9, brand: 'Honda' },
  { vin: 10, brand: 'Toyota' },
];*/


// export interface SelectProtected {
//   readonly wrapperElement: HTMLDivElement;
//   readonly inputElement: HTMLInputElement;
// }