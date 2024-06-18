import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { AddressModule } from './address/address.module';
import typeorm from './config/typeorm';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
