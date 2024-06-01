import { NextFunction, Request, RequestHandler, Response } from "express";

// Higher Order Function --> to simplify code. Avoid repeatation of TryCatch function, use CatchAsync
const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

export default catchAsync;
