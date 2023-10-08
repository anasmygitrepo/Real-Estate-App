import { Property } from './Property';

export interface IpropertyBase {
  //..............................basic info.......................
  id: number;
  name: string;
  furnishingType: string;
  propertyType: string;
  bhk: string;
  city: string;
  sellRent: number;
  //..............................price info.......................
  price: number;
  builtAria: number;
  Image?: string;
  readyToMove: number;
  country: string;
}
