export interface Menus {
    UserId: number;
    ProgramId: number;
    Program: string;
    MenuGroup: string;
    MenuName: string;
    MenuType: string;
    Username?: string;
    MenuChild?: Menus[];
}
