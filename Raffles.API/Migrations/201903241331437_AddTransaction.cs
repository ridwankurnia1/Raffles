namespace Raffles.API.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddTransaction : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Categories",
                c => new
                    {
                        CategoryId = c.Int(nullable: false, identity: true),
                        CategoryName = c.String(),
                        TransactionType = c.String(),
                        DeleteFlag = c.Int(nullable: false),
                        CreatedDate = c.DateTime(),
                        UpdatedDate = c.DateTime(),
                        CreatedId = c.Int(nullable: false),
                        UpdatedId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.CategoryId)
                .ForeignKey("dbo.Users", t => t.CreatedId, cascadeDelete: false, name: "FK_CreatedUser")
                .ForeignKey("dbo.Users", t => t.UpdatedId, cascadeDelete: false, name: "FK_UpdatedUser")
                .Index(t => t.CreatedId)
                .Index(t => t.UpdatedId);
            
            CreateTable(
                "dbo.Transactions",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TransactionDate = c.DateTime(),
                        TransactionType = c.String(),
                        CategoryId = c.Int(nullable: false),
                        Description = c.String(),
                        Amount = c.Decimal(nullable: false, precision: 18, scale: 2),
                        ReferenceId = c.Int(nullable: false),
                        DeleteFlag = c.Int(nullable: false),
                        CreatedDate = c.DateTime(),
                        CreatedId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Categories", t => t.CategoryId, cascadeDelete: false, name: "FK_TransCategory")
                .ForeignKey("dbo.Users", t => t.CreatedId, cascadeDelete: false, name: "FK_TransUser")
                .Index(t => t.CategoryId)
                .Index(t => t.CreatedId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Transactions", "CreatedId", "dbo.Users");
            DropForeignKey("dbo.Transactions", "CategoryId", "dbo.Categories");
            DropForeignKey("dbo.Categories", "UpdatedId", "dbo.Users");
            DropForeignKey("dbo.Categories", "CreatedId", "dbo.Users");
            DropIndex("dbo.Transactions", new[] { "CreatedId" });
            DropIndex("dbo.Transactions", new[] { "CategoryId" });
            DropIndex("dbo.Categories", new[] { "UpdatedId" });
            DropIndex("dbo.Categories", new[] { "CreatedId" });
            DropTable("dbo.Transactions");
            DropTable("dbo.Categories");
        }
    }
}
