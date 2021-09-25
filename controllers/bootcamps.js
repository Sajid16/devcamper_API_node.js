const { findByIdAndUpdate } = require('../models/Bootcamp');
const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const geocoder = require('../utils/geocoder');


// @desc  Get all bootcamps
// @route GET /api/v1/bootcamps
// @access public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.find();
    res.status(200).json({
      success: true,
      count: bootcamp.length,
      data: bootcamp,
      message: 'get all bootcamp data',
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// @desc  Get single bootcamp
// @route GET /api/v1/bootcamps/:id
// @access public
exports.getBootcampById = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      return next(new ErrorResponse(`Bootcamp ot found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({
      success: true,
      data: bootcamp,
      message: `bootcamp data for id ${req.params.id}`,
    });
  } catch (error) {
    next(new ErrorResponse(`Bootcamp ot found with id of ${req.params.id}`, 404));
    // res.status(400).json({ success: false });
  }
};

// @desc  create bootcamps
// @route POST /api/v1/bootcamps
// @access private
exports.createBootcamp = async (req, res, next) => {
  // console.log(req.body);

  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: true,
      message: 'new bootcamp created',
      data: bootcamp,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error,
    });
  }
};

// @desc  update bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access private
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true, //new data after update show korbe
      runValidators: true, // mongoose er validators check korbe kina
    });

    if (!bootcamp) {
      res.status(400).json({
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      data: bootcamp,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error,
    });
  }
};

// @desc  delete bootcamps
// @route DELETE /api/v1/bootcamps/:id
// @access private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    // console.log(bootcamp);
    if (!bootcamp) {
      res.status(400).json({
        success: false,
      });
    }
    res.status(200).json({
      success: true,
      message: `Record succesfully deleted for id ${req.params.id}`,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
};


// @desc  Get bootcamps within radius
// @route DELETE /api/v1/bootcamps/radius/:zipcode/:distance
// @access private
exports.getBootcampsInRadius = async (req, res, next) => {
  try {
    const {zipcode, distance} = req.params;

    // get lat/lng from geocoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    // calculate radius
    // divide distance by radius of earth
    // earth radius is 3963 mi / 6378 km
    const radius = distance/3963;

    const bootcamps =  await Bootcamp.find({
      location: {$geoWithin: { $centerSphere: [[lng, lat], radius] }}
    });
    return res.status(200).json({
      success: true,
      count: bootcamps.length,
      data: bootcamps
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error.'
    });
  }
};
