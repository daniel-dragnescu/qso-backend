// api/qso/updateQso.js

const { updateQso } = require('../../controllers/qsoController');
const connectDB = require('../../config/dbConn');
const allowCors = require('../../config/allowCors');

module.exports = allowCors(async (req, res) => {
  await connectDB();

  if (req.method === 'PATCH') {
    await updateQso(req, res);
  } else if (req.method === 'OPTIONS') {
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['PATCH', 'OPTIONS']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});
