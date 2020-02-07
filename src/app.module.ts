import { Module, DynamicModule } from '@nestjs/common';
import DomainModule from './domain/domain.module';
import ApplicationModule from './application/application.module';
import InfrastructureModule from './infrastructure/infrastructure.module';

@Module({})
export default class AppModule {
  static foorRoot(setting: any): DynamicModule {
    return {
      module: AppModule,
      imports: [
        DomainModule,
        ApplicationModule,
        InfrastructureModule.foorRoot(setting),
      ],
    };
  }
}
