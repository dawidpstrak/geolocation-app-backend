import { Controller, Delete, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'mongodb';
import { GeolocationService } from 'src/services/GeolocationService';

@Controller()
@ApiTags('geolocations')
@ApiBearerAuth()
export class DeleteGeolocationController {
    constructor(private geolocationService: GeolocationService) {}

    @Delete('geolocations/:id')
    @ApiResponse({ status: 200, description: 'Request fulfilled successfully' })
    async invoke(@Param('id') id: string): Promise<DeleteResult> {
        return this.geolocationService.delete(id);
    }
}
