import { RequestHandler } from "express"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import httpStatus from "http-status"
import { OfferedCourseServices } from "./offeredCourse.service"

const createOfferedCourse: RequestHandler = catchAsync(async (req, res) => {
    const result = await OfferedCourseServices.createOfferedCourseIntoDB(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Offered course is created successfully',
        data: result,
    })
})

const getSingleOfferedCourse: RequestHandler = catchAsync(async (req, res) => {
    // const result = 

    // sendResponse(res, {
    //     statusCode: httpStatus.OK,
    //     success: true,
    //     message: 'Offered course is retrieved successfully',
    //     data: result,
    // })
})

const getAllOfferedCourse: RequestHandler = catchAsync(async (req, res) => {
    // const result = 

    // sendResponse(res, {
    //     statusCode: httpStatus.OK,
    //     success: true,
    //     message: 'Offered courses is retrieved successfully',
    //     data: result,
    // })
})

const updateOfferedCourse: RequestHandler = catchAsync(async (req, res) => {
    // const result = 

    // sendResponse(res, {
    //     statusCode: httpStatus.OK,
    //     success: true,
    //     message: 'Offered course is updated successfully',
    //     data: result,
    // })
})


export const OfferedCourseControllers = {
    createOfferedCourse,
    getSingleOfferedCourse,
    getAllOfferedCourse,
    updateOfferedCourse,
}