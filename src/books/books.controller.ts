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

    // @Put('upload/:id')
    // @UseInterceptors(FilesInterceptor('images', 5, multerOptions))
    // async uploadImages(
    //     @Param('id') id: string,
    //     @UploadedFiles() files: Multer.File[] // ✅ Use `Multer.File[]`
    // ) {
    //     if (!files || files.length === 0) {
    //         return { message: 'No files uploaded' };
    //     }

    //     const imagePaths = files.map(file => file.path);
    //     const updatedBook = await this.booksService.updateById(id, { images: imagePaths });

    //     return {
    //         message: 'Files uploaded successfully',
    //         images: imagePaths,
    //         updatedBook,
    //     };
    // }
}
