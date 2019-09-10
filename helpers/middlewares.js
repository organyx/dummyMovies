function mustBeInteger(req, res, next) {
  const id = req.params.id;

  if (!Number.isInteger(parseInt(id))) {
    res.status(400).json({ message: 'ID must be an integer' });
  } else {
    next();
  }
}

function checkFieldsPost(req, res, next) {
  const { title, genre } = req.body;

  if (title && genre) {
    next();
  } else {
    res.status(400).json({ message: 'Fields are filled incorrectly' });
  }
}

module.exports = {
  mustBeInteger,
  checkFieldsPost,
};
