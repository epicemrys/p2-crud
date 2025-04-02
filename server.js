const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const port = process.env.PORT || 9090;
const app = express();


app.use(express.json());
app.use(bodyParser.json())
app.use(session({ secret: "secret", resolve: false, resave: false, saveUninitialized: true, store: new express - session.MemoryStore() }));


app.use(passport.initialize())
app.use(passport.session())
app.use((req, res, next) => {
    res.setHeader('Access-control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}));

app.use('/', require('./routes/index.js'));


process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});



passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
    function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        return done(null, profile);
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => {
    let message = req.query.message;
    let loginMessage = req.session.user !== undefined
        ? `You are now logged in as ${req.session.user.displayName}`
        : "Welcome to Match Maker";
    res.send(`
        <div>
            ${loginMessage}
            ${message ? `<div>${message}</div>` : ''}
        </div>
    `);
});

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: 'api-docs',
    session: false
}),
(req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    }
    else {
        app.listen(port, () => { console.log(`Database = Active | node Running on port ${port}`) });
    }
});