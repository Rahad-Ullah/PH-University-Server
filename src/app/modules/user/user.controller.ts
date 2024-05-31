/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';
import { RequestHandler } from 'express';

const createStudent: RequestHandler = async (req, res, next) => {
  try {
    const { password, student: studentData } = req.body;
    //   const validatedData = studentValidationSchema.parse(studentData)
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const UserControllers = {
  createStudent,
};
