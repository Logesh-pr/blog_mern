import { Link } from "react-router-dom";

export default function Error({ redirectHome }) {
  return (
    <div className="flex items-center justify-center min-h-[90vh]">
      <div className="flex flex-col items-center gap-y-6">
        <h5 className="text-zinc-300 font-semibold text-xl">
          Something went wrong , Try again later
        </h5>
        {redirectHome && (
          <Link
            className="px-6 py-2 rounded-xl font-semibold text-white bg-blue-500"
            to={"/"}
          >
            Back to home
          </Link>
        )}
      </div>
    </div>
  );
}
