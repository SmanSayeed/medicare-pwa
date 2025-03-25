'use client'
import React from 'react';
import PasswordInput from '@/app/components/Atoms/Input/PasswordInput';
import routeHelper from '@/helpers/routeHelper';
import siteHelper from '@/helpers/siteHelper';
import Link from 'next/link';
import InputField from '@/app/components/Atoms/Input/InputField';
import { useForm } from 'react-hook-form';
import { useRegisterUserMutation } from '@/redux/api/authApi';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

const registrationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleRegister = async (data) => {
    try {
      const result = await registerUser(data).unwrap();
      if (result.status === "success") {
        toast.success('Registration successful');
        reset();
      } else if (result.errors) {
        result.errors.forEach((errMessage) => {
          toast.error(errMessage);
        });
      }
    } catch (err) {
      if (err.data?.errors) {
        err.data.errors.forEach((errMessage) => {
          toast.error(errMessage);
        });
      } else {
        toast.error('An unexpected error occurred.');
      }
    }
  }

  return (
    <>
      <div className="login-wrapper d-flex align-items-center justify-content-center">
        <div className="custom-container">
          <div className="register-form mt-4">
            <h6 className="mb-3 text-center">Register to continue to {siteHelper.title}</h6>
            <form onSubmit={handleSubmit(handleRegister)}>
              <div className="mb-3">
                <InputField
                  type="text"
                  id="name"
                  placeholder="Name"
                  name="name"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  register={register}
                  error={errors.name?.message}
                />
              </div>

              <div className="mb-3">
                <InputField
                  type="email"
                  id="email"
                  placeholder="Email"
                  name="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  register={register}
                  error={errors.email?.message}
                />
              </div>

              <div className="mb-3">
                <InputField
                  type="text"
                  id="phone"
                  placeholder="Phone"
                  name="phone"
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                  register={register}
                  error={errors.phone?.message}
                />
              </div>

              <div className="mb-3">
                <PasswordInput
                  type="password"
                  id="password"
                  placeholder="Password"
                  name="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  register={register}
                  error={errors.password?.message}
                />
              </div>

              <div className="form-check mb-3">
                <input className="form-check-input" id="termsCheckbox" type="checkbox" checked />
                <label className="form-check-label text-muted fw-normal" htmlFor="termsCheckbox">
                  I agree with the terms & policy.
                </label>
              </div>

              <button className="btn btn-primary w-100" type="submit" disabled={isLoading}>
                {isLoading ? 'Processing...' : 'Sign Up'}
              </button>
            </form>
          </div>

          <div className="login-meta-data text-center">
            <p className="mt-3 mb-0">
              Already have an account? <Link className="stretched-link" href={routeHelper.login}>Login</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;