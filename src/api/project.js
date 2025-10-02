import { transformProjectData } from "../utils/transform";
import { api } from "./shared/route";

const projectRoute = "/projects";

export const fetchProjects = () =>
  api
    .get(projectRoute)
    .then((res) =>
      transformProjectData(res.data)
    );
export const addProject = async (newProject) => {
  return api
    .post(projectRoute, newProject, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const updateProject = async (
  updatedProject
) => {
  const id = updatedProject.id;
  return api
    .patch(
      `${projectRoute}/${id}`,
      updatedProject,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((res) => {
      //(res.data);
      return res.data;
    });
};
export const deleteProject = async (id) => {
  return api
    .delete(`${projectRoute}/${id}`)
    .then((res) => {
      //(res.data);
      return res.data;
    });
};
