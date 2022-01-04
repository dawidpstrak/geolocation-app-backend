import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IndexGeolocationDto } from 'src/dto/geolocation/IndexGeolocationDto';
import { IIndexGeolocations } from 'src/interfaces/geolocations/IIndexGeolocations';
import { GeolocationDocument } from 'src/schemas/Geolocation';
import { GeolocationService } from 'src/services/GeolocationService';

@Controller()
@ApiTags('geolocations')
@ApiBearerAuth()
export class IndexGeolocationController {
    constructor(private geolocationService: GeolocationService) {}

    @Get('geolocations')
    @ApiResponse({ status: 200, description: 'Request fulfilled successfully' })
    invoke(
        @Query() { ip, skip, limit, order, sort, searchTerm }: IndexGeolocationDto
    ): Promise<GeolocationDocument[] | IIndexGeolocations> {
        if (ip) {
            return this.geolocationService.getAllByIp({ ip, skip, limit, order, sort, searchTerm });
        }

        return this.geolocationService.getAll({ skip, limit, order, sort, searchTerm });
    }
}
