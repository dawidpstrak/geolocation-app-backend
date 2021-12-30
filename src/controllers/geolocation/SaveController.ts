import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SaveGeolocationDto } from 'src/dto/geolocation/SaveGeolocationDto';
import { GeolocationService } from 'src/services/GeolocationService';

@Controller()
@ApiTags('geolocations')
@ApiBearerAuth()
export class SaveGeolocationController {
    constructor(private geolocationService: GeolocationService) {}

    @Post('geolocations')
    @ApiResponse({ status: 201, description: 'Geolocation saved successfully' })
    invoke(@Body() { ip }: SaveGeolocationDto) {
        return this.geolocationService.save(ip);
    }
}
