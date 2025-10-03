import {
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import {
  fetchUser,
  login,
  signup,
} from "../../api/auth";
import toast from "react-hot-toast";
import {
  Navigate,
  useNavigate,
} from "react-router-dom";

export function useProfile() {
  // const navigate = useNavigate();
  return useQuery({
    queryKey: ["auth"],
    queryFn: fetchUser,
    onSuccess: (data) => {
      console.log(data);
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      //(data);
      localStorage.setItem(
        "accessToken",
        data.access_token
      );
      localStorage.setItem(
        "refreshToken",
        data.refreshToken
      );
      navigate("/");

      queryClient.invalidateQueries({
        queryKey: ["me", "auth"],
      });
    },
  });
}

export function useSignup() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      //(data);
      localStorage.setItem(
        "accessToken",
        data.access_token
      );
      localStorage.setItem(
        "refreshToken",
        data.refreshToken
      );
      queryClient.invalidateQueries([
        "me",
        "auth",
      ]);
      navigate("/");
    },
    onError: (err) => {
      //(err);
      toast.error("Something went wrong");
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return () => {
    localStorage.clear();
    queryClient.removeQueries("auth");
    queryClient.invalidateQueries(["auth"]);
    queryClient.clear();
    console.log("loging out...");
  };
}
