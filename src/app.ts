/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorhandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

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
