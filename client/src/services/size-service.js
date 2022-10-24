const domain = process.env.REACT_APP_SERVER_ADDRESS;

const fetchAll = async () => {
  const response = await fetch(`${domain}/api/sizes`);
  const sizes = await response.json();

  return sizes;
};

const SizeService = {
  fetchAll,
};

export default SizeService;
