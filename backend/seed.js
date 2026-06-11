const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const dotenv = require('dotenv');

const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '.env') });

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing data (optional)
        await User.deleteMany({ email: 'alumni@rvitm.edu.in' });

        // 1. Create Sample User
        const user = await User.create({
            name: 'Dr. Satish Kumar',
            email: 'alumni@rvitm.edu.in',
            password: 'Password123',
            branch: 'Computer Science',
            batchYear: '1995',
            company: 'Google',
            designation: 'Staff Engineer',
            location: 'Mountain View, CA',
            bio: 'RVITM Class of 95. Tech enthusiast and lifelong learner. Passionate about AI and mentoring young engineers.',
            verified: true,
            isAdmin: true
        });
        console.log('Sample User Created: alumni@rvitm.edu.in / Password123');

        // 2. Create Sample Posts
        await Post.create([
            {
                user: user._id,
                content: 'Truly honored to be back on campus for the 8th Mile tech fest. The energy of the current students is incredible! #RVITM #AlumniMeet',
                likes: []
            },
            {
                user: user._id,
                content: 'Our Silicon Valley chapter is hosting a meetup next month. Any RVITMians in the Bay Area, please join us!',
                likes: []
            }
        ]);
        console.log('Sample Posts Created');

        console.log('Seeding Complete!');
        process.exit();
    } catch (error) {
        console.error('Seeding Failed:', error);
        process.exit(1);
    }
};

seedData();
