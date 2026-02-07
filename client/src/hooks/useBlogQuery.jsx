//react query
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//axios
import api from "../api/axios";

const fetchBlog = async () => {
  const res = await api.get("/blogs");
  return res.data.blogs;
};

const fetchBlogBySlug = async (slug) => {
  const res = await api.get(`/get-blog/${slug}`);
  return res.data.blog;
};

const createBlog = async (blog) => {
  const res = await api.post("/create-blog", { blog });
  return res.data;
};

const updateBlog = async (slug, blog) => {
  const res = await api.put(`/update-blog/${slug}`, { blog });
  return res.data;
};

const deleteBlog = async (slug) => {
  const res = await api.delete(`/delete-blog/${slug}`);
  return res.data;
};

//React querys

function useGetBlogs() {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlog,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

function useGetBlogId(slug) {
  return useQuery({
    queryKey: ["blog", slug],
    queryFn: () => fetchBlogBySlug(slug),
    enabled: !!slug,
    staleTime: 60 * 1000,
    keepPreviousData: true,
  });
}

function useCreateBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
}

function useUpdateBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ slug, data }) => updateBlog(slug, data),
    onSuccess: (data, { slug }) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.setQueryData(["blog", slug], data.blog);
    },
  });
}

function useDeleteBlog(slug) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBlog,
    onSuccess: (_, slug) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.removeQueries({ queryKey: ["blog", slug] });
    },
  });
}

export {
  useGetBlogs,
  useGetBlogId,
  useCreateBlog,
  useUpdateBlog,
  useDeleteBlog,
};
