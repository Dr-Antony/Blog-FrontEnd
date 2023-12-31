import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';

import { useForm } from 'react-hook-form';

import { useDispatch } from 'react-redux';

import { fetchRegistration } from '../../redux/slices/auth';

import { useSelector } from 'react-redux';

import { selectIsAuth } from '../../redux/slices/auth';

import { Navigate } from 'react-router-dom';



export const Registration = () => {

  const isAuth = useSelector(selectIsAuth)

  const dispatch = useDispatch();

  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      fullName: 'vasia pupazalupa',
      email: 'ant@mail.ru',
      password: '1234567'
    },
    mode: 'onChange'
  });





  const onSubmit = async (values) => {
    debugger
    const data = await dispatch(fetchRegistration(values));
    if (!data.payload) {
      alert('Введены некоректные данные!')
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
    console.log(data)
  }





  if (isAuth) {
    return <Navigate to={'/'} />
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: 'Укажите имя и фамилию' })}
          className={styles.field}
          label="Полное имя"
          fullWidth />
        <TextField
          type="email"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Укажите почту' })}
          className={styles.field}
          label="E-Mail"
          fullWidth />
        <TextField
          type="password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Укажите пароль' })}
          className={styles.field}
          label="Пароль"
          fullWidth />
        <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
