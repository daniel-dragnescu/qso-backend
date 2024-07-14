// api/qso/deleteQso.js

const { deleteQso } = require('../../controllers/qsoController');
const connectDB = require('../../config/dbConn');
const allowCors = require('../../controllers/allowCors');

await connectDB();

module.exports = allowCors(async (req, res) => {

  if (req.method === 'DELETE') {
    deleteQso(req, res);
  } else if (req.method === 'OPTIONS') {
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['DELETE', 'OPTIONS']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});
