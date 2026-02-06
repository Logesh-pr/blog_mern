import { useContext } from "react";
//components
import BlogCard from "./BlogCard";

//context
import { SearchContext } from "../context/Context";

//custom hooks
import { useGetBlogs } from "../hooks/useBlogQuery";

//loader page
import SpinnerLoader from "../Pages/SpinnerLoader";

//error page
import Error from "../Pages/Error";

export default function BlogList() {
  const { data: Blog, isLoading, isError } = useGetBlogs();
  const { search } = useContext(SearchContext);

  if (isLoading) return <SpinnerLoader />;

  if (isError) return <Error redirectHome={false} />;
  return (
    <div className="mt-12 grid   justify-center grid-cols-[repeat(auto-fit,minmax(250px,300px))] gap-6 ">
      {search
        ? search?.map((item) => {
            const date = new Date(item.date);
            return <BlogCard key={item.slug} item={item} date={date} />;
          })
        : Blog?.map((item) => {
            const date = new Date(item.date);
            return <BlogCard key={item.slug} item={item} date={date} />;
          })}
    </div>
  );
}
