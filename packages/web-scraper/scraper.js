const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const { getHeroData } = require('./scrapers/heroScraper');

mongoose.connect('mongodb://localhost:27017/clash', {
  useNewUrlParser: true, 
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', err => console.error('connection error: ' + error));
db.once('open', () => {
  getHeroData();
});

db.close();