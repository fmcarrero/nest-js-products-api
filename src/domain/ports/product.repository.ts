import Product from 'src/domain/product';

export interface ProductRepository {
  getAll(): Promise<Product[]>;

  /**
   * Returns product filtered by id
   * @param {string} productId
   * @returns a `Product` object containing the data.
   */
  getProduct(id: string): Promise<Product>;

  createProduct(product: Product): Promise<Product>;

  deleteProduct(productId: string): Promise<Product>;

  updateProduct(productId: string, product: Product): Promise<Product>;
}
