import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IndexGeolocationDto } from 'src/dto/geolocation/IndexGeolocationDto';
import { GeolocationService } from 'src/services/GeolocationService';

@Controller()
@ApiTags('geolocations')
@ApiBearerAuth()
export class IndexGeolocationController {
    constructor(private geolocationService: GeolocationService) {}

    @Get('geolocations')
    @ApiResponse({ status: 200, description: 'Request fulfilled successfully' })
    invoke(@Query() { ip, skip, limit }: IndexGeolocationDto) {
        if (ip) {
            return this.geolocationService.getAllByIp({ ip, skip, limit });
        }

        return this.geolocationService.getAll({ skip, limit });
    }
}
