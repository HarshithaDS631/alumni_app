const express = require('express');
const { getEvents, createEvent, registerForEvent } = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getEvents);
router.post('/', protect, createEvent);
router.post('/:id/register', protect, registerForEvent);

module.exports = router;
