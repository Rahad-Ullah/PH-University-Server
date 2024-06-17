import { Schema, model } from 'mongoose';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { FacultyName, TFaculty } from './faculty.interface';

const facultyNameSchema = new Schema<FacultyName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const facultySchema = new Schema<TFaculty>({
  id: { type: String, unique: true },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User id is required'],
    unique: true,
    ref: 'User',
  },
  name: facultyNameSchema,
  designation: { type: String, required: true },
  gender: ['male', 'female'],
  dateOfBirth: { type: Date },
  email: { type: String, required: true, unique: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloogGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  profileImg: { type: String },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicDepartment',
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicFaculty',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

facultySchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const isFacultyExist = await Faculty.findOne(query);

  if (!isFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty does not exist!');
  }

  next();
});

export const Faculty = model<TFaculty>('Faculty', facultySchema);
