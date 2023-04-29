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
    },

    USER: {
        CREATED: "User account created successfully",
        ERROR: "An error occured",
        DUPLICATE_EMAIL: "Email already exists",
        DUPLICATE_USERNAME: "Username already exists",
        REGISTERED: "Registration successful",
        EMAIL_NOTFOUND: 'Email not found',
        LOGGEDIN: 'Logged in successfully',
        W_PASSWORD: 'Wrong password',
        INCORRECT_DETAILS: 'Invalid credentials',
        ACCOUNT_NOT_REGISTERED: 'Account not registered',
        LOGGEDOUT: 'successfully loggedout',
        ACCOUNT_DELETED: 'Account deleted',
        NOT_ACCOUNT_DELETED: 'Unable to delete another user account',
        ACCOUNT_UPDATED: 'Account updated successfully',
        NOT_UPDATED: 'Account updated unsuccessful',
        UNAUTHORIZED: 'Unauthorized access',

    },

    PRODUCT: {
        ADDED: 'Product added successfully',
        UNAUTHORIZED: 'Unauthorized access',
        ERROR: "An error occured",
        RETRIEVED: 'Products retrieved successfully',
        NO_ITEM: 'No such product was found',
        UPDATED: 'Product updated successfully',
        DELETED: 'Product deleted successfully'
    },

    CATEGORY: {
        UNAUTHORIZED: 'Unauthorized access',
        CREATED: 'Category created successfully',
        N_CREATED: 'Category already exists',
        ABSENT: 'Field does not exist',
        DELETED: 'Field was deleted successfully',
        ERROR: 'An error occurred',
        UPDATED: 'Category updated successfully',
        EMPTY: 'No categories was found'



    }


}

export { PORT, ENUM, MESSAGES }