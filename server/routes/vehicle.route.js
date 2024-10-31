const express = require('express');
const { body } = require('express-validator');
const { addVehicle, getVehicles } = require('../controllers/vehicle.controller');
const fetchUser = require('../middleware/fetchUser');
const upload = require('../middleware/multer-s3');

const router = express.Router();

router.post(
  '/',
  fetchUser,
  upload.array('images', 10),
  [
    body('carModel').isLength({ min: 3 }).withMessage('Car model must be at least 3 characters long'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('phone').isLength({ min: 11, max: 11 }).withMessage('Phone must be exactly 11 digits'),
    body('city').not().isEmpty().withMessage('City is required'),
    body('maxPictures').isInt({ min: 1, max: 10 }).withMessage('Max pictures must be between 1 and 10')
  ],
  addVehicle
);

router.get('/', fetchUser, getVehicles);

module.exports = router;
