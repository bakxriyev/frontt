import { appConfig, databaseConfig, jwtConfig } from './config';
import { CheckAuthGuard, CheckRoleGuard } from './guards';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { APP_GUARD } from '@nestjs/core';
import { FileModule, User, UserModule } from './modules';
import { AuthModule } from './modules/auth';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, jwtConfig],
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/uploads',
      rootPath: './uploads',
    }),
    JwtModule.register({
      secret: 'ashyosite',
      global: true,
      signOptions: {
        expiresIn: 60 * 15,
      },
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        try {
          return {
            dialect: 'postgres',
            host: config.get<string>('databaseConfig.host'),
            port: config.get<number>('databaseConfig.port'),
            username: config.get<string>('databaseConfig.user'),
            password: config.get<string>('databaseConfig.password'),
            database: config.get<string>('databaseConfig.dbname'),
            models: [User],
            // sync: { force: true },
            synchronize: true,
            logging: console.log,
            autoLoadModels: true,
          };
        } catch (error) {
          console.error(
            'Error occurred while connecting to the database',
            error,
          );
          throw error;
        }
      }
    }),
    UserModule,
    FileModule,
    AuthModule
  ],
  controllers: [],
   providers: [
    //  {
    //    useClass: CheckAuthGuard,
    //    provide: APP_GUARD,
    //  },
    //  {
    //    useClass: CheckRoleGuard,
    //    provide: APP_GUARD,
    //  },
   ],
})
export class AppModule { }
