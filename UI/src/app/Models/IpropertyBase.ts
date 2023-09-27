import { Property } from './Property';

export interface IpropertyBase {
  //..............................basic info.......................
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
  Image?: string;

  // Maintenance: number;
  // CarpetAria: number;
  // Sequirity: number;
  // //..............................Address info.......................
  // TotalFloor: string;
  // FlorNo: string;
  // Address: string;
  // LandMark: string;
  // //..............................otherinformations.......................
  // RTM: number;
  // PossionOn: Date;
  // AOP: string;
  // Gated: number;
  // Description: string;
  // //..............................images.......................
  //
}
