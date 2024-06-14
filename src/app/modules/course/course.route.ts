import express from 'express';
import { CourseValidations } from './course.validation';
import validateRequest from '../../middlewares/validateRequest';
import { CourseControllers } from './course.controller';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.get('/', CourseControllers.getAllCourses);

router.get('/:id', CourseControllers.getSingleCourse);

router.delete('/:id', CourseControllers.deleteCourse);

// router.patch(
//   '/:id',
//   validateRequest(updateCourseValidationSchema),
//   CourseControllers.updateCourse,
// );

export const CourseRoutes = router;
