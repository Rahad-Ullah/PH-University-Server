/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateFacultyId, generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TFaculty } from '../faculty/faculty.interface';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Faculty } from '../faculty/faculty.model';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a new user
  const userData: Partial<TUser> = {};

  // if password not given, use default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = 'student';

  //find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  // * Transaction and rollback
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // set generated id
    if (admissionSemester) {
      userData.id = await generateStudentId(admissionSemester);
    }

    //create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // returns an array

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    //set id, _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // reference _id

    //create a student  (transaction-2)
    const newStudent = await StudentModel.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error: any) {
    // if catched any error, abort and rollback transaction
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error)
  }
};


const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a new user
  const userData: Partial<TUser> = {};

  // if password not given, use default password
  userData.password = password || (config.default_password as string);

  // set Faculty role
  userData.role = 'faculty';

  //find academic semester info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }

  // * Transaction and rollback
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // set generated id
    if (academicDepartment) {
      userData.id = await generateFacultyId();
    }

    //create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // returns an array

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    //set id, _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // reference _id

    //create a Faculty  (transaction-2)
    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (error: any) {
    // if catched any error, abort and rollback transaction
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error)
  }
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
};
