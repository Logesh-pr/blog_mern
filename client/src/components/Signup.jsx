import { useState, useEffect } from "react";

//react form
import { useForm, useWatch } from "react-hook-form";

//react router
import { useNavigate } from "react-router-dom";

//custom hook
import { useCheckUsername, useSignup } from "../hooks/useAuthQuery";

//react hot toast
import toast from "react-hot-toast";

export default function Signup({ setSignup }) {
  const navigate = useNavigate();
  const [isUsernameExist, setIsUsernameExist] = useState(false);
  const { mutateAsync, data: user } = useSignup();
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
    watch,
    reset,
    control,
    clearErrors,
  } = useForm();
  const checkConfirmPassword = watch("password");
  const username = useWatch({
    control,
    name: "username",
  });

  const { data, isFetching, isError } = useCheckUsername(username);

  useEffect(() => {
    if (!username || username.length < 4) {
      setIsUsernameExist(false);
      return;
    }
    if (!data) {
      return;
    }

    if (data.message === "username already exist") {
      {
        setIsUsernameExist(false);
        setError("username", { type: "manual", message: data.message });
      }
    } else {
      setIsUsernameExist(true);
      clearErrors("username");
    }
  }, [username, data, isError, clearErrors, setError]);

  useEffect(() => {
    if (isError)
      return setError("username", {
        type: "manual",
        message: "server error , try again later",
      });
  }, [isError, setError]);

  async function onSubmit(data) {
    try {
      await mutateAsync(data);
      reset();
      navigate("/", {
        state: {
          toastMessage: "Successfully signed in",
        },
      });
    } catch (error) {
      if (error.response.data.message === "Email already taken") {
        setError("email", {
          type: "manual",
          message: error.response.data.message,
        });
      }
      toast.error(error?.response?.data?.message || "signup failed, Try again");
    }
  }
  return (
    <div className="w-full max-w-100 mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="w-[80%] mx-auto flex flex-col gap-y-2  items-center"
      >
        <div className="w-full flex flex-col items-start gap-y-2">
          <label htmlFor="">Username</label>
          <input
            {...register("username", {
              required: "Username is required. Must be unique",
              minLength: {
                value: 5,
                message: "Minimum 4 characters are required",
              },
              maxLength: {
                value: 15,
                message: "Maximum 15 character only required",
              },
              validate: () => isUsernameExist || "username already exist",
            })}
            type="text"
            className={`w-full border-2 ${errors.username ? "border-red-500" : "border-zinc-600 focus:border-zinc-400"} px-4 py-2 rounded-lg `}
          />
          <div className="text-sm min-h-4.5">
            {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}
            {isFetching && <p className="text-amber-500">Checking...</p>}
            {!errors.username && isUsernameExist && !isFetching && (
              <p className="text-green-500">username is avaliable</p>
            )}
          </div>
        </div>

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
          <div className=" text-red-500 text-sm  min-h-4.5">
            {errors.email && <p>{errors.email.message}</p>}
          </div>
        </div>

        <div className="w-full flex flex-col items-start gap-y-2">
          <label htmlFor="">Password</label>
          <input
            {...register("password", {
              required: "Please enter password",
              minLength: {
                value: 6,
                message: "Password must be atleast 6 characters",
              },
            })}
            type="password"
            className={`w-full border-2 ${errors.password ? "border-red-500" : "border-zinc-600 focus:border-zinc-400"} px-4 py-2 rounded-lg `}
          />
          <div className=" text-red-500 text-sm  min-h-4.5">
            {errors.password && <p>{errors.password.message}</p>}
          </div>
        </div>

        <div className="w-full flex flex-col items-start gap-y-2">
          <label htmlFor="">Confirmpassword</label>
          <input
            {...register("confirmPassword", {
              required: "Please enter the Confirmpassword",
              validate: (password) =>
                checkConfirmPassword === password || "Password not match",
            })}
            type="password"
            className={`w-full border-2 ${errors.confirmPassword ? "border-red-500" : "border-zinc-600 focus:border-zinc-400"} px-4 py-2 rounded-lg `}
          />
          <div className=" text-red-500 text-sm  min-h-4.5">
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          </div>
        </div>
        <input
          type="submit"
          value="Signup"
          className="mt-4 px-6 py-2 bg-white text-black font-semibold rounded-lg cursor-pointer hover:bg-zinc-200 transition-colors"
        />
      </form>
      <div className="mt-6">
        <p className="text-sm font-medium text-center">
          Already have an account?{" "}
          <span
            onClick={() => setSignup(false)}
            className="text-blue-500 cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
