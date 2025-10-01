// Simple script to test CORS configuration
const axios = require('axios');

const BACKEND_URL = 'https://innovative-learning-backend.onrender.com';
const FRONTEND_URL = 'https://innovative-learning-platform.vercel.app';

async function testCORS() {
  console.log('Testing CORS configuration...\n');
  
  try {
    // Test the test endpoint
    console.log('1. Testing /api/test endpoint:');
    const response = await axios.get(`${BACKEND_URL}/api/test`, {
      headers: {
        'Origin': FRONTEND_URL
      }
    });
    
    console.log('Response:', response.data);
    console.log('CORS Headers:', {
      'access-control-allow-origin': response.headers['access-control-allow-origin'],
      'access-control-allow-credentials': response.headers['access-control-allow-credentials']
    });
    
    console.log('\n✅ Test endpoint successful!\n');
    
    // Test auth endpoint
    console.log('2. Testing /api/auth/check endpoint:');
    const authResponse = await axios.get(`${BACKEND_URL}/api/auth/check`, {
      headers: {
        'Origin': FRONTEND_URL
      }
    });
    
    console.log('Auth Response:', authResponse.data);
    console.log('✅ Auth endpoint successful!\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
      console.error('Data:', error.response.data);
    }
  }
}

testCORS();