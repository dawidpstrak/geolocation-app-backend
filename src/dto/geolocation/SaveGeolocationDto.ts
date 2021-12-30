import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SaveGeolocationDto {
    @ApiProperty()
    @IsNotEmpty()
    ip: string;
}
