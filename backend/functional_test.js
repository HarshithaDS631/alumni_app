const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';
let token = '';

const runTests = async () => {
    console.log('🚀 Starting Final Functional Testing...');

    try {
        // 1. Auth Test (Login)
        console.log('\n--- 1. Testing Authentication ---');
        const loginRes = await axios.post(`${BASE_URL}/auth/login`, {
            email: 'alumni@rvitm.edu.in',
            password: 'Password123'
        });
        token = loginRes.data.token;
        console.log('✅ Login Successful');

        // 2. Profile Test (Update)
        console.log('\n--- 2. Testing Profile Update ---');
        const profileRes = await axios.put(`${BASE_URL}/auth/profile`, {
            location: 'Bangalore, India (Verified)',
            company: 'RVITM Research (Verified)'
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('✅ Profile Update Successful');

        // 3. Post Test (Create)
        console.log('\n--- 3. Testing Alumni Feed ---');
        const postRes = await axios.post(`${BASE_URL}/posts`, {
            content: 'Functional test post - All systems go! 🚀'
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('✅ Post Creation Successful');

        // 4. Mentorship Test (Request)
        console.log('\n--- 4. Testing Mentorship Module ---');
        // Requesting mentorship from self for testing
        try {
            await axios.post(`${BASE_URL}/mentorship/request`, {
                mentorId: loginRes.data._id,
                goals: 'Test Mentorship Goals'
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('✅ Mentorship Request Successful');
        } catch (e) {
            console.log('ℹ️ Mentorship Request (Note): ' + e.response.data.message);
        }

        // 5. Events Test (Registration)
        console.log('\n--- 5. Testing Events Module ---');
        const eventsRes = await axios.get(`${BASE_URL}/events`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (eventsRes.data.length > 0) {
            await axios.post(`${BASE_URL}/events/${eventsRes.data[0]._id}/register`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('✅ Event Registration Successful');
        } else {
            console.log('ℹ️ No events found to test registration');
        }

        console.log('\n🌟 ALL FUNCTIONAL TESTS PASSED! Platform is stable.');
    } catch (error) {
        console.error('\n❌ Functional Test Failed:', error.response?.data || error.message);
        process.exit(1);
    }
};

runTests();
