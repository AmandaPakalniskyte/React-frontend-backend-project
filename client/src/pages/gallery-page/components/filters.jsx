import * as React from 'react';
import {
  Box,
  Typography,
  Drawer,
  useMediaQuery,
  Button,
  Divider,
} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import { useSearchParams } from 'react-router-dom';
import RangeField from '../../../components/range-field';
import SelectField from '../../../components/select-field';
// import CheckboxField from '../../../components/checkbox-field';
import PaintingService from '../../../services/painting-service';
import CategoryService from '../../../services/category-service';

const Filters = ({ drawerWidth }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const isExtraLarge = useMediaQuery((theme) => theme.breakpoints.up('xl'));
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [categories, setCategories] = React.useState([]);

  const [priceBounds, setPriceBounds] = React.useState([0, 0]);
  const [priceRange, setPriceRange] = React.useState([0, 0]);
  const [category, setCategory] = React.useState(null);
  const [priceLowerBound, priceHigherBound] = priceBounds;

  const handlePriceRangeChange = (_, [min, max]) => {
    if (min === priceLowerBound) {
      searchParams.delete('price_gte');
    } else {
      searchParams.set('price_gte', min);
    }
    if (max === priceHigherBound) {
      searchParams.delete('price_lte');
    } else {
      searchParams.set('price_lte', max);
    }

    setSearchParams(searchParams);
  };

  const handleCategoryChange = (_, newCategory) => {
    if (newCategory) {
      searchParams.set('categoryId', newCategory.id);
    } else {
      searchParams.delete('categoryId');
    }

    setSearchParams(searchParams);
    setCategory(newCategory);
  };

  const deleteFilters = () => {
    searchParams.delete('price_gte');
    searchParams.delete('price_lte');
    searchParams.delete('categoryId');

    setSearchParams(searchParams);
  };

  React.useEffect(() => {
    (async () => {
      const [fetchedCategories, fetchedPriceRange] = await Promise.all([
        CategoryService.fetchAll(),
        PaintingService.getPriceRange(),
      ]);
      const priceMinInit = searchParams.get('price_gte') ?? fetchedPriceRange[0];
      const priceMaxInit = searchParams.get('price_lte') ?? fetchedPriceRange[1];
      setPriceRange([priceMinInit, priceMaxInit]);

      const categoryId = searchParams.get('categoryId');
      if (categoryId) {
        const categoryInit = fetchedCategories.find((cat) => cat.id === categoryId) ?? null;
        setCategory(categoryInit);
      }

      setCategories(fetchedCategories);
      setPriceBounds(fetchedPriceRange);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Button
        size="large"
        color="primary"
        variant="contained"
        sx={{
          position: 'fixed',
          bottom: 15,
          right: 15,
          zIndex: 5000,
          height: 64,
          width: 64,
          borderRadius: '50%',
          display: { xxl: 'none' },
        }}
        onClick={() => setDrawerOpen(!drawerOpen)}
      >
        <TuneIcon sx={{ color: 'common.white', fontSize: '2rem' }} />
      </Button>
      <Drawer
        anchor="left"
        variant={isExtraLarge ? 'persistent' : 'temporary'}
        open={isExtraLarge || drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={(theme) => ({
          width: drawerWidth, mt: 10, p: 2, ...theme.mixins.toolbarOffset,
        })}
        >
          <Typography variant="h4" mb={2}>Filtrai</Typography>
          <RangeField
            label="Kaina"
            value={priceRange}
            onChange={(_, newPriceRange) => setPriceRange(newPriceRange)}
            onChangeCommitted={handlePriceRangeChange}
            min={priceLowerBound}
            max={priceHigherBound}
          />
          <Divider sx={{ my: 4 }} />
          <SelectField
            options={categories}
            value={category}
            onChange={handleCategoryChange}
          />
          {/* <CheckboxField
            label="Dyd??iai"
            options={sizes}
            value={selectedSizes}
            onChange={handleSizeChange}
          /> */}
        </Box>
        <Box width="100%" textAlign="center" mt={3}>
          <Button variant="contained" onClick={deleteFilters}>
            PA??ALINTI FILTRUS
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Filters;
