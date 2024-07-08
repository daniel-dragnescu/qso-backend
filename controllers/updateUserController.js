const User = require('../models/User');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');

const handleUpdateUser = async (userId, { email, password }) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found.');
        }

        if (email) {
            user.email = email;
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        await user.save();

        return { message: 'User updated successfully.', user };

    } catch (error) {
        throw new Error(`An error occurred while updating the user: ${error.message}`);
    }
};

const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { email, password } = req.body;

    try {
        const result = await handleUpdateUser(id, { email, password });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = {
    updateUser
};
