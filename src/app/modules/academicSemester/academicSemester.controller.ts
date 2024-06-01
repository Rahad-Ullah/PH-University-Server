/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import { academicSemesterService } from './academicSemester.service';

// create new academic semester
const createAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const result = await academicSemesterService.createAcademicSemesterIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is created successfully',
    data: result,
  });
});

// retrieve all academic semesters
const getAllAcademicSemesters: RequestHandler = catchAsync(async (req, res) => {
  const result = await academicSemesterService.getAllAcademicSemestersFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semesters is retrieved successfully',
    data: result,
  });
});

// retrieve single academic semester
const getAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await academicSemesterService.getAcademicSemesterFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is retrieved successfully',
    data: result,
  });
});

// update single academic semester
const updateAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await academicSemesterService.updateAcademicSemesterIntoDB(
    id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is updated successfully',
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAcademicSemester,
  getAllAcademicSemesters,
  updateAcademicSemester,
};
