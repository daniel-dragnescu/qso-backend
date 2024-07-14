const { handleRegister } = require('../../controllers/registerController');
const connectDB = require('../../config/dbConn');
const allowCors = require('../../controllers/allowCors'); // Assuming allowCors is middleware

module.exports = allowCors(async (req, res) => {
  await connectDB();

  // Handle OPTIONS method
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  // Handle POST method
  if (req.method === 'POST') {
    handleRegister(req, res);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});