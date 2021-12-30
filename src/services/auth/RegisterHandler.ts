import { RegisterUserDto } from 'src/dto/auth/RegisterUserDto';
import { Injectable, BadRequestException } from '@nestjs/common';
import { hash, genSalt } from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/schemas/User';

@Injectable()
export class RegisterHandler {
    constructor(@InjectModel('users') private readonly userModel: Model<UserDocument>) {}

    async handle({ email, password }: RegisterUserDto): Promise<UserDocument> {
        const existingUser = await this.userModel.findOne({ email }).exec();

        if (existingUser) {
            throw new BadRequestException('User with that email already exist');
        }

        const hashedPassword = await hash(password, await genSalt());

        await this.userModel.create({ email, password: hashedPassword });

        return this.userModel.findOne({ email }).exec();
    }
}
