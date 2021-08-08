const axios = require('axios');
const cheerio = require('cheerio');
const { tableIterator } = require('./util/tableIterator');
const paths = require('./paths.json');

const base_path = paths.base_path;

const getHeroData = () => {
  paths.heroes.forEach(async hero_path => {
    const { data } = await axios.get(base_path + hero_path);
    const $ = cheerio.load(data);

    $('table.wikitable > tbody').each((index, table) => {
      if (index < 3) {
        console.log(tableIterator(table));
      }
    });
  });
};

getHeroData();