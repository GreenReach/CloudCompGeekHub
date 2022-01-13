require('dotenv').config()
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const promMiddleware = require('express-prometheus-middleware')
const cors = require('cors')

const User = require('./models/user')
const { TokenExpiredError } = require('jsonwebtoken')

// configure express
const app = express()
app.use(cors())
app.options('*', cors())
app.use(express.json())

// configure prometheus middleware
app.use(promMiddleware({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
    requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
    responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400]
}));

// connect to mongo db
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('connected to db');
});

app.get('/ping', (req, res) => {
    res.send("pong v1.0");
})

app.post('/register', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(!username || !password) {
        return res.status(400).send("Request must contain username and password fields");
    }


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

    if(!username || !password) {
        return res.status(400).send("Request must contain username and password fields");
    }

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

app.post('/me', async (req, res) => {
    const token = req.body.token;

    if(!token) {
        return res.status(400).send("Request must contain token field");
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, tokenData) => {
        if(err) {
            return res.status(401).send("Token is wrong");
        }

        const correspondingUser = await User.findOne({username: tokenData.username});
        if(!correspondingUser) {
            return res.status(404).send("User not found");
        }

        return res.status(200).json(tokenData);
    });
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`app started on port ${PORT}`);
})