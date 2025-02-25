import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Books, BooksSchema } from './schema/books.schema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [BooksController],
  imports: [
    MulterModule.register({
      dest: './uploads/products',
    }),
    MongooseModule.forFeature([{ name: Books.name, schema: BooksSchema }]),
  ],
  providers: [BooksService]
})
export class BooksModule {}
