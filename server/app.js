import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import mongoose from 'mongoose';

import usersRouter from './routes/users.js';

//// Environment config
dotenv.config();
const { PORT, NODE_ENV, DB_URL } = process.env;

//// Mongoose
try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(DB_URL);
    console.log(`Connected to MongoDB on ${mongoose.connection.host}:${mongoose.connection.port}`);
    mongoose.connection.on('error', err => console.log(err));
} catch (err) {
    console.log(err);
}

//// Express
const app = express();
app.listen(PORT, () => console.log(`Express server running on port ${PORT}`));

// Middleware
app.use([express.json(), helmet(), cors(), compression()]);
NODE_ENV === 'development' && app.use(morgan('dev'));

// Routes
app.use('/api/v1/users', usersRouter);

// Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err);
});
