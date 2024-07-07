// const allowedOrigins = require('./allowedOrigins')

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//    },
//    credentials: true,
//    optionsSuccessStatus: 200
// }

// module.exports = corsOptions


const corsOptions = {
  origin: 'https://qso-frontend.vercel.app', // Replace with your frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
  optionsSuccessStatus: 200 // For legacy browser support
};

module.exports = corsOptions;
