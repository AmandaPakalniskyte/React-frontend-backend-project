import * as React from 'react';
import {
  Box,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
  styled,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import moment from 'moment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import RegisterForm from '../../components/register-form-container/register-form';
import RegisterFormContainer from '../../components/register-form-container';

const StyledInsideButton = styled(Button)(() => ({

  ':hover': {
    transform: 'scale(1.2)',
  },

}));

const dateNow = moment(new Date());

const initialValues = {
  email: '',
  emailConfirmation: '',
  password: '',
  passwordConfirmation: '',
  firstName: '',
  surname: '',
  street: '',
  houseNumber: '',
  postCode: '',
  city: '',
  birthdate: dateNow,
};

const validationSchema = yup.object({
  email: yup.string()
    .required('Privaloma')
    .email('Neteisingas pašto formatas'),
  emailConfirmation: yup.string()
    .required('Privaloma')
    .oneOf([yup.ref('email')], 'El. paštas nesutampa'),
  password: yup.string()
    .required('Privaloma')
    .min(8, 'Mažiausiai 8 simboliai')
    .matches(/[a-z]/, 'Bent viena mažoji raidė')
    .matches(/[A-Z]/, 'Bent viena didžioji raidė')
    .matches(/\d/, 'Bent vienas skaičius')
    .matches(/\W/, 'Bent vienas specialus simbolis'),
  passwordConfirmation: yup.string()
    .required('Privaloma')
    .oneOf([yup.ref('password')], 'Slaptažodžiai nesutampa'),
  firstName: yup.string()
    .required('Privaloma')
    .matches(/^[a-ząčęėįšųūž ]+$/i, 'Tik raidės ir tarpai')
    .min(2, 'Mažiausiai 2 simboliai')
    .max(30, 'Daugiausiai 30 simbolių'),
  surname: yup.string()
    .required('Privaloma')
    .matches(/^[a-ząčęėįšųūž ]+$/i, 'Tik raidės ir tarpai')
    .min(2, 'Mažiausiai 2 simboliai')
    .max(30, 'Daugiausiai 30 simbolių'),
  street: yup.string()
    .required('Privaloma')
    .matches(/^[a-ząčęėįšųūž ]+$/i, 'Tik raidės ir tarpai')
    .min(4, 'Mažiausiai 4 simboliai')
    .max(30, 'Daugiausiai 30 simbolių'),
  houseNumber: yup.string()
    .required('Privaloma')
    .min(1, 'Mažiausiai 1 simbolis')
    .max(10, 'Daugiausiai 10 simbolių')
    .matches(/[\d]{1}/, 'Bent vienas skaičius'),
  city: yup.string()
    .required('Privaloma')
    .matches(/^[a-ząčęėįšųūž ]+$/i, 'Tik raidės ir tarpai')
    .min(4, 'Mažiausiai 4 simboliai')
    .max(30, 'Daugiausiai 30 simbolių'),
  postCode: yup.string()
    .required('Privaloma')
    .matches(/^\d+$/, 'Tik skaičiai')
    .min(4, 'Mažiausiai 4 simboliai')
    .max(8, 'Daugiausiai 8 simboliai'),
  birthdate: yup.date('Neteisingas datos formatas, pateikite formatu: YYYY-MM-DD')
    .max(dateNow, 'Negalite pasirinkti ateities datos'),
});

const RegisterPage = () => {
  const [consent, setConsent] = React.useState(true);

  const onSubmit = (values) => {
    console.log('įvestos reikšmės');
    console.table(values);
  };

  const {
    values, errors, touched, dirty, isValid,
    handleChange, handleBlur, setFieldValue, setFieldTouched,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <RegisterFormContainer>
      <RegisterForm>
        <Typography component="h1" variant="h4">Registracija</Typography>
        <TextField
          name="email"
          label="El. paštas"
          type="email"
          variant="filled"
          fullWidth
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
        />
        <TextField
          name="emailConfirmation"
          label="Pakartoti el.paštą"
          type="email"
          variant="filled"
          fullWidth
          value={values.emailConfirmation}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.emailConfirmation && Boolean(errors.emailConfirmation)}
          helperText={touched.emailConfirmation && errors.emailConfirmation}
        />
        <TextField
          name="password"
          label="Slaptažodis"
          type="password"
          variant="filled"
          fullWidth
          onChange={handleChange}
          value={values.password}
          onBlur={handleBlur}
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
        />
        <TextField
          name="passwordConfirmation"
          label="Pakartoti slaptažodį"
          type="password"
          variant="filled"
          fullWidth
          value={values.passwordConfirmation}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.passwordConfirmation && Boolean(errors.passwordConfirmation)}
          helperText={touched.passwordConfirmation && errors.passwordConfirmation}
        />
        <TextField
          name="firstName"
          label="Vardas"
          type="text"
          variant="filled"
          fullWidth
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.firstName && Boolean(errors.firstName)}
          helperText={touched.firstName && errors.firstName}
        />
        <TextField
          name="surname"
          label="Pavardė"
          type="text"
          variant="filled"
          fullWidth
          value={values.surname}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.surname && Boolean(errors.surname)}
          helperText={touched.surname && errors.surname}
        />
        <DesktopDatePicker
          inputFormat="yyyy-MM-DD"
          disableMaskedInput
          value={values.birthdate}
          disableFuture
          onChange={(momentInstance) => {
            // eslint-disable-next-line no-underscore-dangle
            if (momentInstance._isValid) {
              setFieldTouched('birthdate', true, false);
              setFieldValue('birthdate', momentInstance, true);
            }
          }}
          renderInput={(params) => (
            <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              name="birthdate"
              label="Gimimo data"
              variant="filled"
              fullWidth
              onBlur={handleBlur}
              error={touched.birthdate && Boolean(errors.birthdate)}
              helperText={touched.birthdate && errors.birthdate}
            />
          )}
        />
        <Box display="flex" width="100%" gap={3}>
          <TextField
            name="street"
            label="Gatvė"
            type="text"
            variant="filled"
            fullWidth
            value={values.street}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.street && Boolean(errors.street)}
            helperText={touched.street && errors.street}
          />
          <TextField
            name="houseNumber"
            label="Namo ir buto numeris (jei yra)"
            type="text"
            variant="filled"
            fullWidth
            value={values.houseNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.houseNumber && Boolean(errors.houseNumber)}
            helperText={touched.houseNumber && errors.houseNumber}
          />
        </Box>
        <Box display="flex" width="100%" gap={3}>
          <TextField
            name="city"
            label="Miestas"
            type="text"
            variant="filled"
            fullWidth
            value={values.city}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.city && Boolean(errors.city)}
            helperText={touched.city && errors.city}
          />
          <TextField
            name="postCode"
            label="Pašto kodas"
            type="text"
            variant="filled"
            fullWidth
            value={values.postCode}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.postCode && Boolean(errors.postCode)}
            helperText={touched.postCode && errors.postCode}
          />
        </Box>
        <Box sx={{ alignSelf: 'flex-start' }}>
          <FormControlLabel
            control={(
              <Checkbox
                checked={consent}
                onChange={(_, newConsent) => setConsent(newConsent)}
              />
              )}
            label="Sutinku su asmens duomenų tvarkymo politika"
          />
        </Box>
        <StyledInsideButton
          type="submit"
          disabled={!dirty || !isValid}
          variant="contained"
          size="large"
          sx={(theme) => ({
            background: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          })}
        >
          Registruotis
        </StyledInsideButton>
      </RegisterForm>
    </RegisterFormContainer>
  );
};

export default RegisterPage;
