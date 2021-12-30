import { AuthCredentialsDto } from 'src/dto/auth/AuthCredentialsDto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { AuthPayload } from 'src/interfaces/auth/AuthPayload';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/schemas/User';

@Injectable()
export class LoginHandler {
    constructor(
        @InjectModel('users') private readonly userModel: Model<UserDocument>,
        private readonly configService: ConfigService
    ) {}

    async handle({ email, password }: AuthCredentialsDto): Promise<AuthPayload> {
        const user = await this.userModel.findOne({ email }).select('password').exec();

        if (!user || !(await compare(password, user.password))) {
            throw new UnauthorizedException();
        }

        const { JWTSecret, JWTExpirationTimeInMinutes } = this.configService.get('app');

        const loggedUser = await this.userModel.findOne({ email }).exec();

        const jwtToken = await sign({ loggedUser }, JWTSecret, {
            expiresIn: `${JWTExpirationTimeInMinutes}m`
        });

        return {
            loggedUser,
            jwtToken
        };
    }
}
