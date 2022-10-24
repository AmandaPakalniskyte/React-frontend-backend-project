const domain = process.env.REACT_APP_SERVER_ADDRESS;

const fetchAll = async () => {
  const response = await fetch(`${domain}/api/categories`);
  const categories = await response.json();

  return categories;
};

const CategoryService = {
  fetchAll,
};

export default CategoryService;
