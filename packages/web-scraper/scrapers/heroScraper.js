const axios = require('axios');
const cheerio = require('cheerio');
const { mongoose, HERO_MODEL } = require('../util/connection');
const { tableIterator } = require('../util/tableIterator');
const constants = require('../util/constants');
const heroes = require('../scrape-data/heroes.json');

const getHeroData = () => {
  heroes.forEach(async hero => {
    const heroData = {};
    const { data } = await axios.get(constants.BASE_PATH + hero.path);
    const $ = cheerio.load(data);

    console.log(hero.name);
    heroData.name = hero.name;

    const abilities = Object.keys(hero.abilities);

    $('table.wikitable > tbody').each((index, table) => {
      if (index === 0) heroData.info = tableIterator(table, hero.info);
      else if (index === 1) heroData.stats = tableIterator(table, hero.stats);
      else if (index < abilities.length + 2) heroData[abilities[index - 2]] = tableIterator(table, hero.abilities[abilities[index - 2]]);
    });
    
    try {
      HERO_MODEL.updateOne({name: heroData.name}, heroData, {upsert: true}, (err) => {
        if (err) console.log(err);
        else console.log(heroData.name + ' has been saved');
      });
    } catch (err) {
      console.log(err);
    }
  });
};

exports.getHeroData = getHeroData;