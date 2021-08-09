const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const { tableIterator } = require('../util/tableIterator');
const constants = require('../util/constants');
const heroes = require('../scrape-data/heroes.json');

const heroModel = mongoose.model('hero', new mongoose.Schema({}, {strict: false}));

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
      await heroModel.updateOne({name: heroData.name}, heroData, {upsert: true}, (err) => {
        if (err) throw err;
      });
    } catch (err) {
      console.log(err);
    }
  });
};

exports.getHeroData = getHeroData;