import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginFormValue } from "../types/types";
import { useLoginMutation } from "myNotesHost/shared";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValue>();

  const navigate = useNavigate()

  const [login] = useLoginMutation();

  const onSubmit: SubmitHandler<LoginFormValue> = (creds) => {
    // Handle login logic here
    login(creds).then(resp => {
        console.log('login resp: ', resp )
        navigate(resp?.data?.authReceipt ? '/home' : '/error')
    }).catch(err => {
        console.log('Error: ', err)
        
    })
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          {...register("username", { required: "Username is required" })}
          type="text"
        />
        {errors.username && <p>{errors.username.message}</p>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          {...register("password", { required: "Password is required" })}
          type="password"
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
