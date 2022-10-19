import {
  Box,
  TextField,
  Container,
  Typography,
  Button,
} from '@mui/material';
import React from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
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
import PaintingsDisplaySection from './paintings-display-section';
import PaintingService from '../../services/painting-service';
import CreateNewPaintingCard from './create-new-painting-card';

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

const UserProfilePage = () => {
  const [paintings, setPaintings] = React.useState([]);
  const [searchParams] = useSearchParams();

  const handleFetchPaintings = React.useCallback(async () => {
    const [fetchedPaintings] = await Promise.all([
      PaintingService.fetchAll(searchParams.toString()),
    ]);
    setPaintings(fetchedPaintings);
  }, [searchParams]);

  const handleUpdatePainting = async (props) => {
    await PaintingService.update(props);
    await handleFetchPaintings();
  };

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

  const userRole = localStorage.getItem('role');
  if (userRole === 'ADMIN') {
    return <Navigate to="/profile" />;
  }

  return (
    <>
      <BackgroundContainer>
        <BackgroundBox>
          <Box
            height="100%"
            width="100%"
            display="flex"
            sx={() => ({
              flexDirection: {
                xl: 'row',
                lg: 'column',
                md: 'column',
                sm: 'column',
                xs: 'column',
              },
              justifyContent: {
                xl: 'space-around',
                lg: 'center',
                md: 'center',
                sm: 'center',
                xs: 'center',
              },
              alignItems: {
                xl: 'stretch',
                lg: 'center',
                md: 'center',
                sm: 'center',
                xs: 'center',
              },
              gap: {
                xl: 0,
                lg: 5,
                md: 5,
                sm: 5,
                xs: 5,
              },
            })}
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="center"
              gap={5}
              width="320px"
              borderRadius={1}
              p={5}
              sx={() => ({
                boxShadow: {
                  lg: 5,
                  md: 5,
                  sm: 5,
                  xs: 0,
                },
              })}
            >
              <Box sx={{ position: 'relative', width: 150, height: 150 }}>
                <Image
                  sx={{ borderRadius: 1 }}
                  src={imgString ?? user.img ?? '/mister.jpg'}
                />
                <Box sx={{
                  width: 150,
                  display: 'flex',
                  justifyContent: 'center',
                }}
                >
                  {imgFile ? (
                    <Button
                      fullWidth
                      size="large"
                      variant="contained"
                      color="error"
                      onClick={cancelImgUpload}
                    >
                      <CancelIcon />
                    </Button>
                  ) : (
                    <Button variant="contained" fullWidth size="large" onClick={() => imgUploadRef.current.click()}>
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
              <Box
                component="form"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                  width: '100%',
                  pt: 3,
                  mx: 'auto',
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
                  label="El. paštas"
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

              </Box>
            </Box>
            <CreateNewPaintingCard />

          </Box>
          <Box display="flex" flexDirection="column" gap={3} width="300px" my={5} alignSelf="center">
            <Button
              variant="contained"
              type="submit"
              fullWidth
              size="large"
              onClick={() => { handleFetchPaintings(); }}
            >
              Rodyti visas prekes
            </Button>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              size="large"
              onClick={() => { handleFetchPaintings(); }}
            >
              Rodyti visus klientus
            </Button>
          </Box>
          <PaintingsDisplaySection
            paintings={paintings}
            handleUpdatePainting={handleUpdatePainting}
          />
        </BackgroundBox>
      </BackgroundContainer>
      <Container sx={{ mt: 4 }} />
    </>
  );
};

export default UserProfilePage;
