import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [BooksModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads/products'), // Serve "uploads" folder
      serveRoot: '/uploads/products', // Access images via "/uploads/..."
    }),
    MongooseModule.forRoot('mongodb+srv://mock-project:6d91748086@courseline.lry2a.mongodb.net/new')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
