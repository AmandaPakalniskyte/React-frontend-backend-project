const domain = 'http://localhost:8000';

const fetchAll = async () => {
  const response = await fetch(`${domain}/sizes`);
  const sizes = await response.json();

  return sizes;
};

const SizeService = {
  fetchAll,
};

export default SizeService;
