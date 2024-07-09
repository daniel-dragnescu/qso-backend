const { handleRegister } = require('../../controllers/registerController');
const connectDB = require('../../config/dbConn');
const allowCors = require('../../config/allowCors'); // Adjust the path as per your actual file location

module.exports = allowCors(async (req, res) => {
    // Ensure database connection is established
    await connectDB();

    // Handle POST method
    if (req.method === 'POST') {
        await handleRegister(req, res);
    } else if (req.method === 'OPTIONS') {
        // Handle OPTIONS method separately if needed
        res.status(204).end();
    } else {
        res.setHeader('Allow', ['POST', 'OPTIONS']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
});
