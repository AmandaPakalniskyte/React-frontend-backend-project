import * as React from 'react';
import { Box, Grid, Modal } from '@mui/material';
import PaintingsDisplayCard from './paintings-display-card';
import PaintingService from '../../services/painting-service';
import EditCard from './edit-card';

// NERA ITRAUKAS CATEGORYID IR SIZEID//

const PaintingsDisplaySection = ({ handleUpdatePainting }) => {
  const [paintings, setPaintings] = React.useState([]);
  const [paintingBeingEdited, setPaintingBeingEdited] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  const closeModal = () => {
    setModalOpen(false);
    setPaintingBeingEdited(null);
  };

  const fetchAllPaintings = async () => {
    const fetchedPaintings = await PaintingService.fetchAll();
    setPaintings(fetchedPaintings);
  };

  // const createPainting = async (paintingProps) => {
  //   await PaintingService.create(paintingProps);
  //   await fetchAllPaintings();
  // };

  const editPainting = (id) => {
    const foundPainting = paintings.find((painting) => painting.id === id);
    setPaintingBeingEdited(foundPainting);
    setModalOpen(true);
  };

  const updatePainting = async (paintingProps) => {
    await PaintingService.update(paintingBeingEdited.id, paintingProps);
    await fetchAllPaintings();
    closeModal();
  };

  const removePainting = async (id) => {
    await PaintingService.remove(id);
    fetchAllPaintings();
  };

  React.useEffect(() => {
    fetchAllPaintings();
  }, []);

  return (
    <Box sx={{
      display: 'flex', gap: { xs: 4, xl: 0 }, py: 3, px: 3,
    }}
    >
      <Modal open={modalOpen} onClose={closeModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <EditCard
            onSubmit={updatePainting}
            initValues={paintingBeingEdited}
          />
        </Box>
      </Modal>
      <Grid container spacing={3}>
        {paintings.map(({
          id,
          title,
          author,
          description,
          img,
          price,
        }) => (
          <Grid key={id} item xs={12} sm={12} md={12} xl={4}>
            <PaintingsDisplayCard
              id={id}
              title={title}
              author={author}
              description={description}
              img={img}
              price={price}
              updatePainting={handleUpdatePainting}
              onEdit={() => editPainting(id)}
              onDelete={() => removePainting(id)}
            />

          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PaintingsDisplaySection;
