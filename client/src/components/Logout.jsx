//toast
import toast from "react-hot-toast";

//custom hook
import { useLogout } from "../hooks/useAuthQuery";

export default function Logout() {
  const { mutate: logout, isLoading } = useLogout();

  function handleLogout() {
    logout(undefined, {
      onSuccess: () => {
        toast.success("Sussfully logout");
      },
      onError: (error) => {
        toast.error("something went wrong");
      },
    });
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="cursor-pointer bg-red-600 hover:bg-red-500 transition-colors px-4 py-2 rounded-lg font-semibold"
    >
      Log out
    </button>
  );
}
