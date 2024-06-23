/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorhandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'] }));

// test route
const test = (req: Request, res: Response) => {
  res.send('Hello World');
};
app.get('/', test);

// application routes
app.use('/api/v1', router);

// Global Error handler middleware
app.use(globalErrorhandler);

// Not found middleware
app.use(notFound);

export default app;
