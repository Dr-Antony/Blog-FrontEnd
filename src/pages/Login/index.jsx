import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";

import { useForm } from "react-hook-form";


import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../redux/slices/auth";

import { useNavigate } from "react-router-dom";

export const Login = () => {

  const dispatch = useDispatch()

  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange'
  });

  const onSubmit = (values) => {
    debugger
    dispatch(fetchUserData(values))
    debugger
  }


  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} >
        <TextField
          className={styles.field}
          label="E-Mail"
          type="email"
          error={Boolean(errors.email ?.message )}
          helperText={errors.email ?.message }
          {...register('email',{required:'Укажите почту'})}
          fullWidth
        />
        <TextField {...register('password',{required:'Укажите пароль'})} helperText={errors.password ?.message } className={styles.field} label="Пароль" fullWidth error={Boolean(errors.password ?.message )} />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
