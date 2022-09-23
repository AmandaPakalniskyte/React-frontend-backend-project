const domain = 'http://localhost:8000';

const fetchAll = async () => {
  const response = await fetch(`${domain}/colors`);
  const colors = await response.json();

  return colors;
};

const ColorService = {
  fetchAll,
};

export default ColorService;
