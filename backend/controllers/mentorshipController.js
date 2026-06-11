const Mentorship = require('../models/Mentorship');

// @desc    Request mentorship
// @route   POST /api/mentorship/request
exports.requestMentorship = async (req, res) => {
    try {
        const { mentorId, goals, message } = req.body;
        
        const existingRequest = await Mentorship.findOne({
            mentor: mentorId,
            mentee: req.user._id,
            status: 'pending'
        });

        if (existingRequest) {
            return res.status(400).json({ message: 'You already have a pending request with this mentor' });
        }

        const request = await Mentorship.create({
            mentor: mentorId,
            mentee: req.user._id,
            goals,
            message
        });

        res.status(201).json(request);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user mentorships
// @route   GET /api/mentorship/my
exports.getMyMentorships = async (req, res) => {
    try {
        const mentorships = await Mentorship.find({
            $or: [{ mentor: req.user._id }, { mentee: req.user._id }]
        }).populate('mentor mentee', 'name email branch batchYear');
        
        res.json(mentorships);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update mentorship status
// @route   PUT /api/mentorship/:id
exports.updateMentorshipStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const mentorship = await Mentorship.findById(req.params.id);

        if (!mentorship) {
            return res.status(404).json({ message: 'Mentorship not found' });
        }

        // Only the mentor can approve/reject
        if (mentorship.mentor.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        mentorship.status = status;
        if (status === 'active') {
            mentorship.startDate = Date.now();
        }

        await mentorship.save();
        res.json(mentorship);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
