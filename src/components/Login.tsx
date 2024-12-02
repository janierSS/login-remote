import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { LoginFormValue } from '../types/types'

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValue>();

  const onSubmit: SubmitHandler<LoginFormValue> = (data) => {
    // Handle login logic here
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          {...register('username', { required: 'Username is required' })}
          type="text"
        />
        {errors.username && <p>{errors.username.message}</p>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          {...register('password', { required: 'Password is required' })}
          type="password"
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
