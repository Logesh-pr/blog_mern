//react router
import { useParams, useNavigate } from "react-router-dom";

//hooks
import { useContext } from "react";

//custom hooks
import { useGetBlogId, useDeleteBlog } from "../hooks/useBlogQuery";

//context
import { AuthContext } from "../context/Context";

//loader page
import SpinnerLoader from "./SpinnerLoader";

//error page
import Error from "./Error";

export default function BlogDetails() {
  const { isAuthenticated, user } = useContext(AuthContext);
  const { slug } = useParams();
  const { data: details, isLoading, isError } = useGetBlogId(slug);
  const { mutate } = useDeleteBlog();
  const navigate = useNavigate();
  const colors = {
    Tech: "bg-blue-500",
    Food: "bg-yellow-500",
    Travel: "bg-green-500",
    Code: "bg-violet-500",
  };

  const date = new Date(details?.createdAt);

  function handleDelete(slug) {
    mutate(slug);
    navigate("/", { replace: true });
  }

  function handleEdit(slug) {
    navigate(`/update-blog/${slug}`);
  }

  if (isLoading) return <SpinnerLoader />;

  if (isError) return <Error redirectHome={true} />;
  return (
    <div className=" mt-12 container mx-auto px-2">
      <div className="flex flex-wrap justify-end gap-x-6 gap-y-4 text-white px-2 font-semibold">
        {isAuthenticated && user.name === details?.author?.name && (
          <>
            <button
              onClick={() => handleEdit(details.slug)}
              className="bg-blue-600 hover:bg-blue-500 px-6 py-1 rounded-lg cursor-pointer "
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(details.slug)}
              className="bg-red-600 hover:bg-red-500 px-6 py-1 rounded-lg cursor-pointer "
            >
              Delete
            </button>
          </>
        )}
      </div>
      <div className="flex flex-col gap-y-4 p-4">
        <h2 className="text-3xl font-bold text-zinc-200">{details?.title}</h2>
        <p
          className={`w-fit px-4 py-1 rounded-4xl font-semibold text-sm text-white ${
            colors[details?.tag]
          }`}
        >
          {details?.tag}
        </p>
        <p className="text-zinc-300 break-all">{details?.description}</p>
        <div className="absolute bottom-0 right-5">
          <p className="text-sm font-semibold text-zinc-500">
            {date.toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
