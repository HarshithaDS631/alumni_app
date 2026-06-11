const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    type: { 
        type: String, 
        enum: ['reunion', 'webinar', 'workshop', 'meetup'], 
        required: true 
    },
    image: { type: String },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    maxCapacity: { type: Number },
    price: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
