import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationControllers } from './semesterRegistration.controller';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(CourseValidations.createCourseValidationSchema),
  SemesterRegistrationControllers.createSemesterRegistration,
);

router.get('/', SemesterRegistrationControllers.getAllSemesterRegistration);

router.get('/:id', SemesterRegistrationControllers.getSingleSemesterRegistration);

// assign faculties
// router.put('/:courseId/assign-faculties', validateRequest(CourseValidations.facultiesWithCourseValidationSchema),  SemesterRegistrationControllers.assignFacultiesWithCourse)

router.patch(
  '/:id',
  validateRequest(CourseValidations.updateCourseValidationSchema),
  SemesterRegistrationControllers.updateSemesterRegistration,
);

export const SemesterRegistrationRoutes = router;
