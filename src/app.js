const express = require('express');
const {handleSearch, getData} = require('./logic');

const app = express();
app.use(express.static('build'))
app.use(express.json());

app.get('/search',handleSearch)
app.get('/data',getData);

module.exports = {app};