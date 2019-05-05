namespace Raffles.API.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RevMenu : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Menus", "MenuType", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Menus", "MenuType");
        }
    }
}
