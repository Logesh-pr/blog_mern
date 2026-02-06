import { useEffect } from "react";

//react-router
import { useNavigate, useParams } from "react-router-dom";

//forms
import { useForm } from "react-hook-form";

//toast
import toast from "react-hot-toast";

//custom hooks
import {
  useCreateBlog,
  useGetBlogId,
  useGetBlogs,
  useUpdateBlog,
} from "../hooks/useBlogQuery";

//loader page
import SpinnerLoader from "../Pages/SpinnerLoader";

//error page
import Error from "../Pages/Error";

export default function CreateBlog() {
  const { mutateAsync: createBlog } = useCreateBlog();
  const { slug } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(slug);
  const { mutateAsync: updateBlog } = useUpdateBlog();
  const { data: editBlog, isLoading, isError } = useGetBlogId(slug);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isEditMode && editBlog) {
      setValue("title", editBlog.title);
      setValue("description", editBlog.description);
      setValue("tag", editBlog.tag);
    }
  }, [isEditMode, editBlog, setValue]);

  async function onSubmit(data) {
    try {
      if (isEditMode) {
        // const {title,}
        await updateBlog({ slug, data });
        reset();
        navigate("/", {
          state: {
            toastMessage: "Successfully updated a blog",
          },
        });
      } else {
        await createBlog(data);
        reset();
        navigate("/", {
          state: {
            toastMessage: "Successfully created a blog",
          },
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  const descriptionValue = watch("description", "");
  const descriptionMax = 300;

  if (isLoading) return <SpinnerLoader />;

  if (isError) return <Error redirectHome={true} />;

  return (
    <>
      <div className="mt-24 w-full max-w-150 mx-auto px-4 py-12 rounded-lg bg-black text-zinc-200">
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-5 items-center"
        >
          {/* Title */}
          <div className="w-[80%] flex flex-col gap-y-3">
            <label htmlFor="title" className="font-semibold text-sm">
              Title
            </label>
            <input
              {...register("title", {
                required: "Title are required",
                minLength: {
                  value: 10,
                  message: "Minimum 10 characters are required",
                },
                maxLength: {
                  value: 100,
                  message: "Maximum 100 characters are limited",
                },
              })}
              type="text"
              className={`border-2 ${
                errors.title ? "border-red-500" : " border-zinc-500"
              } rounded-lg px-4 py-2`}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>
          {/* Description */}
          <div className="w-[80%] flex flex-col gap-y-3">
            <label htmlFor="description" className="font-semibold text-sm">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Descripiton are required",
                minLength: {
                  value: 100,
                  message: "Minium 100 character are required",
                },
                maxLength: {
                  value: 350,
                  message: "Maximum 300 characters are required",
                },
              })}
              className={`border-2 h-37.5 ${
                errors.description ? "border-red-500" : "border-zinc-500"
              }  rounded-lg px-4 py-2 overflow-y-scroll`}
              name="description"
              id="description"
            ></textarea>
            <div className="flex justify-between items-center">
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
              <p
                className={
                  descriptionValue.length > descriptionMax
                    ? "text-red-500"
                    : "text-zinc-400"
                }
              >
                {descriptionValue.length} / {descriptionMax}
              </p>
            </div>
          </div>
          {/* Tag */}
          <div className="w-[80%] flex flex-col gap-y-3">
            <label htmlFor="tag" className="font-semibold text-sm">
              Tag
            </label>
            <select
              {...register("tag")}
              name="tag"
              id="tag"
              className="border-2 border-zinc-500 bg-black rounded-lg px-4 py-2"
            >
              <option value="Tech">Tech</option>
              <option value="Travel">Travel</option>
              <option value="Code">Code</option>
              <option value="Food">Food</option>
            </select>
          </div>
          <input
            type="submit"
            value="Submit"
            className="px-8 py-2 mt-6 bg-white text-black font-semibold rounded-lg cursor-pointer"
          />
        </form>
      </div>
    </>
  );
}
