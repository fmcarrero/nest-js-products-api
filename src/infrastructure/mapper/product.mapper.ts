import Product from '../../domain/product';
import { ProductEntity } from '../adapters/repository/entity/product.entity';

export default class ProductMapper {
  public static toDomain(productEntity: ProductEntity): Product {
    return new Product(
      productEntity.id,
      productEntity.name,
      productEntity.desription,
      productEntity.imageUrl,
      productEntity.price,
      new Date(productEntity.createAt),
    );
  }

  public static toDomains(productsEntity: ProductEntity[]): Product[] {
    const products = new Array<Product>();
    productsEntity.forEach(productEntity => {
      const product = this.toDomain(productEntity);
      products.push(product);
    });
    return products;
  }
}
