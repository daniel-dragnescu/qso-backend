const { createNewQso, getAllQso, updateQso, deleteQso } = require('../../controllers/qsoController');
const connectDB = require('../../config/dbConn');
const allowCors = require('../../config/allowCors'); // Import the modified corsOptions

module.exports = allowCors(async (req, res) => {
    // Ensure database connection is established
    await connectDB();

    const { method } = req;

    // Set CORS headers (Note: You can remove these from here if they are set in corsOptions)
    // res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle OPTIONS method
    if (method === 'OPTIONS') {
        res.status(204).end();
        return;
    }

    // Handle GET method
    if (method === 'GET') {
        await getAllQso(req, res);
        return;
    }

    // Handle POST method
    if (method === 'POST') {
        await createNewQso(req, res);
        return;
    }

    // Handle PATCH method
    if (method === 'PATCH') {
        await updateQso(req, res);
        return;
    }

    // Handle DELETE method
    if (method === 'DELETE') {
        await deleteQso(req, res);
        return;
    }

    // Handle unsupported methods
    res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
});
