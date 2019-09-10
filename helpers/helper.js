const getNewId = array => {
  if (array.length > 0) {
    return array[array.length - 1].id + 1;
  } else {
    return 1;
  }
};

const newDate = () => new Date().toString();

function mustBeInArray(array, id) {
  return new Promise((resolve, reject) => {
    const row = array.find(r => r.id == id);
    if (!row) {
      reject({
        message: 'Movie ID does not exist',
        status: 404,
      });
    }
    resolve(row);
  });
}

module.exports = {
  getNewId,
  newDate,
  mustBeInArray,
};
