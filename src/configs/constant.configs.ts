const PORT = process.env.PORT;

const ENUM = {
    ADMIN: 'admin',
    SELLER: 'seller',
    BUYER: 'buyer',
};
const MESSAGES = {
    DATABASE: {
        CONNECTED: 'MongoDB is connected :)',
        ERROR: 'An error occured while connecting to database ',
    },

    USER: {
        CREATED: 'User account created successfully',
        ERROR: 'An error occured',
        DUPLICATE_EMAIL: 'Email already exists',
        DUPLICATE_USERNAME: 'Username already exists',
        REGISTERED: 'Registration successful',
        EMAIL_NOTFOUND: 'Email not found',
        PASSWORD_NOTFOUND: 'Wrong password',
        LOGIN: 'Login successful'
    },
};

export { PORT, ENUM, MESSAGES };
