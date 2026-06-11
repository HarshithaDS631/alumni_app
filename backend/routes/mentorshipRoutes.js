const express = require('express');
const { requestMentorship, getMyMentorships, updateMentorshipStatus } = require('../controllers/mentorshipController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/request', protect, requestMentorship);
router.get('/my', protect, getMyMentorships);
router.put('/:id', protect, updateMentorshipStatus);

module.exports = router;
