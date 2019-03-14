namespace Raffles.API.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Username = c.String(),
                        PasswordHash = c.Binary(),
                        PasswordSalt = c.Binary(),
                        Email = c.String(),
                        Phone = c.String(),
                        BlockNo = c.String(),
                        HouseNo = c.String(),
                        LastLogin = c.DateTime(),
                        CreatedDate = c.DateTime(),
                        Active = c.Short(nullable: false),
                        AuthorizedBy = c.Int(nullable: false),
                        AuthorizedDate = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);            
        }
        
        public override void Down()
        {
            DropTable("dbo.Users");
        }
    }
}
