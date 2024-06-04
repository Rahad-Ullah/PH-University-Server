import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import { academicFacultyServices } from './academicFaculty.service';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';

// create new academic semester
const createAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.createAcademicFacultyIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty is created successfully',
    data: result,
  });
});

// retrieve all academic facultys
const getAllAcademicFaculties: RequestHandler = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.getAllAcademicFacultysFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculties is retrieved successfully',
    data: result,
  });
});

// retrieve single academic faculty
const getAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await academicFacultyServices.getAcademicFacultyFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty is retrieved successfully',
    data: result,
  });
});

// update single academic faculty
const updateAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await academicFacultyServices.updateAcademicFacultyIntoDB(
    id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty is updated successfully',
    data: result,
  });
});

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getAcademicFaculty,
  updateAcademicFaculty,
};
