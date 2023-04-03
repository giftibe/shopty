const PORT = process.env.PORT;

const ENUM = {
    ADMIN: 'admin',
    SELLER: 'seller',
    BUYER: 'buyer',
}
const MESSAGES = {
    DATABASE: {
        CONNECTED: "MongoDB is connected :)",
        ERROR: "An error occured while connecting to database "
    }
}

export { PORT, ENUM, MESSAGES }