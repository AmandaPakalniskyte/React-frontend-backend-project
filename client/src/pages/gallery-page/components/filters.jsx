import * as React from 'react';
import {
  Box,
  Typography,
  Drawer,
  Divider,
  useMediaQuery,
  Button,
} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import { useSearchParams } from 'react-router-dom';
import RangeField from '../../../components/range-field';
import SelectField from '../../../components/select-field';
import CheckboxField from '../../../components/checkbox-field';
import SizeService from '../../../services/size-service';
import ColorService from '../../../services/color-service';
import CategoryService from '../../../services/category-service';

const MIN = 39;
const MAX = 95;

const Filters = ({ drawerWidth }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const isExtraLarge = useMediaQuery((theme) => theme.breakpoints.up('xl'));
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const [sizes, setSizes] = React.useState([]);
  const [colors, setColors] = React.useState([]);

  const [priceRange, setPriceRange] = React.useState([0, 200]);
  const [category, setCategory] = React.useState(null);
  const [selectedSizes, setSelectedSizes] = React.useState([]);
  const [selectedColors, setSelectedColors] = React.useState([]);

  const handlePriceRangeChange = (_, [min, max]) => {
    if (min === MIN) {
      searchParams.delete('price_gte');
    } else {
      searchParams.set('price_gte', min);
    }
    if (max === MAX) {
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

  const handleSizeChange = (_, newSizes) => {
    const ids = newSizes.map((size) => size.id);
    searchParams.delete('sizeId');
    ids.forEach((id) => searchParams.append('sizeId', id));

    setSearchParams(searchParams);
    setSelectedSizes(newSizes);
  };

  const handleColorChange = (_, newColors) => {
    const ids = newColors.map((color) => color.id);
    searchParams.delete('colorId');
    ids.forEach((id) => searchParams.append('colorId', id));

    setSearchParams(searchParams);
    setSelectedColors(newColors);
  };

  const deleteFilters = () => {
    searchParams.delete('price_gte');
    searchParams.delete('price_lte');
    searchParams.delete('categoryId');
    searchParams.delete('sizeId');
    searchParams.delete('colorId');

    setSearchParams(searchParams);
  };

  React.useEffect(() => {
    (async () => {
      const [fetchedCategories, fetchedSizes, fetchedColors] = await Promise.all([
        CategoryService.fetchAll(),
        SizeService.fetchAll(),
        ColorService.fetchAll(),
      ]);
      const priceMinInit = searchParams.get('price_gte') ?? MIN;
      const priceMaxInit = searchParams.get('price_lte') ?? MAX;
      setPriceRange([priceMinInit, priceMaxInit]);

      const categoryId = searchParams.get('categoryId');
      if (categoryId) {
        const categoryInit = fetchedCategories.find((cat) => cat.id === categoryId) ?? null;
        setCategory(categoryInit);
      }

      const selectedSizesInit = searchParams
        .getAll('sizeId')
        .map((id) => fetchedSizes.find((size) => size.id === id))
        .filter((size) => size !== undefined);
      setSelectedSizes(selectedSizesInit);

      const selectedColorsInit = searchParams
        .getAll('colorId')
        .map((id) => fetchedColors.find((color) => color.id === id))
        .filter((color) => color !== undefined);
      setSelectedColors(selectedColorsInit);

      setCategories(fetchedCategories);
      setSizes(fetchedSizes);
      setColors(fetchedColors);
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
            min={MIN}
            max={MAX}
          />

          <Divider sx={{ my: 2 }} />
          <SelectField
            options={categories}
            value={category}
            onChange={handleCategoryChange}
          />
          <Divider sx={{ my: 2 }} />
          <CheckboxField
            label="Spalvos"
            options={colors}
            value={selectedColors}
            onChange={handleColorChange}
          />
          <Divider sx={{ my: 2 }} />
          <CheckboxField
            label="Dydžiai"
            options={sizes}
            value={selectedSizes}
            onChange={handleSizeChange}
          />
        </Box>
        <Box width="100%" textAlign="center">
          <Button variant="contained" onClick={deleteFilters}>
            PAŠALINTI FILTRUS
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Filters;
