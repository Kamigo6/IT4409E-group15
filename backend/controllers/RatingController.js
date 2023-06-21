const Rating = require('../models/Rating');

const getAllRatings = async (req, res) => {
    try {
        const ratings = await Rating.find();
        res.json(ratings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch ratings' });
    }
};

const getRatingById = async (req, res) => {
    const { id } = req.params;
    try {
        const rating = await Rating.findById(id);
        if (!rating) {
            return res.status(404).json({ error: 'Rating not found' });
        }
        res.json(rating);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch rating' });
    }
};

const createRating = async (req, res) => {
    const { customerId, productId, content, star, likes, dislikes } = req.body;
    try {
        const rating = await Rating.create({
            customerId,
            productId,
            content,
            star,
            likes,
            dislikes
        });
        res.status(201).json(rating);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create rating' });
    }
};

const updateRatingById = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const rating = await Rating.findByIdAndUpdate(id, updateData, { new: true });
        if (!rating) {
            return res.status(404).json({ error: 'Rating not found' });
        }
        res.json(rating);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update rating' });
    }
};

const deleteRatingById = async (req, res) => {
    const { id } = req.params;
    try {
        const rating = await Rating.findByIdAndDelete(id);
        if (!rating) {
            return res.status(404).json({ error: 'Rating not found' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete rating' });
    }
};

module.exports = {
    getAllRatings,
    getRatingById,
    createRating,
    updateRatingById,
    deleteRatingById
};
