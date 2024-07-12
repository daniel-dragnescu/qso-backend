// api/auth/register.js

const { handleRegister } = require('../../controllers/registerController');
const connectDB = require('../../config/dbConn');
const allowCors = require('../../config/allowCors');

const handler = async (req, res) => {
  // Ensure database connection is established
  await connectDB();

  // Handle POST method
  if (req.method === 'POST') {
    await handleRegister(req, res);
  } else if (req.method === 'OPTIONS') {
    // Handle OPTIONS method for CORS preflight
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['POST', 'OPTIONS']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

module.exports = allowCors(handler);
