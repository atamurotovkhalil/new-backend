import { IsOptional, IsString } from "class-validator";

export class Book {
    @IsOptional()
    @IsString()
    readonly title: string;

    @IsOptional()
    @IsString()
    readonly author: string;

    @IsOptional()
    @IsString()
    readonly description: string;

    @IsOptional()
    @IsString()
    readonly year: string;
    
    @IsOptional()
    @IsString()
    readonly sold: string;
}