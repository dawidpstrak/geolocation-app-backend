import { ApiProperty } from '@nestjs/swagger';

export class IndexGeolocationDto {
    @ApiProperty({ required: false })
    ip?: string;

    @ApiProperty({ required: false })
    skip?: number;

    @ApiProperty({ required: false })
    limit?: number;
}
