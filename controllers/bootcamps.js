// @desc  Get all bootcamps
// @route GET /api/v1/bootcamps
// @access public
exports.getBootcamps = (req, res, next) => {
  res.send({ message: 'get all bootcamp routes' });
};

// @desc  Get single bootcamp
// @route GET /api/v1/bootcamps/:id
// @access public
exports.getBootcampById = (req, res, next) => {
  res.send({ message: `bootcamp routes ${req.params.id}` });
};

// @desc  create bootcamps
// @route POST /api/v1/bootcamps
// @access private
exports.createBootcamp = (req, res, next) => {
  res.send({ message: 'create bootcamp routes' });
};

// @desc  update bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access private
exports.updateBootcamp = (req, res, next) => {
  res.send({ message: `update bootcamp routes ${req.params.id}` });
};

// @desc  delete bootcamps
// @route DELETE /api/v1/bootcamps/:id
// @access private
exports.deleteBootcamp = (req, res, next) => {
  res.send({ message: `delete bootcamp routes ${req.params.id}` });
};
