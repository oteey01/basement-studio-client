import {
  useQuery,
  useMutation,
  useQueryClient,
} from "react-query";
import toast from "react-hot-toast";
import {
  addcustomer,
  deleteCustomer,
  fetchCustomers,
  updateCustomer,
} from "../../api/customer";

export function useCustomers() {
  return useQuery({
    queryKey: ["customers"],
    queryFn: fetchCustomers,
  });
}

export function useAddcustomers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addcustomer,
    onSuccess: () => {
      queryClient.invalidateQueries([
        "customers",
      ]); // refresh todos
      toast.success("Successfully created!");
    },
    onError: (err) => {
      console.log(err);
      toast.error("Something went wrong");
    },
  });
}

export function useUpdateCustomers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCustomer,
    onSuccess: () => {
      toast.success("Successfully updated!");
      queryClient.invalidateQueries([
        "customers",
      ]); // refresh todos
    },
    onError: (err) => {
      toast.wrong("Something wrong");
      console.log(err);
    },
  });
}

export function useDeleteCustomers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCustomer,
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
