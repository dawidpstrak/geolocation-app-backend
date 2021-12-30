import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './AppModule';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } }));

    const env = app.get(ConfigService).get('app.env');

    if (env === 'development') {
        const swaggerDocumentConfig = new DocumentBuilder()
            .addBearerAuth()
            .setTitle('Geolocation API')
            .setDescription('API for geolocation CRUD operations with basic authorization and authentication')
            .setVersion('1.0')
            .addTag('auth')
            .addTag('geolocations')
            .build();

        const swaggerDocument = SwaggerModule.createDocument(app, swaggerDocumentConfig);

        SwaggerModule.setup('api/docs', app, swaggerDocument);
    }

    await app.listen(3000);
}

bootstrap();
