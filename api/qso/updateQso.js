// api/qso/updateQso.js

const { updateQso } = require('../../controllers/qsoController');
const connectDB = require('../../config/dbConn');
const allowCors = require('../../controllers/allowCors');

module.exports = allowCors(async (req, res) => {
  await connectDB();

  if (req.method === 'PATCH') {
    updateQso(req, res);
  } else if (req.method === 'OPTIONS') {
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['PATCH', 'OPTIONS']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});
