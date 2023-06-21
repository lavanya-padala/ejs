const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const ejs = require('ejs');
const path=require("path")
const app=express()
app.use(express.json());

// Middleware for parsing URL-encoded form data
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/views")));
// Set the view engine to use EJS
app.set('view engine', 'ejs');
const { connectDB } = require('./config/db');
const bodyParser = require('body-parser');

app.use(express.json());

const userRoutesV1 = require('./routes/v1/user.route');

const rateLimit =  require('express-rate-limit');

const limiter = rateLimit({
	windowMs: 30 * 1000, // 30 seconds
	max: 10000, // Limit each IP to 100 requests per `window` (here, per 30 seconds)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})


dotenv.config();

connectDB();

app.use(express.json());

app.use(limiter)

app.use(cors());
app.options('*', cors());

app.get('/', (req, res) => {
  res.render("homepage");
});

app.use('/api/v1/users/', userRoutesV1);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on Port ${PORT}`.green.bold));
