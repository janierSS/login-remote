import React, {useEffect} from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginFormValue } from "../types/types";
import useLoginMutation from "myNotesHost/useLoginMutation";
import { useNavigate } from "react-router-dom";
import styles from './Login.module.scss'

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<LoginFormValue>();

  const navigate = useNavigate();

  const [login] = useLoginMutation();

  useEffect(() => {
    setFocus("username");
  }, [setFocus]);

  const onSubmit: SubmitHandler<LoginFormValue> = (creds) => {
    // Handle login logic here
    login(creds)
      .then((resp) => {
        console.log("login resp: ", resp);
        navigate(resp?.data?.authReceipt ? "/home" : "/error");
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  return (
    <div className={styles.container}>
      <h2>Welcome!</h2>
      <form className={styles['container__form']} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles['container__form__inputs']}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            {...register("username", { required: "Username is required" })}
            type="text"
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>

        <div className={styles['container__form__inputs']}>
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
    </div>
  );
};

export default Login;
