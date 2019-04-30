namespace Raffles.API.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddActivity : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Activities",
                c => new
                    {
                        ActivityId = c.Int(nullable: false, identity: true),
                        ActivityName = c.String(),
                        ActivityStart = c.DateTime(),
                        ActivityEnd = c.DateTime(),
                        Active = c.Short(nullable: false),
                        CreatedDate = c.DateTime(),
                        UpdatedDate = c.DateTime(),
                        CreatedId = c.Int(nullable: false),
                        UpdatedId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ActivityId)
                .ForeignKey("dbo.Users", t => t.CreatedId, cascadeDelete: false)
                .ForeignKey("dbo.Users", t => t.UpdatedId, cascadeDelete: false)
                .Index(t => t.CreatedId)
                .Index(t => t.UpdatedId);
            
            AddColumn("dbo.Transactions", "ActivityId", c => c.Int(nullable: false));
            AddColumn("dbo.Transactions", "Active", c => c.Int(nullable: false));
            CreateIndex("dbo.Transactions", "ActivityId");
            AddForeignKey("dbo.Transactions", "ActivityId", "dbo.Activities", "ActivityId", cascadeDelete: false);
            DropColumn("dbo.Transactions", "DeleteFlag");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Transactions", "DeleteFlag", c => c.Int(nullable: false));
            DropForeignKey("dbo.Transactions", "ActivityId", "dbo.Activities");
            DropForeignKey("dbo.Activities", "UpdatedId", "dbo.Users");
            DropForeignKey("dbo.Activities", "CreatedId", "dbo.Users");
            DropIndex("dbo.Transactions", new[] { "ActivityId" });
            DropIndex("dbo.Activities", new[] { "UpdatedId" });
            DropIndex("dbo.Activities", new[] { "CreatedId" });
            DropColumn("dbo.Transactions", "Active");
            DropColumn("dbo.Transactions", "ActivityId");
            DropTable("dbo.Activities");
        }
    }
}
