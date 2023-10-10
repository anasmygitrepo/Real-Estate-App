import { IpropertyBase } from './IpropertyBase';
import { PhotoDto } from './photoDto';

export class Property implements IpropertyBase {
  id: number;
  name: string;
  furnishingType: string;
  furnishingTypeId?: number;
  propertyType: string;
  propertyTypeId?: number;
  CityId: number;
  bhk: number;
  city: string;
  sellRent: number;
  country: string;
  //..............................price info.......................
  price: number;
  builtAria: number;
  maintenance?: number;
  carpetAria?: number;
  sequrity?: number;
  //..............................Address info.......................
  totalFloors?: number;
  floorNo: number;
  address: string;
  address2?: string;
  LandMark: string;
  //..............................otherinformations.......................
  readyToMove: boolean;
  mainEntrance: string;
  estPossessionOn?: Date;
  age?: string;
  gated?: boolean;
  description?: string;
  PostedOn: string;
  postedBy: number;
  //..............................images.......................
  Image?: string;
  photos?: PhotoDto[];
}
