import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import { AcademicSemester } from '../academicSemester/academicSemester.model';

// create new semester registration
const createSemesterRegistrationIntoDB = async (payload: TSemesterRegistration) => {

  const academicSemester = payload?.academicSemester;

  // check if this semester exists
  const isSemesterExists = await AcademicSemester.findById(academicSemester)
  
  if(!isSemesterExists){
    throw new AppError(httpStatus.NOT_FOUND, 'This semester is not fount!')
  }

  // check if this semester already regestered
  const isSemesterRegestered = await SemesterRegistration.findOne({academicSemester})

  if(isSemesterRegestered){
    throw new AppError(httpStatus.CONFLICT, 'The semester is already registered!')
  }
  
  const result = await SemesterRegistration.create(payload);
  return result;
};

// get all semester registration
const getAllSemesterRegistrationFromDB = async (query: Record<string, unknown>) => {
  // const semesterRegistrationQuery = new QueryBuilder(
  //   SemesterRegistration.find(),
  //   query,
  // )
  //   .search(courseSearchableFields)
  //   .filter()
  //   .sort()
  //   .paginate()
  //   .fields();
  // const result = await courseQuery.modelQuery;
  // return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};

// update course with transaction
const updateSemesterRegistrationIntoDB = async (id: string, payload: Partial<TSemesterRegistration>) => {
  // const { preRequisiteCourses, ...courseRemainingData } = payload;

  // const session = await mongoose.startSession();

  // try {
  //   session.startTransaction();

  //   // step-1: basic course info update
  //   const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
  //     id,
  //     courseRemainingData,
  //     { new: true, runValidators: true, session },
  //   );

  //   if (!updatedBasicCourseInfo) {
  //     throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
  //   }

  //   if (preRequisiteCourses && preRequisiteCourses.length > 0) {
  //     // filter out the deleted fields
  //     const deletedPreRequisites = preRequisiteCourses
  //       .filter((el) => el.course && el.isDeleted)
  //       .map((el) => el.course);

  //     const deletedPreRequisitesCourses = await Course.findByIdAndUpdate(
  //       id,
  //       {
  //         $pull: {
  //           preRequisiteCourses: { course: { $in: deletedPreRequisites } },
  //         },
  //       },
  //       { new: true, runValidators: true, session },
  //     );

  //     if (!deletedPreRequisitesCourses) {
  //       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
  //     }

  //     // filter out the new course fields
  //     const newPreRequisites = preRequisiteCourses?.filter(
  //       (el) => el.course && !el.isDeleted,
  //     );

  //     const newPreRequisitesCourses = await Course.findByIdAndUpdate(
  //       id,
  //       {
  //         $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
  //       },
  //       { new: true, runValidators: true, session },
  //     );

  //     if (!newPreRequisitesCourses) {
  //       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
  //     }

  //     const result = await Course.findById(id).populate(
  //       'preRequisiteCourses.course',
  //     );
  //     return result;
  //   }

  //   await session.commitTransaction();
  //   await session.endSession();
  // } catch (error) {
  //   await session.abortTransaction();
  //   await session.endSession();
  //   throw new Error('Failed to update');
  // }
};

// // assign faculties
// const assignFacultiesIntoDB = async (id: string, payload: Partial<TCourseFaculty>) => {
//   const result = await CourseFaculty.findByIdAndUpdate(id, {
//     course: id,
//     $addToSet: {faculties: {$each: payload}}
//   }, {
//     upsert: true, 
//     new: true
//   })
  
//   return result;
// };

// // remove faculties
// const removeFacultiesIntoDB = async (id: string, payload: Partial<TCourseFaculty>) => {
//   const result = await CourseFaculty.findByIdAndUpdate(id, {
//     $pull: {faculties: {$in: payload}}
//   }, {
//     upsert: true, 
//     new: true
//   })
  
//   return result;
// };

export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
