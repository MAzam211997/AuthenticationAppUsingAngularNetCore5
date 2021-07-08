using Microsoft.EntityFrameworkCore.Migrations;

namespace AuthenticationApp.Migrations
{
    public partial class SubmittedAnswers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SubmittedAnswers",
                columns: table => new
                {
                    SubmittedAnswersId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AnswerText = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsCorrect = table.Column<bool>(type: "bit", nullable: false),
                    FormFieldId = table.Column<int>(type: "int", nullable: false),
                    QuestionId = table.Column<int>(type: "int", nullable: false),
                    OptionId = table.Column<int>(type: "int", nullable: false),
                    OptionsOptionId = table.Column<int>(type: "int", nullable: true),
                    QuestionsQuestionId = table.Column<int>(type: "int", nullable: true),
                    FormFieldsFormFieldId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubmittedAnswers", x => x.SubmittedAnswersId);
                    table.ForeignKey(
                        name: "FK_SubmittedAnswers_FormFields_FormFieldsFormFieldId",
                        column: x => x.FormFieldsFormFieldId,
                        principalTable: "FormFields",
                        principalColumn: "FormFieldId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SubmittedAnswers_Options_OptionsOptionId",
                        column: x => x.OptionsOptionId,
                        principalTable: "Options",
                        principalColumn: "OptionId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SubmittedAnswers_Questions_QuestionsQuestionId",
                        column: x => x.QuestionsQuestionId,
                        principalTable: "Questions",
                        principalColumn: "QuestionId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SubmittedAnswers_FormFieldsFormFieldId",
                table: "SubmittedAnswers",
                column: "FormFieldsFormFieldId");

            migrationBuilder.CreateIndex(
                name: "IX_SubmittedAnswers_OptionsOptionId",
                table: "SubmittedAnswers",
                column: "OptionsOptionId");

            migrationBuilder.CreateIndex(
                name: "IX_SubmittedAnswers_QuestionsQuestionId",
                table: "SubmittedAnswers",
                column: "QuestionsQuestionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SubmittedAnswers");
        }
    }
}
