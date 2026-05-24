using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SmartOffer.API.Migrations
{
    /// <inheritdoc />
    public partial class AddMaxBookingPerCustomer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MaxBookingPerCustomer",
                table: "Offers",
                type: "INTEGER",
                nullable: false,
                defaultValue: 1);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MaxBookingPerCustomer",
                table: "Offers");
        }
    }
}
