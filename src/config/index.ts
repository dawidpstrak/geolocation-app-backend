import { config } from 'dotenv';

config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const env = (key: string | number, defaultValue = null) => process.env[key] || defaultValue;

export default () => ({
    app: {
        env: env('NODE_ENV'),
        JWTSecret: env('JWT_SECRET'),
        JWTExpirationTimeInMinutes: env('JWT_EXPIRATION_TIME_IN_MINUTES')
    },
    mongodb: {
        uri: `mongodb://${env('MONGODB_USERNAME')}:${env('MONGODB_PASSWORD')}@${env('MONGODB_HOST')}:${env(
            'MONGODB_PORT'
        )}/${env('MONGO_INITDB_DATABASE')}`
    },
    ipStack: {
        baseURL: env('IPSTACK_API_BASE_URL'),
        apiKey: env('IPSTACK_API_KEY')
    }
});
