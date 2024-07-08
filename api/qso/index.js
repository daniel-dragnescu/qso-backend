const { createNewQso, getAllQso, updateQso, deleteQso } = require('../../controllers/qsoController');
const connectDB = require('../../config/dbConn');

module.exports = async (req, res) => {
    // Ensure database connection is established
    await connectDB();

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle OPTIONS method
    if (req.method === 'OPTIONS') {
        res.status(204).end();
        return;
    }

    const { method, params } = req;

    switch (method) {
        case 'GET':
            if (params.id) {
                req.query = { ...req.query, id: params.id };
                return await updateQso(req, res);
            } else {
                return await getAllQso(req, res);
            }
        case 'POST':
            return await createNewQso(req, res);
        case 'PATCH':
            return await updateQso(req, res);
        case 'DELETE':
            return await deleteQso(req, res);
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
};
