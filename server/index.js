const express = require('express');
const routes = require('./routes/api');
const app = express();

app.use('/api', routes);

var port = process.env.port || 4000;
app.listen(port, function(req, res) {
    console.log("Listening on port " + port);
});