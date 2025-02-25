import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Books } from './schema/books.schema';
import * as mongoose from 'mongoose';
import { ParsedQs } from 'qs';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
    constructor(
        @InjectModel(Books.name)
        private booksModel: mongoose.Model<Books>
    ) { }

    async getAllBooks(query: ParsedQs): Promise<Books[]> {

        const resPerPage = 10;
        const currentPage = Number(query.page) || 1;
        const skip = (currentPage - 1) * resPerPage;

        const keyword = query.keyword
            ? {
                $or: [
                    { title: { $regex: query.keyword, $options: 'i' } },
                    { author: { $regex: query.keyword, $options: 'i' } },
                ]
            }
            : {};
        return await this.booksModel.find({ ...keyword }).limit(resPerPage).skip(skip).lean();
    }

    async create(createBookDto: CreateBookDto): Promise<Books> {
        return await new this.booksModel(createBookDto).save();
    }

    async deleteById(id: string): Promise<Books | null> {
        if (!mongoose.isValidObjectId(id)) {
            throw new BadRequestException('Invalid book id');
        }

        const deletedProduct = await this.booksModel.findByIdAndDelete(id).lean();

        if (!deletedProduct) {
            throw new NotFoundException('Book not found');

        }
        return deletedProduct;

    }
    async findById(id: string): Promise<Books | null> {
        if (!mongoose.isValidObjectId(id)) {
            throw new BadRequestException('Invalid book id');
        }

        const book = await this.booksModel.findById(id).lean();

        if (!book) {
            throw new NotFoundException('Book not found');
        }
        return book;
    }

    async updateById(id: string, updateBookDto: CreateBookDto): Promise<Books | null> {
        if (!mongoose.isValidObjectId(id)) {
            throw new BadRequestException('Invalid book id');
        }

        const updatedBook = await this.booksModel.findByIdAndUpdate(id, updateBookDto, { new: true }).lean();

        if (!updatedBook) {
            throw new NotFoundException('Book not found');
        }
        return updatedBook;
    }

}
