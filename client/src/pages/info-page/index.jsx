import * as React from 'react';
import { Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import { Image } from '../../components';
import BackToGalleryButtonDark from '../../components/back-to-galerry-button-dark';
import BackgroundBox from '../../components/background-box';
import BackgroundContainer from '../../components/background-container';
import 'react-slideshow-image/dist/styles.css';
import 'react-alice-carousel/lib/alice-carousel.css';

const domain = process.env.REACT_APP_SERVER_ADDRESS;

const handleDragStart = (e) => e.preventDefault();

const InfoPage = () => {
  const { id } = useParams();
  const [painting, setPainting] = React.useState(null);

  const fetchPainting = React.useCallback(async () => {
    try {
      const resp = await fetch(`${domain}/api/paintings/${id}`);
      const answer = await resp.json();
      console.log(answer);
      setPainting(answer);
    } catch (error) { console.error(error); }
  }, [id]);
  React.useEffect(() => {
    fetchPainting();
  }, [fetchPainting]);

  return (
    <BackgroundContainer>
      <BackgroundBox>
        <AliceCarousel
          mouseTracking
          autoPlay="true"
          infinite="true"
          autoPlayInterval="3000"
          disableDotsControls="true"
          items={painting?.imgWall.map((img) => (
            <Box key={img}>
              <Image
                src={img}
                onDragStart={handleDragStart}
                role="presentation"
                sx={{
                  position: 'relative',
                  top: 0,
                  left: 0,
                  objectFit: 'contain',
                  mb: 2,
                }}
              />
            </Box>
          ))}
        />
        <Typography variant="h6" component="div" fontWeight={600}>
          Autorius:
          {' '}
          {painting?.author}
        </Typography>
        <Typography variant="h6" component="div" fontWeight={600}>
          Pavadinimas:
          {' '}
          {painting?.title}
        </Typography>
        <Typography
          variant="h6"
          component="div"
        />
        <Typography
          variant="h6"
          component="div"
          sx={{
            mr: 2,
            my: 5,
            fontSize: {
              lg: 20,
              md: 15,
              sm: 15,
              xs: 13,
            },
          }}
        >
          {painting?.description}
        </Typography>
        <Box width="100%">
          <BackToGalleryButtonDark />
        </Box>

      </BackgroundBox>
    </BackgroundContainer>
  );
};

export default InfoPage;
