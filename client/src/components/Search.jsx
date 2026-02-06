import { useState, useContext } from "react";

//context
import { SearchContext } from "../context/Context";
import { useGetBlogs } from "../hooks/useBlogQuery";
export default function Search() {
  const [value, setValue] = useState("");
  const { data: blog } = useGetBlogs();
  const { setSearch } = useContext(SearchContext);

  function handleSearchSubmit(e) {
    const newValue = e.target.value;
    setValue(newValue);
    if (newValue.trim() === "") {
      setSearch(null);
      return;
    }
    const searched = blog.filter((item) =>
      item.title.toLowerCase().includes(newValue.toLowerCase()),
    );

    setSearch(searched);
  }

  return (
    <div className="w-full mt-6 flex flex-col justify-center items-center gap-y-12">
      <h1 className="font-extrabold text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] leading-11.25 text-zinc-300 text-center ">
        Search to find the Blog.
      </h1>
      <form
        action=""
        className="w-full flex flex-col md:flex-row gap-y-6 justify-center  gap-x-6"
      >
        <div className="w-full max-w-150">
          <input
            type="text"
            id="search"
            value={value}
            onChange={handleSearchSubmit}
            placeholder="Search by title"
            className="w-full border-2 border-zinc-600 px-4 py-3 rounded-xl"
          />
        </div>
      </form>
    </div>
  );
}
