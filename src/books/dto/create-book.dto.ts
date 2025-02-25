import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBookDto {
    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly author: string;

    @IsNotEmpty()
    @IsString()
    readonly price: string;

    @IsNotEmpty()
    @IsString()
    readonly sold: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true }) // ✅ Ensures images are strings
    readonly images: string[];

    @IsNotEmpty()
    @IsString()
    readonly quantity: string;
}