//react query
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//axios
import api from "../api/axios";

//axios functions
const checkUserName = async (username) => {
  const res = await api.get(`/auth/check-userName?username=${username}`);
  return res.data;
};

const signup = async (users) => {
  const res = await api.post("/auth/signup", users);
  return res.data;
};

const login = async (users) => {
  const res = await api.post("/auth/login", users);
  return res.data;
};

const logout = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};
const fetchMe = async () => {
  const res = await api.get("/auth/me");
  return res.data.user;
};

//react query

function useCheckUsername(username) {
  return useQuery({
    queryKey: ["check-usename", username],
    queryFn: async () => {
      await new Promise((res) => setTimeout(res, 500));
      return checkUserName(username);
    },

    enabled: !!username && username.length > 3,

    return: false,
  });
}

function useSignup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });
}
function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });
}

function useAuth() {
  const queryClient = useQueryClient();
  const authData = queryClient.getQueryData({ queryKey: ["auth"] });
  return useQuery({
    queryKey: ["auth"],
    queryFn: fetchMe,
    retry: false,
    enabled: authData !== null,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(["auth"], null);
      queryClient.cancelQueries({ queryKey: ["auth"] });
    },
  });
}

export { useCheckUsername, useSignup, useLogin, useLogout, useAuth };
