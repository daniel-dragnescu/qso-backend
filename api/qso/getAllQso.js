// api/qso/getAllQso.js

const { getAllQso } = require('../../controllers/qsoController');
const connectDB = require('../../config/dbConn');
const allowCors = require('../../controllers/allowCors');

module.exports = allowCors(async (req, res) => {
  await connectDB();

  if (req.method === 'GET') {
    await getAllQso(req, res);
  } else if (req.method === 'OPTIONS') {
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'OPTIONS']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});
