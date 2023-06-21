const express = require('express');
const RatingController = require('../controllers/RatingController');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

router.get('/', RatingController.getAllRatings);

router.get('/:id', RatingController.getRatingById);

router.post("/", isAuth, RatingController.createRating);

router.patch("/:id", isAuth, RatingController.updateRatingById);

router.delete("/:id", isAuth, RatingController.deleteRatingById);

module.exports = router;