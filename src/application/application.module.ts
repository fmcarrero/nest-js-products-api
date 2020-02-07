import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import ProductRepositoryMongo from '../infrastructure/adapters/repository/product.repository.mongo';
import ProductSchema from '../infrastructure/adapters/repository/schema/product.schema';
import GetAllProductsUseCase from './getAllProducts.usecase';
import DomainModule from '../domain/domain.module';
import GetProductUseCase from './getProduct.usecase';
import CreateProductUseCase from './createProduct.usecase';
import DeleteProductUseCase from './deleteProduct.usecase';
import UpdateProductUseCase from './updateProduct.usecase';

@Module({
  imports: [
    DomainModule,
    MongooseModule.forFeature([
      {
        name: 'Product',
        schema: ProductSchema,
      },
    ]),
  ],
  providers: [
    GetAllProductsUseCase,
    GetProductUseCase,
    CreateProductUseCase,
    DeleteProductUseCase,
    UpdateProductUseCase,
    {
      provide: 'ProductRepository',
      useClass: ProductRepositoryMongo,
    },
  ],
  exports: [
    GetAllProductsUseCase,
    GetProductUseCase,
    CreateProductUseCase,
    DeleteProductUseCase,
    UpdateProductUseCase,
  ],
})
export default class ApplicationModule {}
