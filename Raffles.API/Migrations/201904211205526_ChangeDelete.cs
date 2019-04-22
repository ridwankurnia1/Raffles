namespace Raffles.API.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangeDelete : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Categories", "Active", c => c.Short(nullable: false));
            DropColumn("dbo.Categories", "DeleteFlag");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Categories", "DeleteFlag", c => c.Int(nullable: false));
            DropColumn("dbo.Categories", "Active");
        }
    }
}
