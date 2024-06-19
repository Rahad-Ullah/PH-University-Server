import { z } from 'zod';

const createSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string(),
    status: z.enum(['UPCOMING', 'ONGOING', 'ENDED']),
    startDate: z.string(),
    endDate: z.string(),
    startTime: z.string(),
    endTime: z.string(),
  }),
  isDeleted: z.boolean().optional(),
});

const updateSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string().optional(),
    status: z.enum(['UPCOMING', 'ONGOING', 'ENDED']).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  }),
  isDeleted: z.boolean().optional(),
});

export const SemesterRegistrationValidations = {
  createSemesterRegistrationValidationSchema,
  updateSemesterRegistrationValidationSchema,
};
