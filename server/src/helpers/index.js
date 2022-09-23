
let currentId = 2;
const createId = () => ++currentId;

const removeEmptyProps = (obj) => Object.entries(obj).reduce((prevResult, [key, value]) => {
  if (value !== undefined) {
    prevResult[key] = value
  }

  return prevResult;
}, {})

module.exports = {
  createId,
  removeEmptyProps,
}