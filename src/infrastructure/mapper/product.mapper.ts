import { Optional } from 'typescript-optional';
import Product from '../../domain/product';
import { ProductEntity } from '../adapters/repository/entity/product.entity';

export default class ProductMapper {
  public static toDomain(productEntity: ProductEntity): Optional<Product> {
    if (!productEntity) {
      return Optional.empty<Product>();
    }
    const product = new Product(
      productEntity.id,
      productEntity.name,
      productEntity.description,
      productEntity.imageUrl,
      productEntity.price,
    );

    product.setCreateAt(new Date(productEntity.createAt));
    return Optional.of(product);
  }

  public static toDomains(productsEntity: ProductEntity[]): Product[] {
    const products = new Array<Product>();
    productsEntity.forEach(productEntity => {
      const product = this.toDomain(productEntity);
      products.push(product.get());
    });
    return products;
  }
}
