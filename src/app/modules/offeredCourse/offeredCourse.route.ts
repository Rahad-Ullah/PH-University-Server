import { Router } from 'express';
import { OfferedCourseControllers } from './offeredCourse.controller';
import { OfferedCourseValidations } from './offeredCourse.validation';
import validateRequest from '../../middlewares/validateRequest';

const route = Router();

// create new offered course
route.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidations.createOfferedCourseValidation),
  OfferedCourseControllers.createOfferedCourse,
);

// get all offered courses
route.get('/', OfferedCourseControllers.getAllOfferedCourse);

// get single offered course
route.get('/:id', OfferedCourseControllers.getSingleOfferedCourse);

// update offered course
route.patch(
  '/:id',
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidation),
  OfferedCourseControllers.updateOfferedCourse,
);

export const OfferedCourseRoutes = route;
