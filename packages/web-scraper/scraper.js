const axios = require('axios');
const cheerio = require('cheerio');
const { tableIterator } = require('./util/tableIterator');
const paths = require('./paths.json');

const base_path = paths.base_path;

const getHeroData = () => {
  const heroData = {};
  paths.heroes.forEach(async hero => {
    const { data } = await axios.get(base_path + hero.path);
    const $ = cheerio.load(data);

    console.log(hero.name);
    heroData.name = hero.name;

    $('table.wikitable > tbody').each((index, infoTable) => {
      if (index === 0) heroData.info = tableIterator(infoTable, hero.info);
    });

    console.log(heroData);
  });
};

getHeroData();