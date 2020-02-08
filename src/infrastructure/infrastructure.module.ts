import { Module, DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import DomainModule from 'src/domain/domain.module';
import ApplicationModule from '../application/application.module';
import ProductSchema from './adapters/repository/schema/product.schema';
import ProductController from './controllers/product.controller';
import { ConfigModule } from './config.module';
import { ConfigService } from './config.service';

const db_uri = 'MONGO_SERVER_URL';
const db_port = 'MONGO_SERVER_PORT';
const db_name = 'MONGO_SERVER_DBNAME';

@Module({})
export default class InfrastructureModule {
  static foorRoot(setting: any): DynamicModule {
    return {
      module: InfrastructureModule,
      imports: [
        ApplicationModule,
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            uri: `mongodb://${configService.get(db_uri)}:${setting.port ||
              configService.get(db_port)}/${configService.get(db_name)}`,
          }),
          inject: [ConfigService],
        }),
        MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
      ],
      controllers: [ProductController],
    };
  }
}
