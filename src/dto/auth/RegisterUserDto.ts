import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { match } from 'src/validators/matchValidator';

export class RegisterUserDto {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message:
            'Password must contains at least 1 upper case letter, 1 lower case letter and 1 number or special character'
    })
    password: string;

    @ApiProperty()
    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @match('password', { message: 'Passwords are not equal' })
    passwordRepeat: string;
}
