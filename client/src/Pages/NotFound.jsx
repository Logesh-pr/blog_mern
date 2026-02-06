import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="w-full min-h-[90vh] flex flex-col justify-center items-center">
      <h1 className="text-9xl font-extrabold text-zinc-300">404</h1>
      <h5 className="font-bold text-3xl text-zinc-300 mt-4">Not found</h5>
      <Link
        to={"/"}
        className="mt-6 bg-blue-600 px-6 py-2 rounded-xl text-white font-semibold"
      >
        Back to Home
      </Link>
    </div>
  );
}
