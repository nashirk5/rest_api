require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.APP_PORT || 4000;
const api = require('./api/api.router');

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use('/api', api);

// simple route
app.get('/', (req, res) => {
    res.json("Welcome to REST API");
})

// start nodejs server
app.listen(port, () => {
    console.log("Server is running on port: " + port);
});