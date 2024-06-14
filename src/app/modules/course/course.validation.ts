import { z } from 'zod';

const preRequisiteCoursesValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    prefix: z.string().min(1),
    code: z.number().min(1),
    credits: z.number().min(1),
    preRequisiteCourses: z
      .array(preRequisiteCoursesValidationSchema)
      .optional(),
  }),
});

export const CourseValidations = {
  createCourseValidationSchema,
};
