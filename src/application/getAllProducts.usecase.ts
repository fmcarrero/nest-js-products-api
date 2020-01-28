import { Injectable, Inject } from '@nestjs/common';
import Product from 'src/domain/product';
import { ProductRepository } from 'src/domain/ports/product.repository';

@Injectable()
export default class GetAllProductsUseCase {
  constructor(
    @Inject('ProductRepository') private productRepository: ProductRepository,
  ) {}

  public handler(): Promise<Product[]> {
    return this.productRepository.getAll();
  }
}
