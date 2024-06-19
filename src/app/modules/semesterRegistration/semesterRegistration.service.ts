import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import { AcademicSemester } from '../academicSemester/academicSemester.model';

// create new semester registration
const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  // check if there any registered semester that is already 'UPCOMING' | 'ONGOING'
  const isAnyUpcomingOrOngoingSemester = await SemesterRegistration.findOne({
    $or: [{status: 'UPCOMING'}, {status: 'ONGOING'}]
  });

  if(isAnyUpcomingOrOngoingSemester){
    throw new AppError(httpStatus.BAD_REQUEST, `There is already a ${isAnyUpcomingOrOngoingSemester.status} registered semester`)
  }

  // check if this semester exists
  const isSemesterExists = await AcademicSemester.findById(academicSemester);

  if (!isSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This semester is not fount!');
  }

  // check if this semester already regestered
  const isSemesterRegestered = await SemesterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterRegestered) {
    throw new AppError(
      httpStatus.CONFLICT,
      'The semester is already registered!',
    );
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

// get all semester registration
const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result =
    await SemesterRegistration.findById(id).populate('academicSemester');
  return result;
};

// update course with transaction
const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  // if the requested semester is exists
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id)

  if(!isSemesterRegistrationExists){
    throw new AppError(httpStatus.NOT_FOUND, 'The semester is not found!')
  }
  
  // if the requested semester registration is ended, we will not update anything
  const currentSemesterStatus = isSemesterRegistrationExists?.status

  if(currentSemesterStatus === 'ENDED'){
    throw new AppError(httpStatus.BAD_REQUEST, `This semester is already ${currentSemesterStatus}`)
  }


};

export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
