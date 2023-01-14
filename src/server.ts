import cookieParser from 'cookie-parser';
import express, { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from 'http-status-codes';
import morgan from 'morgan';

import logger from './shared/logger';
import BaseRouter from './routes';
import passport from 'passport';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(morgan('dev'));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message, err);
  return res.status(BAD_REQUEST).json({
      error: err.message,
  });
});

app.use(passport.initialize());

// Add APIs
app.use('/api', BaseRouter);

// Export express instance
export default app;