import { User } from './user';

export interface Activities {
    ActivityId: number;
    ActivityName: string;
    Active: number;
    CreatedDate: Date;
    UpdatedDate: Date;
    CreatedId: number;
    UpdatedId: number;
    ActivityStart?: Date;
    ActivityEnd?: Date;
    CreatedUser?: string;
    UpdatedUser?: string;
}
