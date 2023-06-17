const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const router = require('./API/Router');

require('dotenv').config({ path: path.join(__dirname, '.env') });
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || '5000';
const databaseURI = process.env.DATABASE_URI;

// Connect to MongoDB, exceptoin needed to be handled later
mongoose.connect(databaseURI);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/static', express.static('Public'));

router(app);

app.listen(port, host, () => {
    console.log(`Server is running at http://${host}:${port}`);
});
