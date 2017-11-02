const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

var server = app.listen(8080, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});