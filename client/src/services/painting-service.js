const domain = 'http://localhost:8000';
const collectionName = 'paintings';
const relationsParams = '_expand=category&_expand=size&_expand=color';

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

  return responseData;
};

const PaintingService = {
  fetchAll,
  update,
  fetchById,
  fetchByIdArr,
};

export default PaintingService;
