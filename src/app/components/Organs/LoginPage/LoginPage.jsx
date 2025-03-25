'use client'
import React, { useEffect } from "react";
import { useLoginUserMutation } from "@/redux/api/authApi";
import { toast } from 'react-toastify';
import PasswordInput from "@/app/components/Atoms/Input/PasswordInput";
import routeHelper from "@/helpers/routeHelper";
import siteHelper from "@/helpers/siteHelper";
import Link from "next/link";
import InputField from "@/app/components/Atoms/Input/InputField";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "@/redux/slice/userSlice";
import { useRouter } from "next/navigation";
import WithoutAuth from "../../HOC/WithoutAuth";
import Cookies from 'js-cookie';

function LoginPage() {
  const dispatch = useDispatch();
  const Router = useRouter();
  const isAuthenticated = useSelector(state => state.user?.isAuthenticated);

  useEffect(() => {
    // Redirect to home if already authenticated
    if (isAuthenticated) {
      Router.push(routeHelper.home);
    }
  }, [isAuthenticated, Router]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();

  const handleLogin = async (data) => {
    try {
      const result = await loginUser(data).unwrap(); // Unwrap to get the result directly
      console.log(result);
      const { user, token } = result; // Extract user and token from response
      // Dispatch actions to update user state
      if (result.status === "ok") {
        dispatch(setUser(user));
        dispatch(setToken(token));
        // Store user and token in cookies
        Cookies.set('user', JSON.stringify(user), { expires: 7 }); // Store user for 7 days
        Cookies.set('token', token, { expires: 7 }); // Store token for 7 days

        toast.success('Login successful');
        Router.push(routeHelper.home);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'An error occurred');
    }
  };

  return (
    <>
      <div className="login-wrapper d-flex align-items-center justify-content-center">
        <div className="custom-container">
          <div className="register-form mt-4">
            <h6 className="mb-3 text-center">Log in to continue to {siteHelper.title}</h6>

            <form onSubmit={handleSubmit(handleLogin)}>
              <InputField
                type="text"
                id="mobile"
                placeholder="Mobile Number"
                name="email"
                className="form-control"
                register={register}
                error={errors.email}
              />
              <PasswordInput
                type="password"
                id="password"
                placeholder="Password"
                name="password"
                className="form-control"
                register={register}
                error={errors.password}
              />

              <button className="btn btn-primary w-100" type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Sign In"}
              </button>
            </form>

            {/* Register Link */}
            <div className="text-center mt-3">
              <p>
                Don't have an account?{" "}
                <Link href={routeHelper.register} className="text-primary">
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// export default WithoutAuth(LoginPage);
export default LoginPage;