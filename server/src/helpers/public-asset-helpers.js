const fs = require('fs');
const path = require('path');

const removePublicAsset = (name) => {
  const filePath = path.join(process.env.ROOT_DIR, process.env.IMG_FOLDER, name);

  fs.unlink(filePath, (err) => {
    if (err) throw err;
    console.log(`File ${name} deleted!`);
  });
};

module.exports = {
  removePublicAsset,
};
