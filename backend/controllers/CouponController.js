const Coupon = require('../models/Coupon');

const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch coupons' });
  }
};

const getCouponById = async (req, res) => {
  const { id } = req.params;
  try {
    const coupon = await Coupon.findById(id);
    if (!coupon) {
      return res.status(404).json({ error: 'Coupon not found' });
    }
    res.json(coupon);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch coupon' });
  }
};

const getCouponByCode = async (req, res) => {
  const { code } = req.params;
  try {
    const coupon = await Coupon.findOne({ code });
    if (!coupon) {
      return res.status(404).json({ error: 'Coupon not found' });
    }
    res.json(coupon);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch coupon' });
  }
};

const createCoupon = async (req, res) => {
  const { code, value, unit } = req.body;

  try {
    const coupon = new Coupon({ code, value, unit });
    await coupon.save();
    res.status(201).json(coupon);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create coupon' });
  }
};

const updateCouponById = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const coupon = await Coupon.findByIdAndUpdate(id, updateData, { new: true });
    if (!coupon) {
      return res.status(404).json({ error: 'Coupon not found' });
    }
    res.json(coupon);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update coupon' });
  }
};

const deleteCouponById = async (req, res) => {
  const { id } = req.params;
  try {
    const coupon = await Coupon.findByIdAndDelete(id);
    if (!coupon) {
      return res.status(404).json({ error: 'Coupon not found' });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete coupon' });
  }
};

module.exports = {
  getAllCoupons,
  getCouponById,
  getCouponByCode,
  createCoupon,
  updateCouponById,
  deleteCouponById
};
