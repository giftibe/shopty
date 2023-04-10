declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            SESSION_KEY: string;
            NODE_ENV: 'development' | 'production'
            secret: string;
        }

    }
}

export { }