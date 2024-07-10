const { handleRegister } = require('../../controllers/registerController');
const connectDB = require('../../config/dbConn');
const allowCors = require('../../config/allowCors'); // Adjust the path as per your actual file location

module.exports = allowCors((req, res) => {
    // Ensure database connection is established
    connectDB()
        .then(() => {
            if (req.method === 'POST') {
                return handleRegister(req, res);
            } else if (req.method === 'OPTIONS') {
                // Handle OPTIONS method separately if needed
                res.status(204).end();
            } else {
                res.setHeader('Allow', ['POST', 'OPTIONS']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
            }
        })
        .catch((err) => {
            console.error('Database connection error:', err.message);
            res.status(500).json({ message: 'Internal Server Error' });
        });
});
