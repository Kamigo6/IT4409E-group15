const express = require('express');
const CouponController = require('../controllers/CouponController');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

router.get('/', isAuth, CouponController.getAllCoupons);

router.get('/:id', isAuth, CouponController.getCouponById);

router.get('/code/:code', isAuth, CouponController.getCouponByCode);

router.post("/", isAuth, CouponController.createCoupon);

router.patch("/:id", isAuth, CouponController.updateCouponById);

router.delete("/:id", isAuth, CouponController.deleteCouponById);

module.exports = router;