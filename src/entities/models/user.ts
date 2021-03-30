import { Document } from 'mongoose';
import { IAccessLevels } from './access-levels';
import { IContractUser } from './contract-user';

export interface IUser extends Document{
  _id: string;
  document: string;
  registration: number;
  name: string;
  nickname: string;
  birth: string;
  bloodType: string;
  email: string;
  phone: string;
  emergencyContact: string;
  blocked: boolean;
  created: string;
  dueDate: number
  isAdmin: boolean;
  contract: IContractUser;
  since: Date;
  accessPeriod: IAccessLevels[];
  accessWeekday: number[];

}
