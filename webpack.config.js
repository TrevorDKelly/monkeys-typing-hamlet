const path = require('path');
require('dotenv').config();

module.exports = {
  entry: './public/javascripts/main.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  mode: process.env.MODE,
};
