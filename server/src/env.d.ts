declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    SESSION_SECRET: string;
    DATABASE_URL: string;
    REDIS_URL: string;
    REDIS_HOST: string;
    REDIS_PORT: string;
    REDIS_PORT: string;
    CORS_ORIGIN: string;
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_KEY: string;
    CLOUDINARY_SECRET: string;
    CLOUDINARY_FOLDER: string;
    COOKIE_DOMAIN: string;
  }
}