//react-router
import { Link } from "react-router-dom";

export default function BlogCard({ item }) {
  const colors = {
    Tech: "bg-blue-500",
    Food: "bg-yellow-500",
    Travel: "bg-green-500",
    Code: "bg-violet-500",
  };

  function truncateText(text, wordLimit, charLimit) {
    if (!text) return "";
    if (text.length > charLimit) {
      text = text.slice(0, charLimit) + "…";
    }

    const words = text.trim().split(/\s+/);
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "…";
  }

  const date = new Date(item?.createdAt);

  return (
    <Link
      to={`/blog-details/${item.slug}`}
      key={item.slug}
      className=" p-4 rounded-xl flex flex-col gap-y-4 border border-zinc-600 bg-zinc-950 hover:scale-[1.1] hover:bg-zinc-900 transition cursor-pointer "
    >
      <h2 className="text-2xl font-bold text-zinc-200  ">
        {truncateText(item.title, 5, 20)}
      </h2>
      <div className="">
        <p
          className={`w-fit px-4 py-1 rounded-4xl font-semibold text-sm ${
            colors[item.tag]
          }`}
        >
          {item.tag}
        </p>
      </div>
      <p className=" text-zinc-400  break-words  h-30">
        {truncateText(item.description, 30, 160)}
      </p>
      <div className="flex justify-end">
        <p className="text-sm font-semibold text-zinc-300">
          {date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
    </Link>
  );
}
