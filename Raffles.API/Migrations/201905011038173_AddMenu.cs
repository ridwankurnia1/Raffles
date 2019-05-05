namespace Raffles.API.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddMenu : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Menus",
                c => new
                    {
                        UserId = c.Int(nullable: false),
                        Program = c.String(nullable: false, maxLength: 128),
                        MenuGroup = c.String(),
                        MenuName = c.String(),
                    })
                .PrimaryKey(t => new { t.UserId, t.Program })
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: false)
                .Index(t => t.UserId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Menus", "UserId", "dbo.Users");
            DropIndex("dbo.Menus", new[] { "UserId" });
            DropTable("dbo.Menus");
        }
    }
}
