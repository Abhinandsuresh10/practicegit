import express from 'express'
import crudRoutes from './src/routes/crud.routes.js';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';

dotenv.config();

const app = express();

app.use(express.json());

connectDB()

const PORT = process.env.PORT || 5000;

app.use('/api', crudRoutes);

app.listen(PORT,() => {
    console.log(`server is running at port http://localhost:5000`)
});