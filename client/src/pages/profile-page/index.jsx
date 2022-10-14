import {
  Box,
  TextField,
  Paper,
  Container,
  Typography,
  Button,
} from '@mui/material';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import { createAuthUpdateProfileThunkAction } from '../../store/auth/auth-actions';
import AuthService from '../../services/auth-service';
import { Image } from '../../components';
import useAuth from '../../hooks/useAuth';
import BackgroundContainer from '../../components/background-container';
import BackgroundBox from '../../components/background-box';

const convertFileToUrl = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
});

const validationSchema = yup.object({
  initEmail: yup.string(),
  email: yup.string()
    .required('Privaloma')
    .email('Netinkamas formatas')
    .test(
      'checkEmailUnique',
      'Toks paštas nėra galimas.',
      async (email, { parent: { initEmail } }) => {
        if (initEmail === email) return true;

        const emailAvailable = await AuthService.checkEmail(email);

        return emailAvailable;
      },
    ),
  firstName: yup.string()
    .required('Privaloma'),
  surname: yup.string()
    .required('Privaloma'),
});

const ProfilePage = () => {
  const { user, dispatch } = useAuth();
  const [imgString, setImgString] = React.useState(null);
  const [imgFile, setImgFile] = React.useState(null);
  const imgUploadRef = React.useRef(null);

  const handleImgUpload = async (e) => {
    const newImgFile = e.target.files[0];
    const newImgString = await convertFileToUrl(newImgFile);

    setImgFile(newImgFile);
    setImgString(newImgString);
  };

  const cancelImgUpload = () => {
    setImgString(null);
    setImgFile(null);
    imgUploadRef.current.value = null;
  };

  const {
    values, errors, isValid, dirty,
    handleChange, handleSubmit,
  } = useFormik({
    initialValues: {
      initEmail: user.email,
      email: user.email,
      firstName: user.firstName,
      surname: user.surname,
    },
    onSubmit: ({ email, firstName, surname }) => {
      const formData = new FormData();
      if (email !== user.email) formData.set('email', email);
      if (firstName !== user.firstName) formData.set('firstName', firstName);
      if (surname !== user.surname) formData.set('surname', surname);
      if (imgFile) formData.set('img', imgFile);

      dispatch(createAuthUpdateProfileThunkAction(formData));
    },
    validationSchema,
    enableReinitialize: true,
  });

  React.useEffect(() => {
    cancelImgUpload();
  }, [user]);

  if (user === null) return <Navigate to="/auth/login?redirect=/profile" />;

  return (
    <>
      <BackgroundContainer>
        <BackgroundBox>

          <Box sx={{ position: 'relative', height: 240, width: 240 }}>
            <Image
              sx={{ borderRadius: '50%' }}
              src={imgString ?? user.img ?? '/mister.jpg'}
            />
            <Box sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              transform: 'translate(0, 50%)',
            }}
            >
              {imgFile ? (
                <Button
                  variant="contained"
                  color="error"
                  onClick={cancelImgUpload}
                >
                  <CancelIcon />
                </Button>
              ) : (
                <Button variant="contained" onClick={() => imgUploadRef.current.click()}>
                  <CameraAltIcon />
                </Button>
              )}
            </Box>
            <input
              type="file"
              accept="image/png, image/jpeg"
              hidden
              ref={imgUploadRef}
              onChange={handleImgUpload}
            />
          </Box>
          <Paper
            component="form"
            elevation={3}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              width: 400,
              p: 3,
              mx: 'auto',
              my: 4,
            }}
            onSubmit={handleSubmit}
          >

            <Typography
              variant="h5"
              sx={{ textAlign: 'center', mb: 2 }}
            >
              Profilio informacija
            </Typography>
            <TextField
              fullWidth
              name="firstName"
              label="Vardas"
              variant="standard"
              value={values.firstName}
              onChange={handleChange}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName}
            />
            <TextField
              fullWidth
              name="surname"
              label="Pavardė"
              variant="standard"
              value={values.surname}
              onChange={handleChange}
              error={Boolean(errors.surname)}
              helperText={errors.surname}
            />
            <TextField
              fullWidth
              name="email"
              label="Email"
              variant="standard"
              value={values.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
            <Button
              variant="contained"
              type="submit"
              fullWidth
              size="large"
              disabled={(!isValid || !dirty) && imgString === null}
            >
              Atnaujinti
            </Button>

          </Paper>
        </BackgroundBox>
      </BackgroundContainer>
      <Container sx={{ mt: 4 }} />
    </>
  );
};

export default ProfilePage;
