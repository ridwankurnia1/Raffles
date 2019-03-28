export interface User {
    Id: number;
    Username: string;
    Email: string;
    Phone: string;
    BlockNo: string;
    HouseNo: string;
    Active: number;
    AuthorizedBy: number;
    AuthorizedDate?: Date;
    LastLogin?: Date;
    CreatedDate?: Date;
}
