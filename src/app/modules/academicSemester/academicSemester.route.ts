import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';

const router = express.Router();

router.post('/create-academic-semester', AcademicSemesterControllers.createStudent)

export const AcademicSemesterRoutes = router;
