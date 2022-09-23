const domain = 'http://localhost:8000';

const fetchAll = async () => {
  const response = await fetch(`${domain}/categories`);
  const categories = await response.json();

  return categories;
};

const CategoryService = {
  fetchAll,
};

export default CategoryService;
