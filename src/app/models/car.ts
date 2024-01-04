import { ICarCategory } from "./category";
//import { RadioType } from "./enums";

export interface ICar {
  vin: number;
  color: string;
  brand: string;
  doorNr: number;
  category: ICarCategory;
  airConditioning: boolean;
  electricWindow: boolean;
  parkingSenzor: boolean;
  uSBPort: boolean;
  parktronicSystem: boolean;
  infotainmentSystem: boolean;
  radio: RadioType;
  type: string;
 }

 export enum RadioType {
  'ANALOG',
  'DIGITAL'
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
