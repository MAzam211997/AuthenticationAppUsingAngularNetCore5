using Microsoft.EntityFrameworkCore.Migrations;

namespace AuthenticationApp.Migrations
{
    public partial class StudentTables1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Options_FormFields_FormFieldId",
                table: "Options");

            migrationBuilder.DropIndex(
                name: "IX_Options_FormFieldId",
                table: "Options");

            migrationBuilder.AddColumn<int>(
                name: "FormFieldsFormFieldId",
                table: "Options",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Options_FormFieldsFormFieldId",
                table: "Options",
                column: "FormFieldsFormFieldId");

            migrationBuilder.AddForeignKey(
                name: "FK_Options_FormFields_FormFieldsFormFieldId",
                table: "Options",
                column: "FormFieldsFormFieldId",
                principalTable: "FormFields",
                principalColumn: "FormFieldId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Options_FormFields_FormFieldsFormFieldId",
                table: "Options");

            migrationBuilder.DropIndex(
                name: "IX_Options_FormFieldsFormFieldId",
                table: "Options");

            migrationBuilder.DropColumn(
                name: "FormFieldsFormFieldId",
                table: "Options");

            migrationBuilder.CreateIndex(
                name: "IX_Options_FormFieldId",
                table: "Options",
                column: "FormFieldId");

            migrationBuilder.AddForeignKey(
                name: "FK_Options_FormFields_FormFieldId",
                table: "Options",
                column: "FormFieldId",
                principalTable: "FormFields",
                principalColumn: "FormFieldId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
