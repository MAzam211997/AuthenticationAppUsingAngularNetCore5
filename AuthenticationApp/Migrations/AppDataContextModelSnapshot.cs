﻿// <auto-generated />
using System;
using AuthenticationApp.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace AuthenticationApp.Migrations
{
    [DbContext(typeof(AppDataContext))]
    partial class AppDataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.7")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("AuthenticationApp.Models.FormFields", b =>
                {
                    b.Property<int>("FormFieldId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("FormFieldId");

                    b.ToTable("FormFields");
                });

            modelBuilder.Entity("AuthenticationApp.Models.Options", b =>
                {
                    b.Property<int>("OptionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("FormFieldId")
                        .HasColumnType("int");

                    b.Property<int?>("FormFieldsFormFieldId")
                        .HasColumnType("int");

                    b.Property<bool>("IsCorrect")
                        .HasColumnType("bit");

                    b.Property<string>("OptionText")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("QuestionId")
                        .HasColumnType("int");

                    b.Property<int?>("QuestionsQuestionId")
                        .HasColumnType("int");

                    b.HasKey("OptionId");

                    b.HasIndex("FormFieldsFormFieldId");

                    b.HasIndex("QuestionsQuestionId");

                    b.ToTable("Options");
                });

            modelBuilder.Entity("AuthenticationApp.Models.Questions", b =>
                {
                    b.Property<int>("QuestionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("FormFieldId")
                        .HasColumnType("int");

                    b.Property<int?>("FormFieldsFormFieldId")
                        .HasColumnType("int");

                    b.HasKey("QuestionId");

                    b.HasIndex("FormFieldsFormFieldId");

                    b.ToTable("Questions");
                });

            modelBuilder.Entity("AuthenticationApp.Models.SubmittedAnswers", b =>
                {
                    b.Property<int>("SubmittedAnswersId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AnswerText")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("FormFieldId")
                        .HasColumnType("int");

                    b.Property<int?>("FormFieldsFormFieldId")
                        .HasColumnType("int");

                    b.Property<bool>("IsCorrect")
                        .HasColumnType("bit");

                    b.Property<int>("OptionId")
                        .HasColumnType("int");

                    b.Property<int?>("OptionsOptionId")
                        .HasColumnType("int");

                    b.Property<int>("QuestionId")
                        .HasColumnType("int");

                    b.Property<int?>("QuestionsQuestionId")
                        .HasColumnType("int");

                    b.HasKey("SubmittedAnswersId");

                    b.HasIndex("FormFieldsFormFieldId");

                    b.HasIndex("OptionsOptionId");

                    b.HasIndex("QuestionsQuestionId");

                    b.ToTable("SubmittedAnswers");
                });

            modelBuilder.Entity("AuthenticationApp.Models.Users", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Fullname")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PictureName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("AuthenticationApp.Models.Options", b =>
                {
                    b.HasOne("AuthenticationApp.Models.FormFields", "FormFields")
                        .WithMany()
                        .HasForeignKey("FormFieldsFormFieldId");

                    b.HasOne("AuthenticationApp.Models.Questions", "Questions")
                        .WithMany()
                        .HasForeignKey("QuestionsQuestionId");

                    b.Navigation("FormFields");

                    b.Navigation("Questions");
                });

            modelBuilder.Entity("AuthenticationApp.Models.Questions", b =>
                {
                    b.HasOne("AuthenticationApp.Models.FormFields", "FormFields")
                        .WithMany()
                        .HasForeignKey("FormFieldsFormFieldId");

                    b.Navigation("FormFields");
                });

            modelBuilder.Entity("AuthenticationApp.Models.SubmittedAnswers", b =>
                {
                    b.HasOne("AuthenticationApp.Models.FormFields", "FormFields")
                        .WithMany()
                        .HasForeignKey("FormFieldsFormFieldId");

                    b.HasOne("AuthenticationApp.Models.Options", "Options")
                        .WithMany()
                        .HasForeignKey("OptionsOptionId");

                    b.HasOne("AuthenticationApp.Models.Questions", "Questions")
                        .WithMany()
                        .HasForeignKey("QuestionsQuestionId");

                    b.Navigation("FormFields");

                    b.Navigation("Options");

                    b.Navigation("Questions");
                });
#pragma warning restore 612, 618
        }
    }
}
