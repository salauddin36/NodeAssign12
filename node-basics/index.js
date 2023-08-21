import axios from 'axios';

try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    console.log('Response:', response.data);
} catch (error) {
    console.error('An error occurred:', error.message);
}