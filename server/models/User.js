import mongoose from 'mongoose';

// USER SCHEMA

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    collection: 'usersDb',
});

const User = mongoose.model('User', userSchema);

export default User;
