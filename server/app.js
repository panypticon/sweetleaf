import express from 'express';
import dotenv from 'dotenv';

// Base config
dotenv.config();
const app = express();
const port = process.env.PORT;

app.get('/', (_, res) => res.send('Hello world'));

// Starting server
app.listen(port, () => console.log(`Express running on port ${port}`));
