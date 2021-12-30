import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginController } from 'src/controllers/auth/LoginController';
import { RegisterController } from 'src/controllers/auth/RegisterController';
import { UserSchema } from 'src/schemas/User';
import { LoginHandler } from 'src/services/auth/LoginHandler';
import { RegisterHandler } from 'src/services/auth/RegisterHandler';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'users', schema: UserSchema }])],
    controllers: [RegisterController, LoginController],
    providers: [RegisterHandler, LoginHandler]
})
export class AuthModule {}
