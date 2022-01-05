require('dotenv').config()
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const User = require('./models/user')
const { reset } = require('nodemon')

// configure express
const app = express()
app.use(express.json())

// connect to mongo db
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('connected to db');
});

app.get('/ping', (req, res) => {
    res.send("pong");
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`app started on port ${PORT}`);
})