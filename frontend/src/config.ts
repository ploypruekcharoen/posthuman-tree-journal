export const config = {
  apiUrl: process.env.NODE_ENV === 'production'
    ? 'https://posthuman-tree-journal-api.onrender.com' // Your Render URL
    : 'http://localhost:8000'
}; 