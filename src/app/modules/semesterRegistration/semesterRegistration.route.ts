import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationControllers } from './semesterRegistration.controller';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';

const router = express.Router();

// crete new semester registration
router.post(
  '/create-semester-registration',
  validateRequest(SemesterRegistrationValidations.createSemesterRegistrationValidationSchema),
  SemesterRegistrationControllers.createSemesterRegistration,
);

// get all semester registration
router.get('/', SemesterRegistrationControllers.getAllSemesterRegistration);

// get single semester registration
router.get('/:id', SemesterRegistrationControllers.getSingleSemesterRegistration);

// update semester registration
router.patch(
  '/:id',
  validateRequest(SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema),
  SemesterRegistrationControllers.updateSemesterRegistration,
);

export const SemesterRegistrationRoutes = router;
