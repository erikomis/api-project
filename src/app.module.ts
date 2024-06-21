import { Module, ValidationPipe } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { AddressModule } from './address/address.module';
import { CacheModuleProject } from './cache/cache.module';
import typeorm from './config/typeorm';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { RoleGuard } from './guards/role.guard';
import { AuthGuard } from './guards/auth.guard';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env.production'],
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      // useFactory: () => ({
      //   type: 'postgres',
      //   host: process.env.DB_HOST,
      //   port: parseInt(process.env.DB_PORT, 10),
      //   username: process.env.DB_USER,
      //   password: process.env.DB_PASS,
      //   database: process.env.DB_NAME,
      //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
      //   migrations: [__dirname + '/migrations/*{.ts,.js}'],
      //   migrationsRun: true,
      //   synchronize: false,
      // }),
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),

    UserModule,
    StateModule,
    CityModule,
    AddressModule,
    CacheModuleProject,
    AuthModule,
    CategoryModule,
    ProductModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
