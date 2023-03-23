import * as dotenv from "dotenv";

dotenv.config()

export default {
    DatabasePassword: process.env.DATABASE_PASSWORD,
    DatabasePort: process.env.DATABASE_PORT,
    DatabaseName: process.env.DATABASE_NAME,
    DatabaseURL: process.env.DATABASE_URL,
    DatabaseUser: process.env.DATABASE_USER,
    TokenSecret: process.env.TOKEN_SECRET,
}