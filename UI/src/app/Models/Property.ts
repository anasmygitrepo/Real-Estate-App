import { IpropertyBase } from './IpropertyBase';

export class Property implements IpropertyBase {
  id: number;
  name: string;
  furnishingType: string;
  propertyType: string;
  bhk: string;
  city: string;
  sellRent: number;
  country: string;
  //..............................price info.......................
  price: number;
  builtAria: number;
  Maintenance?: number;
  CarpetAria?: number;
  Sequirity?: number;
  //..............................Address info.......................
  TotalFloor?: string;
  FlorNo: string;
  Address: string;
  Address2?: string;
  LandMark: string;
  //..............................otherinformations.......................
  readyToMove: number;
  RTMDirection: string;
  PossionOn?: Date;
  AOP?: string;
  Gated?: number;
  Description?: string;
  PostedOn: string;
  postedBy: number;
  //..............................images.......................
  Image?: string;
}
