import { AuthCredentialsDto } from 'src/dto/auth/AuthCredentialsDto';
import { Post, Controller, Body, HttpCode } from '@nestjs/common';
import { LoginHandler } from 'src/services/auth/LoginHandler';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthPayload } from 'src/interfaces/auth/AuthPayload';

@Controller('auth')
@ApiTags('auth')
export class LoginController {
    constructor(private readonly loginHandler: LoginHandler) {}

    @Post('login')
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'User logged in successfully' })
    @ApiResponse({ status: 401, description: 'User failed to authorize' })
    async invoke(@Body() authCredentialsDto: AuthCredentialsDto): Promise<AuthPayload> {
        return this.loginHandler.handle(authCredentialsDto);
    }
}
