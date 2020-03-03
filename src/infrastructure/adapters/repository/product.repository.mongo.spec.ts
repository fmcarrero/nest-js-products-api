import { GenericContainer, Wait } from 'testcontainers';
import { TestingModule, Test } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import InfrastructureModule from '../../infrastructure.module';

import ProductRepositoryMongo from './product.repository.mongo';
import ProductSchema from './schema/product.schema';
import Product from '../../../domain/product';

describe('productRepositoryMongo', () => {
  let productRepositoryMongo: ProductRepositoryMongo;
  let container;
  const mongoPort = 27017;
  jest.setTimeout(30000);
  beforeAll(async done => {
    container = await new GenericContainer('mongo')
      .withExposedPorts(mongoPort)
      .withWaitStrategy(Wait.forLogMessage('Listening on 0.0.0.0'))
      .start();

    const setting = { port: container.getMappedPort(mongoPort) };
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        InfrastructureModule.foorRoot(setting),
        MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
      ],
      providers: [ProductRepositoryMongo],
    }).compile();

    productRepositoryMongo = module.get<ProductRepositoryMongo>(
      ProductRepositoryMongo,
    );

    done();
  });

  afterAll(async done => {
    container.stop();
    done();
  });

  afterEach(async done => {
    await container.exec([
      'mongo',
      'products',
      '--eval',
      "'db.dropDatabase();'",
    ]);
    done();
  });

  describe('getAll products', () => {
    it('when get all products', async done => {
      const product = new Product(
        '',
        'consola',
        'prueba',
        'https://upload.wikimedia.org/wikipedia/commons/5/5d/Sony-PSP-1000-Body.png',
        500,
      );
      product.setCreateAt(new Date(2017, 2, 7));
      await productRepositoryMongo.createProduct(product);

      const products = await productRepositoryMongo.getAll();

      expect(products.length).toBe(1);
      expect(products[0].getName()).toBe('consola');
      done();
    });
  });

  describe('get product', () => {
    it('when get product with id', async done => {
      const product = new Product(
        '354564456456',
        'x-box-one',
        'prueba',
        'https://upload.wikimedia.org/wikipedia/commons/5/5d/Sony-PSP-1000-Body.png',
        500,
      );
      product.setCreateAt(new Date(2017, 2, 7));
      const productSaved = await productRepositoryMongo.createProduct(product);

      const ProductExpect = await productRepositoryMongo.getProduct(
        productSaved.get().getId(),
      );
      expect(ProductExpect.isPresent()).toBeTruthy();
      expect(ProductExpect.get().getId()).toEqual(productSaved.get().getId());
      expect(ProductExpect.get().getName()).toBe('x-box-one');
      done();
    });
  });

  describe('create product', () => {
    it('when create product then return product', async done => {
      const product = new Product(
        '354564456456',
        'macbook pro',
        'prueba de guardado',
        'https://upload.wikimedia.org/wikipedia/commons/5/5d/Sony-PSP-1000-Body.png',
        500,
      );
      product.setCreateAt(new Date(2017, 2, 7));
      const productSaved = await productRepositoryMongo.createProduct(product);

      expect(productSaved.isPresent()).toBeTruthy();
      expect(productSaved.get().getId()).not.toBeUndefined();
      expect(productSaved.get().getName()).toBe('macbook pro');
      done();
    });
  });
});
