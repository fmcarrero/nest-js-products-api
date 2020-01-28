import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import ApplicationModule from '../application/application.module';
import ProductSchema from './adapters/repository/schema/product.schema';
import ProductController from './controllers/product.controller';

@Module({
  imports: [
    ApplicationModule,
    MongooseModule.forRoot('mongodb://localhost:27017/products'),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  controllers: [ProductController],
})
export default class InfrastructureModule {}
