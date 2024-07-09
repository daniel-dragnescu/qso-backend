const { handleLogin } = require('../../controllers/authController');
const connectDB = require('../../config/dbConn');
const allowCors = require('../../config/allowCors'); // Import allowCors middleware

module.exports = allowCors(async (req, res) => { // Apply allowCors middleware
    // Ensure database connection is established
    await connectDB();

    // Handle OPTIONS method
    if (req.method === 'OPTIONS') {
        res.status(204).end();
        return;
    }

    // Handle POST method
    if (req.method === 'POST') {
        await handleLogin(req, res);
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
});
