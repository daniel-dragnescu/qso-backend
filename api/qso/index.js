const { createNewQso, getAllQso, updateQso, deleteQso } = require('../../controllers/qsoController');
const connectDB = require('../../config/dbConn');

module.exports = async (req, res) => {
    // Ensure database connection is established
    await connectDB();

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle OPTIONS method
    if (req.method === 'OPTIONS') {
        res.status(204).end();
        return;
    }

    // Handle GET method
    if (req.method === 'GET') {
        await getAllQso(req, res);
    }

    // Handle POST method
    else if (req.method === 'POST') {
        await createNewQso(req, res);
    }

    // Handle PATCH method
    else if (req.method === 'PATCH') {
        await updateQso(req, res);
    }

    // Handle DELETE method
    else if (req.method === 'DELETE') {
        await deleteQso(req, res);
    }

    // Handle unsupported methods
    else {
        res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
