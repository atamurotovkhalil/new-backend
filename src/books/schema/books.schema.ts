import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsOptional } from "class-validator";
import { HydratedDocument } from "mongoose";

export type booksProduct = HydratedDocument<Books>;

@Schema({ timestamps: true })

export class Books {
    @Prop()
    @IsOptional()
    title: string;

    @Prop()
    @IsOptional()
    author: string;

    @Prop()
    @IsOptional()
    price: number;

    @Prop()
    @IsOptional()
    sold: number;

    @Prop()
    @IsOptional()
    description: string;

    @Prop({ type: [String], required: false })
    images: string[];

    @Prop()
    @IsOptional()
    quantity: number;
}

export const BooksSchema = SchemaFactory.createForClass(Books);