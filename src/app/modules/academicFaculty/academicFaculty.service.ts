import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

// retrieve all academic semesters
const getAllAcademicFacultysFromDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};

// retrieve single academic semester
const getAcademicFacultyFromDB = async (id: string) => {
  const result = await AcademicFaculty.findOne({ _id: id });
  return result;
};

// update single academic semester
const updateAcademicFacultyIntoDB = async (
  facultyId: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFaculty.findOneAndUpdate(
    { _id: facultyId },
    payload,
    {
      new: true,
    },
  );
  return result;
};

export const academicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultysFromDB,
  getAcademicFacultyFromDB,
  updateAcademicFacultyIntoDB,
};
