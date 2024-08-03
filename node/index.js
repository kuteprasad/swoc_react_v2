import express from 'express';
import pg from 'pg';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import session from 'express-session';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const { Client } = pg;

const client = new Client({
  user: 'postgres',
  host: 'db',
  database: 'test_db',
  password: '1234',
  port: 5432,
});
client.connect();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await client.query(`SELECT * FROM users WHERE email = $1`, [profile.emails[0].value]);
    if (!user.rows.length) {
      await client.query(
        `INSERT INTO users (email, acc_type, password_hash) VALUES ($1, $2, $3)`,
        [profile.emails[0].value, 'google', null]
      );
      user = await client.query(`SELECT * FROM users WHERE email = $1`, [profile.emails[0].value]);
    }
    return done(null, user.rows[0]);
  } catch (error) {
    return done(error);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
  try {
    const user = await client.query(`SELECT * FROM users WHERE email = $1`, [email]);
    done(null, user.rows[0]);
  } catch (error) {
    done(error);
  }
});

// Home route
app.get('/api', (req, res) => res.send('This is the main Dashboard page...'));

// Register a new user
app.post('/api/register', async (req, res) => {
  try {
    const { email, acc_type, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const response = await client.query(
      `INSERT INTO users(email, acc_type, password_hash) VALUES ($1, $2, $3)`,
      [email, acc_type, hashedPassword]
    );

    if (response) {
      res.status(200).send('User registered successfully');
    }
  } catch (error) {
    res.status(500).send('Error registering user');
    console.log(error);
  }
});

// Sign in a user
app.post('/api/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await client.query(`SELECT * FROM users WHERE email = $1`, [email]);

    if (response.rows.length > 0) {
      const user = response.rows[0];
      const validPassword = await bcrypt.compare(password, user.password_hash);

      if (validPassword) {
        res.status(200).send('Login successful');
      } else {
        res.status(401).send('Invalid credentials');
      }
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send('Error signing in');
    console.log(error);
  }
});

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const response = await client.query(`SELECT * FROM users`);
    res.status(200).send(response.rows);
  } catch (error) {
    res.status(500).send('Error retrieving users');
    console.log(error);
  }
});

// Google authentication routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/usernotfound' }),
  (req, res) => {
    res.redirect('/'); // Redirect to home page after successful login
  }
);

// User not found route
app.use((req, res, next) => {
  res.status(404).send('User not found');
});

app.listen(3000, () => console.log(`App running on port 3000.`));
