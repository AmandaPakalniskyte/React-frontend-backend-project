import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography, Button } from '@mui/material';

const CreateNewPaintingCard = ({
  onSubmit,
}) => {
  const [title, setTitle] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [img, setImg] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      title,
      author,
      price: Number(price),
      img,
      description,
      sizeId: '6336dc406d9260f66411db59',
      categoryId: '6336d629714b7d1d42c28a6e',
    });
  };

  const clearFields = () => {
    setTitle('');
    setAuthor('');
    setPrice('');
    setDescription('');
    setImg('');
  };

  return (
    <Box
      onSubmit={handleSubmit}
      component="form"
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="100%"
      width="320px"
      borderRadius={1}
      px={5}
      py={5}
      sx={(theme) => ({
        boxShadow: {
          lg: 5,
          md: 5,
          sm: 5,
          xs: 0,
        },
        backgroundColor: theme.palette.common.white,
      })}
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
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />
        <TextField
          variant="filled"
          width="100%"
          label="Nuotrauka"
          value={img}
          onChange={(event) => setImg(event.target.value)}
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
          onClick={handleSubmit}
        >
          Išsaugoti
        </Button>
      </Box>
    </Box>
  );
};

export default CreateNewPaintingCard;
