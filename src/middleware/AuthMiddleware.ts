import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly configService: ConfigService) {}

    async use(request, response: Response, next: NextFunction) {
        const bearerToken = request?.headers['authorization'];

        if (bearerToken) {
            const token = bearerToken.split(' ')[1];
            const { JWTSecret } = this.configService.get('app');

            verify(token, JWTSecret, (err, payload) => {
                if (err) {
                    throw new ForbiddenException();
                }
                const { loggedUser } = payload;

                request.loggedUser = loggedUser;

                next();
            });
        } else {
            throw new ForbiddenException();
        }
    }
}
