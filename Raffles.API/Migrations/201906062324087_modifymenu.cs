namespace Raffles.API.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class modifymenu : DbMigration
    {
        public override void Up()
        {
            DropPrimaryKey("dbo.Menus");
            AddColumn("dbo.Menus", "ProgramId", c => c.Int(nullable: false));
            AlterColumn("dbo.Menus", "Program", c => c.String());
            AddPrimaryKey("dbo.Menus", new[] { "UserId", "ProgramId" });
        }
        
        public override void Down()
        {
            DropPrimaryKey("dbo.Menus");
            AlterColumn("dbo.Menus", "Program", c => c.String(nullable: false, maxLength: 128));
            DropColumn("dbo.Menus", "ProgramId");
            AddPrimaryKey("dbo.Menus", new[] { "UserId", "Program" });
        }
    }
}
