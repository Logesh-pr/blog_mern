import { useEffect, useState, useContext } from "react";

//components
import Search from "../components/Search";
import BlogList from "../components/BlogList";
import Logout from "../components/Logout";

//react router
import { Link, useLocation } from "react-router-dom";

//toast
import toast from "react-hot-toast";

//context
import { AuthContext, SearchContext } from "../context/Context";

export default function Home() {
  // const [user, setUser] = useState(null);
  const location = useLocation();
  const { setSearch } = useContext(SearchContext);
  const { user, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    setSearch(null);
  }, []);

  useEffect(() => {
    if (location.state?.toastMessage) {
      toast.success(location.state.toastMessage);

      window.history.replaceState({}, document.title);
    }
  }, []);
  return (
    <div className="w-full min-h-screen bg-black text-white relative">
      <div className="mt-6 flex justify-center lg:justify-end p-4">
        {isAuthenticated ? (
          <div className="flex flex-col lg:flex-row gap-y-4 gap-x-4">
            <div className="px-6 py-2 rounded-lg font-semibold text-white">
              Hi, {user?.name}
            </div>
            <Logout />
          </div>
        ) : (
          <div className=" ">
            <Link
              to="/auth"
              className=" px-6 py-2 rounded-lg bg-blue-600 font-semibold cursor-pointer hover:bg-blue-500"
            >
              Signup / Login
            </Link>
          </div>
        )}
      </div>

      <div className="container mx-auto px-2 mt-12">
        <Search />
        <div className="w-full h-auto  flex justify-center mt-8">
          {isAuthenticated && (
            <Link
              to="/create-blog"
              className="px-6 py-2 mx-auto rounded-lg bg-blue-600 font-semibold cursor-pointer hover:bg-blue-500"
            >
              Create a Blog
            </Link>
          )}
        </div>
        <BlogList />
      </div>
    </div>
  );
}
