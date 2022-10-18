import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography, Button } from '@mui/material';

const CreateNewPaintingCard = ({
  onSubmit,
}) => {
  const [title, setTitle] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [img, setImg] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      title,
      price: Number(price),
      img,
      description,
    });
  };

  // React.useEffect(() => {
  //   setTitle('');
  // }, []);

  // const clearFields = () => {
  //   setDescription('');
  // };

  const clearFields = () => {
    setTitle('');
    setPrice('');
    setDescription('');
    setImg('');
  };

  return (
    <Box
      onSubmit={handleSubmit}
      component="form"
      boxShadow={5}
      display="flex"
      flexDirection="column"
      alignItems="center"
      // border="solid 1px black"
      height="100%"
      width="400px"
      borderRadius={1}
      px={5}
      py={5}
      sx={(theme) => ({ backgroundColor: theme.palette.common.white })}
    >
      <Typography variant="h5" pb={3}>Kurti naujas prekes</Typography>
      <Box display="flex" flexDirection="column" gap={2} width="100%">
        <TextField
          variant="filled"
          width="100%"
          label="Pavadinimas"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <TextField
          variant="filled"
          width="100%"
          label="Autorius"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <TextField
          variant="filled"
          width="100%"
          label="Dydis"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <TextField
          variant="filled"
          type="number"
          label="Kaina"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
        <TextField
          variant="filled"
          label="Aprašymas"
          multiline
          rows={5}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <TextField
          variant="filled"
          label="Nuotrauka"
          value={img}
          onChange={(event) => setImg(event.target.value)}
        />
      </Box>
      <Box my={3} width="100%" display="flex" justifyContent="space-between">
        <Button
          variant="contained"
          sx={(theme) => ({ backgroundColor: theme.palette.main })}
          onClick={() => clearFields()}
        >
          Išvalyti
        </Button>
        <Button
          variant="contained"
          type="submit"
          sx={(theme) => ({ backgroundColor: theme.palette.main })}
        >
          Išsaugoti
        </Button>
      </Box>
    </Box>
  );
};

export default CreateNewPaintingCard;
