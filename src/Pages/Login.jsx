import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useTranslation } from 'useTranslation';
import { login } from '../redux/slices/auth/operations';
import css from './styles.module.scss';

const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export const Login = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const t = useTranslation();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email(t.format)
      .matches(emailPattern, t.emailPatern)
      .required(t.required),
    password: yup.string().required(t.required),
  });

  const initialValue = {
    email: '',
    password: '',
  };

  const submitHandler = async (values, { resetForm }) => {
    const { email, password } = values;

    dispatch(login({ email, password }));

    resetForm();

    window.scrollTo(0, 0);
  };

  return (
    <div className={css.container}>
      <Formik
        initialValues={initialValue}
        validationSchema={schema}
        onSubmit={submitHandler}
      >
        {({ errors, touched }) => (
          <Form className={css.wrapper} autoComplete="off">
            <h2 className={css.header}> {t.loginTitle}</h2>
            <Link className={css.link} to={'/register'}>
              {t.unregistered}
            </Link>
            <label className={css.name}>
              {t.email}
              <Field
                className="field"
                type="text"
                name="email"
                autoComplete="off"
              />
              {errors.email && touched.email ? (
                <span className={css.error}>{errors.email}</span>
              ) : null}
            </label>
            <label className={css.name}>
              {t.password}
              <Field
                className="field"
                type={isPasswordShown ? 'text' : 'password'}
                name="password"
                placeholder={t.passwordPlaceholder}
                autoComplete="off"
              />
              <button
                type="button"
                className={css.pass}
                onClick={() => setIsPasswordShown(state => !state)}
              >
                {isPasswordShown ? <AiFillEye /> : <AiFillEyeInvisible />}
              </button>
            </label>
            <Link className={css.link} to={'/users/reset'}>
              {t.forget}
            </Link>
            <button type="submit" className="btn">
              {t.enter}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
