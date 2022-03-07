require('dotenv').config();

module.exports = {
  mode: process.env.MODE || 'dev',
  cloudFlarePages: process.env.CF_PAGES || false,
  api_key: process.env.API_KEY || 'Hello 👋, API_KEY is not set'  
};