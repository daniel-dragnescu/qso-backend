const allowCors = (handler) => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*'); // Change '*' to your frontend domain for production
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, X-CSRF-Token, X-Requested-With, Accept, Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  return handler(req, res);
};

module.exports = allowCors;
