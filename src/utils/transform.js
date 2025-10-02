import { baseURL } from "../api/shared/route";

export const transformProjectData = (data) => {
  return data
    .map((data) => ({
      projectName: data?.projectName,
      status: data?.status,
      budget: data?.budget,
      duration: data?.duration,
      id: data?._id,
      image: data?.filePath
        ? `${baseURL}${data?.filePath}`
        : "",
    }))
    ?.reverse();
};

export const transformEmployeeData = (data) => {
  return data
    .map((data) => ({
      employeeName: data?.employeeName,
      email: data?.email,
      designation: data?.designation,
      location: data?.location,
      hireDate: data?.hireDate,
      id: data?._id,
      image: data?.filePath
        ? `${baseURL}${data?.filePath}`
        : "",
    }))
    ?.reverse();
};

export const transformCustomerData = (data) => {
  return data
    .map((data) => ({
      customerName: data?.customerName,
      email: data?.email,
      // dateJoined:
      location: data?.location,
      id: data?._id,
      image: data?.filePath
        ? `${baseURL}${data?.filePath}`
        : "",
    }))
    ?.reverse();
};
