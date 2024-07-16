const { handleRegister } = require('../../controllers/registerController');
const connectDB = require('../../config/dbConn');
const allowCors = require('../../controllers/allowCors'); // Assuming allowCors is middleware

const handler = async (req, res) => {
    // Connect to the database
    await connectDB();
  
    if (req.method === 'POST') {
      return handleRegister(req, res);
    } else if (req.method === 'OPTIONS') {
      return res.status(204).end();
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  };
  
  module.exports = allowCors(handler);