import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';

const loginUser = async (payload: TLoginUser) => {
  // checking if the user exist
  const isUserExist = await User.findOne({ id: payload?.id });
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // checking if the user already deleted
  const isUserDeleted = isUserExist?.isDeleted;
  if (isUserDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted');
  }

  // checking if the user is blocked
  const userStatus = isUserExist?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
  }

  // Access Granted: send AccessToken, RefreshToken

  return {};
};

export const authServices = {
  loginUser,
};
