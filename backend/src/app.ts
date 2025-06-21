import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import itemRoutes from './routes/itemRoutes.js';

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TODO: Add routes here
app.use('/api/items', itemRoutes);

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.message);
    res.status(500).json({ message: err.message });
});

export default app;
