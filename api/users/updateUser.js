const { updateUser } = require('../../controllers/updateUserController');
const connectDB = require('../../config/dbConn');
const allowCors = require('../../controllers/allowCors'); // Import allowCors middleware

await connectDB();

module.exports = allowCors(async (req, res) => {
    // Ensure database connection is established

    // Handle PATCH method
    if (req.method === 'PATCH') {
        updateUser(req, res);
    } else {
        res.setHeader('Allow', ['PATCH']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
});
