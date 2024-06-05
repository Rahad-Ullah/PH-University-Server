import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { academicDepartmentServices } from './academicDepartment.service';

// create new academic department
const createAcademicDepartment: RequestHandler = catchAsync(async (req, res) => {
  const result = await academicDepartmentServices.createAcademicDepartmentIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department is created successfully',
    data: result,
  });
});

// retrieve all academic departments
const getAllAcademicDepartments: RequestHandler = catchAsync(async (req, res) => {
  const result = await academicDepartmentServices.getAllAcademicDepartmentsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic departments is retrieved successfully',
    data: result,
  });
});

// retrieve single academic department
const getAcademicDepartment: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await academicDepartmentServices.getAcademicDepartmentFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department is retrieved successfully',
    data: result,
  });
});

// update single academic department
const updateAcademicDepartment: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await academicDepartmentServices.updateAcademicDepartmentIntoDB(
    id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department is updated successfully',
    data: result,
  });
});

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getAcademicDepartment,
  updateAcademicDepartment,
};
