import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config';
import { configValidationSchema } from './config/schema';
import { AuthMiddleware } from './middleware/AuthMiddleware';
import { AuthModule } from './modules/AuthModule';
import { GeolocationModule } from './modules/GeolocationModule';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [config],
            validationSchema: configValidationSchema,
            isGlobal: true
        }),
        MongooseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    uri: configService.get('mongodb.uri')
                };
            }
        }),
        GeolocationModule,
        AuthModule
    ]
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .exclude(
                { path: '/api/auth/register', method: RequestMethod.POST },
                { path: '/api/auth/login', method: RequestMethod.POST }
            )
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
