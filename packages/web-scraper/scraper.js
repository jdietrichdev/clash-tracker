const axios = require('axios');
const cheerio = require('cheerio');
const { getHeroData } = require('./scrapers/heroScraper');
const { getTroopData } = require('./scrapers/troopScraper');

// getHeroData();
getTroopData();