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

// assign faculties
router.put('/:courseId/assign-faculties', validateRequest(CourseValidations.facultiesWithCourseValidationSchema),  CourseControllers.assignFacultiesWithCourse)

// remove faculties from a course
router.delete('/:courseId/remove-faculties', validateRequest(CourseValidations.facultiesWithCourseValidationSchema),  CourseControllers.removeFacultiesWithCourse)

router.patch(
  '/:id',
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

export const CourseRoutes = router;
