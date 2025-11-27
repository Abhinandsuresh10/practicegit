import express from 'express'
import crudRoutes from './src/routes/crud.routes.js';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import cors from 'cors'

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ["POST", "PUT", "DELETE", "GET", "OPTIONS"]
}))

app.use(express.json());

connectDB();

app.use((req, res, next) => {
    console.log('hello', req.url, req.method);
    next()
})

const PORT = process.env.PORT || 5000;

app.use('/api', crudRoutes);

app.listen(PORT,() => {
    console.log(`server is running at port http://localhost:5000`)
});