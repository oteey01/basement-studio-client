import {
  useQuery,
  useMutation,
  useQueryClient,
} from "react-query";
import {
  addProject,
  deleteProject,
  fetchProjects,
  updateProject,
} from "../../api/project";
import toast from "react-hot-toast";

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
}

export function useAddProjects() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProject,
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]); // refresh todos
      toast.success("Successfully created!");
    },
    onError: (err) => {
      console.log(err);
      toast.error("Something went wrong");
    },
  });
}

export function useUpdateProjects() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProject,
    onSuccess: () => {
      toast.success("Successfully updated!");
      queryClient.invalidateQueries(["projects"]); // refresh todos
    },
    onError: (err) => {
      toast.wrong("Something wrong");
      console.log(err);
    },
  });
}

export function useDeleteProjects() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      toast.success("Successfully deleted!");
      queryClient.invalidateQueries(["projects"]); // refresh todos
    },
    onError: (err) => {
      toast.wrong("Something wrong");
      console.log(err);
    },
  });
}
