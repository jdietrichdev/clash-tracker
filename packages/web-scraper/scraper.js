const axios = require('axios');
const cheerio = require('cheerio');
const { getHeroData } = require('./scrapers/heroScraper');

getHeroData();