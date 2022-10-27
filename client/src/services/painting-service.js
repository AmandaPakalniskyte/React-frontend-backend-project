const domain = process.env.REACT_APP_SERVER_ADDRESS;
const collectionName = 'api/paintings';
const relationsParams = 'joinBy=categoryId';
// const relationsParams = 'joinBy=categoryId&_joinBySizeId=sizeId';

const fetchAll = async (paramsString = null) => {
  const urlParamsString = paramsString ? `&${paramsString}` : '';

  const response = await fetch(`${domain}/${collectionName}?${relationsParams}${urlParamsString}`);
  const paintings = await response.json();

  return paintings;
};

const fetchById = async (id) => {
  const response = await fetch(`${domain}/${collectionName}/${id}?${relationsParams}`);
  const item = await response.json();

  return item;
};

const fetchByIdArr = async (idArr) => {
  const idsParamsString = idArr.map((id) => `id=${id}`).join('&');
  const items = await fetchAll(idsParamsString);

  return items;
};

const create = async (paintingProps) => {
  const response = await fetch(`${domain}/${collectionName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paintingProps),
  });

  const responseData = await response.json();

  return responseData;
};

const update = async ({ id, ...updateProps }) => {
  const response = await fetch(`${domain}/${collectionName}/${id}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateProps),
  });
  const responseData = await response.json();
  console.log(responseData);

  return responseData;
};

const remove = async (id) => {
  await fetch(`${domain}/${collectionName}/${id}`, {
    method: 'DELETE',
  });

  return true;
};

const getPriceRange = async () => {
  const response = await fetch(`${domain}/${collectionName}/price-range`);
  const priceRange = await response.json();

  return priceRange;
};

// const fetchCategories = async () => {
//   const response = await fetch(`${domain}/${collectionName}/categories`);
//   const categories = await response.json();

//   return categories;
// };

const PaintingService = {
  fetchAll,
  create,
  update,
  remove,
  fetchById,
  fetchByIdArr,
  getPriceRange,
  // fetchCategories,
};

export default PaintingService;
