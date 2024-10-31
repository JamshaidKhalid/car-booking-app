const Vehicle = require('../models/vehicle.model');
const { validationResult } = require('express-validator');

exports.addVehicle = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { carModel, price, phone, city, maxPictures } = req.body;

    const userId = req.user.id;

    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ msg: 'No images uploaded' });
    }

    const images = files.map(file => ({
      fileName: file.originalname,
      url: file.location 
    }));

    const vehicle = new Vehicle({
      userId,
      carModel,
      price,
      phone,
      city,
      maxPictures,
      images
    });

    await vehicle.save();
    res.status(201).json({ message: 'Vehicle submitted successfully', vehicle });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getVehicles = async (req, res) => {
  try {
    const userId = req.user.id;

    const vehicles = await Vehicle.find({ userId });
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
