import express from 'express';
import connectDB from './utils/db';
// import authRoutes from './routes/auth.routes';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const HOST = process.env.HOSTNAME;
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// app.use('/api/v1/auth', authRoutes);

connectDB().catch((err) => {
	console.error('Database connection error:', err);
});

app.listen(PORT, HOST!, () => {
	console.log(`Server is running on http://${HOST}:${PORT}`);
});
