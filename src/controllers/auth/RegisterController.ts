import { Post, Controller, Body } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterUserDto } from 'src/dto/auth/RegisterUserDto';
import { RegisterHandler } from 'src/services/auth/RegisterHandler';

@Controller('auth')
@ApiTags('auth')
export class RegisterController {
    constructor(private readonly registerHandler: RegisterHandler) {}

    @Post('register')
    @ApiResponse({ status: 201, description: 'User registered successfully' })
    @ApiResponse({ status: 400, description: 'User with that email already exists' })
    async invoke(@Body() registerUserDto: RegisterUserDto) {
        return this.registerHandler.handle(registerUserDto);
    }
}
