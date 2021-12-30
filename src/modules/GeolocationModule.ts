import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SaveGeolocationController } from 'src/controllers/geolocation/SaveController';
import { GeolocationSchema } from 'src/schemas/Geolocation';
import { AxiosFactory } from 'src/providers/AxiosFactory';
import { GeolocationService } from 'src/services/GeolocationService';
import { IndexGeolocationController } from 'src/controllers/geolocation/IndexController';
import { DeleteGeolocationController } from 'src/controllers/geolocation/DeleteController';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'geolocations', schema: GeolocationSchema }])],
    controllers: [SaveGeolocationController, IndexGeolocationController, DeleteGeolocationController],
    providers: [GeolocationService, AxiosFactory]
})
export class GeolocationModule {}
