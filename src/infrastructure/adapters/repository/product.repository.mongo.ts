import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import Product from 'src/domain/product';
import { ProductEntity } from 'src/infrastructure/adapters/repository/entity/product.entity';
import ProductMapper from 'src/infrastructure/mapper/product.mapper';
import { ProductRepository } from '../../../domain/ports/product.repository';

@Injectable()
export default class ProductRepositoryMongo implements ProductRepository {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<ProductEntity>,
  ) {}

  public async getAll(): Promise<Product[]> {
    const products = await this.productModel.find();
    return ProductMapper.toDomains(products);
  }

  public async createProduct(product: Product): Promise<Product> {
    let productCreated = new this.productModel(product);
    productCreated = await productCreated.save();
    return ProductMapper.toDomain(productCreated);
  }

  public async getProduct(productId: string): Promise<Product> {
    const product = await this.productModel.findById(productId);
    return ProductMapper.toDomain(product);
  }

  public async deleteProduct(productId: string): Promise<Product> {
    const productDeleted = await this.productModel.findByIdAndDelete(productId);
    return ProductMapper.toDomain(productDeleted);
  }

  public async updateProduct(
    productId: string,
    product: Product,
  ): Promise<Product> {
    const productUpdated = await this.productModel.findByIdAndUpdate(
      productId,
      product,
      { new: true },
    );
    return ProductMapper.toDomain(productUpdated);
  }
}
