import { 
    Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, UploadedFiles, UseInterceptors 
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Books } from './schema/books.schema';
import { ParsedQs } from 'qs';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/multer.conffig';
import { Multer } from 'multer'; // ✅ Correct import

@Controller('api/books')
export class BooksController {
    constructor(private booksService: BooksService) {}

    @Get()
    async getAllBooks(@Query() query: ParsedQs): Promise<Books[]> {
        return await this.booksService.getAllBooks(query);
    }

    @Get('/:id')
    async getBookById(@Param('id') id: string): Promise<Books | null> {
        return await this.booksService.findById(id);
    }

    @Post()
    @UseInterceptors(FilesInterceptor('images', 5, multerOptions))
    async createBook(
        @UploadedFiles() files: Multer.File[], // ✅ Use `Multer.File[]`
        @Body() createBookDto: CreateBookDto
    ): Promise<Books> {
        const imagePaths = files?.map(file => file.path) || [];
        const updatedProduct = { ...createBookDto, images: imagePaths };
        return await this.booksService.create(updatedProduct);
    }
    @Delete('/:id')
    async deleteProduct(@Param('id') id: string): Promise<Books | null> {
        return await this.booksService.deleteById(id);
    }

    @Put('/:id')
    async updateProduct(@Param('id') id: string, @Body() product: UpdateBookDto): Promise<Books | null> {
        return await this.booksService.updateById(id, product);
    }
}
