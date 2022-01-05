require('dotenv').config()
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const User = require('./models/user')
const { TokenExpiredError } = require('jsonwebtoken')

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

app.post('/register', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // check if user exists
    const userExists = await User.findOne({username: username});
    if(userExists) {
        return res.status(400).send("Username already exists!");
    }
    
    const newUser = new User({
        username: username,
        password: await bcrypt.hash(password, 10)
    });

    newUser.save()
        .then(doc => res.sendStatus(201))
        .catch(err => {
            const errMsg = `error while saving user ${username} to db: ${err}`;
            console.log(errMsg);
            res.status(500).send(errMsg);
        });
    
});

app.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // check credentials
    const user = await User.findOne({ username: username });
    if(!user) {
        return res.status(404).send('Username doesn\'t exist');
    }
    if(!await bcrypt.compare(password, user.password)) {
        return res.status(401).send('Password is wrong');
    }

    // generate jwt
    const tokenData = {
        username: user.username
    };

    res.status(200).json({
        "token": jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '24h'})
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`app started on port ${PORT}`);
})