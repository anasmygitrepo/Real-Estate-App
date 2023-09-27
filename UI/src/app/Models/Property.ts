import { IpropertyBase } from './IpropertyBase';

export class Property implements IpropertyBase {
  Id: number;
  Name: string;
  Ptype: string;
  Ftype: string;
  BHK: string;
  City: string;
  SellRent: number;
  //..............................price info.......................
  Price: number;
  BuiltArea: number;
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
  RTM: number;
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
