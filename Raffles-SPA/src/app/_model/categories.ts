import { User } from './user';

export interface Categories {
    CategoryId: number;
    CategoryName: string;
    TransactionType: string;
    Active: number;
    CreatedDate: Date;
    UpdatedDate: Date;
    CreatedId: number;
    UpdatedId: number;
    Created?: User;
    Updated?: User;
}
