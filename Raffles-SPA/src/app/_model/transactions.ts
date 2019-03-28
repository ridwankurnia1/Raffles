export interface Transactions {
    Id: number;
    TransactionDate: Date;
    TransactionType: string;
    CategoryId: number;
    Description: string;
    Amount: number;
    ReferenceId: number;
    DeleteFlag: number;
    CreatedDate: Date;
    CreatedId: number;
}
