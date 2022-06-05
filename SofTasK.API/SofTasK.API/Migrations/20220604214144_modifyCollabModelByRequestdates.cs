using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SofTasK.API.Migrations
{
    public partial class modifyCollabModelByRequestdates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_AspNetUsers_AssignedId",
                table: "Tasks");

            migrationBuilder.AlterColumn<string>(
                name: "AssignedId",
                table: "Tasks",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<bool>(
                name: "Confirmed",
                table: "Collaborations",
                type: "boolean",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "RequestDate",
                table: "Collaborations",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "RespondDate",
                table: "Collaborations",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_AspNetUsers_AssignedId",
                table: "Tasks",
                column: "AssignedId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_AspNetUsers_AssignedId",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "Confirmed",
                table: "Collaborations");

            migrationBuilder.DropColumn(
                name: "RequestDate",
                table: "Collaborations");

            migrationBuilder.DropColumn(
                name: "RespondDate",
                table: "Collaborations");

            migrationBuilder.AlterColumn<string>(
                name: "AssignedId",
                table: "Tasks",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_AspNetUsers_AssignedId",
                table: "Tasks",
                column: "AssignedId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
