import express from 'express';
import 'dotenv/config';

import connectDB from './config/db';
import authRoutes from './routes/auth.routes';
import prescriptionRoutes from './routes/prescription.routes';
import messageRoutes from './routes/message.routes';
import loggerMiddleware from './middlewares/logger.middleware';
import { loadModels } from './utils/aiModal';

const app = express();
const HOST = process.env.HOSTNAME;
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(loggerMiddleware);

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/prescription', prescriptionRoutes);
app.use('/api/v1/messages', messageRoutes);

connectDB().catch((err) => {
	console.error('Database connection error:', err);
});

loadModels().catch((err) => {
	console.error('AI model loading error:', err);
});

app.get('/test', (req, res) => {
	res.status(200).json('Server is running');
});

app.use('/*', (req, res) => {
	res.status(404).json('Invalid URL');
});

app.listen(PORT, HOST!, () => {
	console.log(`Server is running on http://${HOST}:${PORT}`);
});
