import * as React from 'react';
import {
  Typography,
  Button,
  Box,
  TextField,
} from '@mui/material';
// import PaintingService from '../../services/painting-service';

const EditCard = ({
  onSubmit,
  initValues,
}) => {
  const [title, setTitle] = React.useState([]);
  const [author, setAuthor] = React.useState(initValues?.author ?? '');
  const [price, setPrice] = React.useState(initValues?.price ?? '');
  const [img, setImg] = React.useState(initValues?.img ?? '');
  const [description, setDescription] = React.useState(initValues?.description ?? '');
  // const [categories, setCategories] = React.useState([]);
  // const [category, setCategory] = React.useState(initValues?.categoryId ?? '');

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      title,
      author,
      price: Number(price),
      img,
      description,
      categoryId: '6336d629714b7d1d42c28a6e',
    });
  };

  // React.useEffect(() => {
  //   (async () => {
  //     const fetchedCategories = await PaintingService.fetchCategories();
  //     setCategories(fetchedCategories);
  //   })();
  // }, []);

  //   React.useEffect(() => {
  //     (async () => {
  //       const fetchedSizes = await PaintingService.fetchSizes();
  //       setSizes(fetchedSizes);
  //     })();
  //   }, []);

  return (
    <Box
      onSubmit={handleSubmit}
      component="form"
      display="flex"
      flexDirection="column"
      alignItems="center"
      border="solid 1px black"
      height="100%"
      width="500px"
      borderRadius={1}
      px={5}
      py={6}
      sx={(theme) => ({ backgroundColor: theme.palette.common.white })}
    >
      <Typography variant="h4" pb={6}>Pakeisti duomenis</Typography>
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        gap={3}
      >
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
        {/* <TextField
          variant="filled"
          select
          label="Kategorija"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {categories.map(({ id, label: categoryLabel }) => (
            <MenuItem key={id} value={id}>{categoryLabel}</MenuItem>
          ))}
        </TextField> */}

      </Box>
      <Box mt={5}>
        <Button variant="contained" type="submit" sx={(theme) => ({ backgroundColor: theme.palette.main })}>Keisti</Button>
      </Box>
    </Box>
  );
};

export default EditCard;
