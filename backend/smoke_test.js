const axios = require('axios');

async function smokeTest() {
    try {
        console.log('--- RVITM Alumni Platform Smoke Test ---');
        
        // 1. Check if API is running
        const homeRes = await axios.get('http://localhost:5000/');
        console.log('API Status:', homeRes.data);

        // 2. Test Registration
        const registerData = {
            name: 'Test Alumnus',
            email: `test_${Date.now()}@example.com`,
            password: 'password123',
            branch: 'CSE',
            batchYear: '2020'
        };
        const regRes = await axios.post('http://localhost:5000/api/auth/register', registerData);
        console.log('Registration Test: SUCCESS (Token received)');
        const token = regRes.data.token;

        // 3. Test Create Post
        const postData = { content: 'Testing the full working module from smoke test!' };
        const postRes = await axios.post('http://localhost:5000/api/posts', postData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Post Creation Test: SUCCESS (Post ID: ' + postRes.data._id + ')');

        // 4. Test Fetch Posts
        const fetchRes = await axios.get('http://localhost:5000/api/posts');
        console.log('Fetch Posts Test: SUCCESS (' + fetchRes.data.length + ' posts found)');

        console.log('--- All Systems Functional ---');
    } catch (error) {
        console.error('Smoke Test FAILED:', error.response?.data || error.message);
    }
}

smokeTest();
