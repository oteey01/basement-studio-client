import {
  useQuery,
  useMutation,
  useQueryClient,
} from "react-query";
import toast from "react-hot-toast";
import {
  addEmployee,
  deleteEmployee,
  fetchEmployees,
  updateEmployee,
} from "../../api/employee";

export function useEmployees() {
  return useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });
}

export function useAddEmployees() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries([
        "employees",
      ]); // refresh todos
      toast.success("Successfully created!");
    },
    onError: (err) => {
      //(err);
      toast.error("Something went wrong");
    },
  });
}

export function useUpdateEmployees() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEmployee,
    onSuccess: () => {
      toast.success("Successfully updated!");
      queryClient.invalidateQueries([
        "employees",
      ]); // refresh todos
    },
    onError: (err) => {
      toast.wrong("Something wrong");
      //(err);
    },
  });
}

export function useDeleteEmployees() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      toast.success("Successfully deleted!");
      queryClient.invalidateQueries([
        "employees",
      ]); // refresh todos
    },
    onError: (err) => {
      toast.wrong("Something wrong");
      //(err);
    },
  });
}
