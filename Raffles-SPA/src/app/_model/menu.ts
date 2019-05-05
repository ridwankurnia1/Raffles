export interface Menus {
    UserId: number;
    Program: string;
    MenuGroup: string;
    MenuName: string;
    MenuType: string;
    UserName?: string;
    MenuChild?: Menus[];
}
