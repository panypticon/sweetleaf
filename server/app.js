import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import mongoose from 'mongoose';
import createError from 'http-errors';
import passport from 'passport';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.js';

//// Fix __dirname for ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
app.use([express.json(), cookieParser(), cors(), passport.initialize()]);
NODE_ENV === 'development' && app.use(morgan('dev'));
NODE_ENV !== 'development' && app.use([helmet(), compression()]);

// Routes
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/api/v1/users', usersRouter);

// 404 for non-existent routes
app.use((_req, _res, next) => next(createError(404, 'Resource not found')));

// Error handler
app.use((err, _req, res, _next) => {
    const error = {
        status: err.status || 500,
        title: err.status ? err.message : 'Server error',
        detail: []
    };

    switch (err.constructor.name) {
        case 'SyntaxError':
            error.title = 'Invalid JSON';
            break;
        case 'MongoServerError':
            if (err.code === 11000) {
                error.title = 'Validation errors';
                error.detail = ['email', 'Email is already registered'];
            }
            break;
        case 'ValidationError':
            error.status = 400;
            error.title = 'Validation errors';
            error.detail = Object.entries(err.errors).reduce(
                (errors, [key, error]) => [...errors, [key, error.message]],
                []
            );
            break;
    }
    res.status(err.status || 500).send(error);
});
