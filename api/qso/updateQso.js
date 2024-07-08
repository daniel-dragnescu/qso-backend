const { updateQso } = require('../../controllers/qsoController');
const connectDB = require('../../config/dbConn');

module.exports = async (req, res) => {
    // Ensure database connection is established
    await connectDB();

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.setHeader('Access-Control-Allow-Methods', 'PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle OPTIONS method
    if (req.method === 'OPTIONS') {
        res.status(204).end();
        return;
    }

    // Handle PATCH method
    if (req.method === 'PATCH') {
        await updateQso(req, res);
    } else {
        res.setHeader('Allow', ['PATCH']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
