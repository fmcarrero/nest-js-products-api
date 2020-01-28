import { Injectable, Inject } from '@nestjs/common';
import Product from 'src/domain/product';
import { ProductRepository } from 'src/domain/ports/product.repository';

@Injectable()
export default class DeleteProductUseCase {
  constructor(
    @Inject('ProductRepository') private productRepository: ProductRepository,
  ) {}

  public handler(productId: string): Promise<Product> {
    return this.productRepository.deleteProduct(productId);
  }
}
