const Event = require('../models/Event');

// @desc    Get all events
// @route   GET /api/events
exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('organizer', 'name').sort({ date: 1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create an event
// @route   POST /api/events
exports.createEvent = async (req, res) => {
    try {
        const { title, description, date, location, type, image, maxCapacity, price } = req.body;
        
        const event = await Event.create({
            title,
            description,
            date,
            location,
            type,
            image,
            maxCapacity,
            price,
            organizer: req.user._id
        });

        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Register for an event
// @route   POST /api/events/:id/register
exports.registerForEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (event.attendees.includes(req.user._id)) {
            return res.status(400).json({ message: 'You are already registered' });
        }

        if (event.maxCapacity && event.attendees.length >= event.maxCapacity) {
            return res.status(400).json({ message: 'Event is full' });
        }

        event.attendees.push(req.user._id);
        await event.save();
        
        res.json({ message: 'Registered successfully', event });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
