//react form
import { useForm } from "react-hook-form";

//react router
import { useNavigate } from "react-router-dom";

//custom hook
import { useLogin } from "../hooks/useAuthQuery";

//toast
import toast from "react-hot-toast";
export default function Login({ setSignup }) {
  const navigate = useNavigate();
  const { mutateAsync: login } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();

  async function onSubmit(data) {
    try {
      await login(data);
      reset();
      navigate("/", {
        state: {
          toastMessage: "Successfully Loged in",
        },
      });
    } catch (error) {
      if (error.response.data.message === "Invalid email or password") {
        setError("root", {
          type: "manual",
          message: "Invalid email or password",
        });
      }
      toast.error(
        error?.response?.data?.message || "Something went wrong try again",
      );
    }
  }
  return (
    <div className="w-full max-w-100 mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="w-[80%] mx-auto flex flex-col gap-y-6"
      >
        <div className="w-full flex flex-col items-start gap-y-2">
          <label htmlFor="">Email</label>
          <input
            {...register("email", {
              required: "email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email",
              },
              setValueAs: (value) => value.toLowerCase().trim(),
            })}
            type="text"
            className={`w-full border-2 ${errors.email ? "border-red-500" : "border-zinc-600 focus:border-zinc-400"} px-4 py-2 rounded-lg `}
          />
          <div className=" text-red-500 text-sm">
            {errors.email && <p>{errors.email.message}</p>}
          </div>
        </div>

        <div className="w-full flex flex-col items-start gap-y-2">
          <label htmlFor="">Password</label>
          <input
            {...register("password", { required: "Please enter password" })}
            type="password"
            className={`w-full border-2 ${errors.password ? "border-red-500" : "border-zinc-600 focus:border-zinc-400"} px-4 py-2 rounded-lg `}
          />
          <div className=" text-red-500 text-sm">
            {errors.password && <p>{errors.password.message}</p>}
          </div>
        </div>
        <div className=" text-red-500 text-sm text-center">
          {errors.root && <p>{errors.root.message}</p>}
        </div>

        <input
          type="submit"
          value="Login"
          className="mt-4 px-6 py-2 bg-white text-black font-semibold rounded-lg cursor-pointer hover:bg-zinc-200 transition-colors"
        />
      </form>
      <div className="mt-6">
        <p className="text-sm font-medium text-center">
          You don't have an account?{" "}
          <span
            onClick={() => setSignup(true)}
            className="text-blue-500 cursor-pointer"
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
}
