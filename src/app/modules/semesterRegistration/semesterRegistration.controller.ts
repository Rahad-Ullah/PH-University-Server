import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { SemesterRegistrationServices } from './semesterRegistration.service';

// create new Semester Registration
const createSemesterRegistration: RequestHandler = catchAsync(async (req, res) => {
  const result = await SemesterRegistrationServices.createSemesterRegistrationIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration is created successfully',
    data: result,
  });
});

// retrieve all Semester Registration
const getAllSemesterRegistration: RequestHandler = catchAsync(async (req, res) => {
  const result = await SemesterRegistrationServices.getAllSemesterRegistrationFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration is retrieved successfully',
    data: result,
  });
});

// retrieve single Semester Registration
const getSingleSemesterRegistration: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SemesterRegistrationServices.getSingleSemesterRegistrationFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration is retrieved successfully',
    data: result,
  });
});

// update single Semester Registration
const updateSemesterRegistration: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SemesterRegistrationServices.updateSemesterRegistrationIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration is updated successfully',
    data: result,
  });
});

// assign faculties
// const assignFacultiesWithCourse: RequestHandler = catchAsync(async (req, res) => {
//   const { courseId } = req.params;
//   const { faculties } = req.body;
//   const result = await SemesterRegistrationServices.assignFacultiesIntoDB(courseId, faculties);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Faculties assigned successfully',
//     data: result,
//   });
// });

export const SemesterRegistrationControllers = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
};
