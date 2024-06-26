import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  // if semester name and code don't follow given mapping, then throw error
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Invalid semester code');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

// retrieve all academic semesters
const getAllAcademicSemestersFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

// retrieve single academic semester
const getAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.findOne({ _id: id });
  return result;
};

// retrieve single academic semester
const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Invalid semester code');
  }

  const option = { new: true };
  const result = await AcademicSemester.findOneAndUpdate(
    { _id: id },
    payload,
    option,
  );
  return result;
};

export const academicSemesterService = {
  createAcademicSemesterIntoDB,
  getAcademicSemesterFromDB,
  getAllAcademicSemestersFromDB,
  updateAcademicSemesterIntoDB,
};
