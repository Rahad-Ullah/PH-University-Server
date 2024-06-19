import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationControllers } from './semesterRegistration.controller';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';

const router = express.Router();

router.post(
  '/create-semester-registration',
  validateRequest(SemesterRegistrationValidations.createSemesterRegistrationValidationSchema),
  SemesterRegistrationControllers.createSemesterRegistration,
);

router.get('/', SemesterRegistrationControllers.getAllSemesterRegistration);

router.get('/:id', SemesterRegistrationControllers.getSingleSemesterRegistration);

// assign faculties
// router.put('/:courseId/assign-faculties', validateRequest(CourseValidations.facultiesWithCourseValidationSchema),  SemesterRegistrationControllers.assignFacultiesWithCourse)

router.patch(
  '/:id',
  validateRequest(SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema),
  SemesterRegistrationControllers.updateSemesterRegistration,
);

export const SemesterRegistrationRoutes = router;
