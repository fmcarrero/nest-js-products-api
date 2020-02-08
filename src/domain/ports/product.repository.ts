import Product from 'src/domain/product';
import { Optional } from 'typescript-optional';

export interface ProductRepository {
  getAll(): Promise<Product[]>;

  /**
   * Returns product filtered by id
   * @param {string} productId
   * @returns a `Product` object containing the data.
   */
  getProduct(id: string): Promise<Optional<Product>>;

  createProduct(product: Product): Promise<Optional<Product>>;

  deleteProduct(productId: string): Promise<Optional<Product>>;

  updateProduct(
    productId: string,
    product: Product,
  ): Promise<Optional<Product>>;
}
