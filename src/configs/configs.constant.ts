const PORT = process.env.PORT || 4000;
const MESSAGES = {
    DATABASE: {
        CONNECTED: "MongoDB is connected :)",
        ERROR: "An error occured while connecting to database "
    }
}

export { PORT, MESSAGES }