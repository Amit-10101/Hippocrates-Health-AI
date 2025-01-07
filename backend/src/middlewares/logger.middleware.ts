import winston from 'winston';
import morgan, { StreamOptions } from 'morgan';

// Create a Winston logger instance
const logger = winston.createLogger({
	level: 'info',
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.printf(({ timestamp, level, message }) => {
			return `${timestamp} [${level}]: ${message}`;
		})
	),
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: 'logs/app.log' }),
	],
});

const stream: StreamOptions = {
	write: (message) => logger.info(message.trim()),
};

const loggerMiddleware = morgan('combined', { stream });

export default loggerMiddleware;
