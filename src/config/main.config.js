import * as dotenv from 'dotenv';
dotenv.config();

const config = {
    database: process.env.MONGODB_URI,
    port: parseInt(process.env.PORT),
    services: {
        jwt: {
            secret: process.env.JWT_SECRET,
            expires: '2h'
        }
    }
}

export default config;