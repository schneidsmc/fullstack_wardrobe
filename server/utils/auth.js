import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
};

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}