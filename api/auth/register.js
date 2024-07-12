// api/auth/register.js

const { handleRegister } = require('../../controllers/registerController');
const connectDB = require('../../config/dbConn');
const allowCors = require('../../controllers/allowCors');

module.exports = allowCors(async (req, res) => {
    await connectDB();
    handleRegister(req, res);
  });
