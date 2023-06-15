const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');

const { connectDB } = require('./config/db');

const userRoutesV1 = require('./routes/v1/user.route');

const rateLimit =  require('express-rate-limit');

const limiter = rateLimit({
	windowMs: 30 * 1000, // 30 seconds
	max: 10000, // Limit each IP to 100 requests per `window` (here, per 30 seconds)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

const app = express();

dotenv.config();

connectDB();

app.use(express.json());

app.use(limiter)

app.use(cors());
app.options('*', cors());

app.get('/', (req, res) => {
  res.send('Server is running....');
});

app.use('/api/v1/users/', userRoutesV1);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on Port ${PORT}`.green.bold));
