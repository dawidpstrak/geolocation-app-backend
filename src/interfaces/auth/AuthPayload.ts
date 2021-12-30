import { UserDocument } from 'src/schemas/User';

export interface AuthPayload {
    jwtToken: string;
    loggedUser: UserDocument;
}
