const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const records = require('./pages/records');
const app = express();
const database = require('./utils/database');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
database.initialiseDB();

app.use('/records', records)

const siteDirectory = __dirname + '/build/';
app.use('/', express.static(siteDirectory));

const PORT = (process.env.PORT || 5000);
app.listen(PORT, () => console.log(`node listening on port ${PORT}`));