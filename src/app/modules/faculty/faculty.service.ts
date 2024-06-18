import mongoose from 'mongoose';
import { Faculty } from './faculty.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { facultySearchableFields } from './faculty.constant';
import { TFaculty } from './faculty.interface';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';

// retrieve all Facultys
const getAllFacultysFromDB = async (query: Record<string, unknown>) => {
  // const queryObj = { ...query }; //copy

  // const FacultySearchableFields = ['email', 'name.firstName', 'presentAddress'];

  // let searchTerm = '';
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }

  // const searchQuery = Faculty.find({
  //   $or: FacultySearchableFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });

  // // filtering
  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

  // excludeFields.forEach((elem) => delete queryObj[elem]);

  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   });

  //   let sort = '-createdAt';

  //   if (queryObj.sort) {
  //     sort = query?.sort as string;
  //   }

  //   const sortQuery = filterQuery.sort(sort);

  //   let page = 1;
  //   let limit = 1;
  //   let skip = 0;
  //   if (query.limit) {
  //     limit = query.limit as number;
  //   }

  //   if (query.page) {
  //     page = query.page as number;
  //     skip = (page - 1) * limit;
  //   }

  //   const paginateQuery = sortQuery.skip(skip);

  //   const limitQuery = paginateQuery.limit(limit);

  //   // field limiting
  //   let fields = "-__v"
  //   if(query.fields){
  //     fields = (query.fields as string).split(',').join(' ')
  //     console.log({fields});
  //   }

  // const fieldQuery = await limitQuery.select(fields)

  //   return fieldQuery;

  const facultyQuery = new QueryBuilder(
    Faculty.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(facultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facultyQuery.modelQuery;
  return result;
};

// retrieve single Faculty
const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

// retrieve single Faculty
const updateFacultyIntoDB = async (id: string, payload: Partial<TFaculty>) => {
  const { name, ...remainingFacultyData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingFacultyData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

//   if (guardian && Object.keys(guardian).length) {
//     for (const [key, value] of Object.entries(guardian)) {
//       modifiedUpdatedData[`guardian.${key}`] = value;
//     }
//   }

//   if (localGuardian && Object.keys(localGuardian).length) {
//     for (const [key, value] of Object.entries(localGuardian)) {
//       modifiedUpdatedData[`localGuardian.${key}`] = value;
//     }
//   }

  const result = await Faculty.findOneAndUpdate(
    { id },
    modifiedUpdatedData,
    { new: true, runValidators: true },
  );

  return result;
};

// delete Faculty and user by using transaction and rollback
const deleteSingleFacultyFromDB = async (id: string) => {
  // start session
  const session = await mongoose.startSession();

  try {
    // start transaction
    session.startTransaction();

    const deletedFaculty = await Faculty.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Faculty');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedFaculty;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Faculty');
  }
};

export const FacultyServices = {
  getAllFacultysFromDB,
  getSingleFacultyFromDB,
  updateFacultyIntoDB,
  deleteSingleFacultyFromDB,
};
