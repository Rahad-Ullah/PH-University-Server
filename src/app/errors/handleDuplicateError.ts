/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (
  err: any,
): TGenericErrorResponse => {
    const errorSources: TErrorSources = Object.keys(err.keyValue).map(value => {
        return {
            path: value,
            message: `${err.keyValue[value]} is already exist`,
        }
    })
    
  const statusCode = 400;

  return {
    statusCode,
    message: 'Duplicate Error',
    errorSources,
  };
};

export default handleDuplicateError;