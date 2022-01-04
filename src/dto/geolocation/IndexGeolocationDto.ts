import { ApiProperty } from '@nestjs/swagger';

export class IndexGeolocationDto {
    @ApiProperty({ required: false })
    ip?: string;

    @ApiProperty({ required: false })
    skip?: number;

    @ApiProperty({ required: false })
    limit?: number;

    @ApiProperty({ required: false })
    order?: string;

    @ApiProperty({ required: false })
    sort?: string;

    @ApiProperty({ required: false })
    searchTerm?: string;
}
