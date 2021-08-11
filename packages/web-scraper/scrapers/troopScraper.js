const axios = require('axios');
const cheerio = require('cheerio');
const { mongoose, TROOP_MODEL } = require('../util/connection');
const { infoTableIterator, statTableIterator } = require('../util/tableIterator');
const constants = require('../util/constants');
const troops = require('../scrape-data/troops.json');

const getTroopData = () => {
  troops.forEach(async troop => {
    const troopData = {};
    const { data } = await axios.get(constants.BASE_PATH + troop.path);
    let $ = cheerio.load(data);

    console.log(troop.name);
    troopData.name = troop.name;

    $('table.wikitable > tbody').each((index, table) => {
      if (index === 0) troopData.info = infoTableIterator(table, troop.info);
      else if (index === 1) troopData.trainingtime = infoTableIterator(table, troop.trainingtime);
      else if (index === 2) troopData.stats = statTableIterator(table, troop.stats);
      if (troop.supertroop) {
        if (index === 3) troopData.supertroop = infoTableIterator(table, troop.supertroop);
      }
    });

    if(troop.spawnedtroop) {
      const spawnedTroopData = {};
      const spawnedTroop = troop.spawnedtroop
      const { data } = await axios.get(constants.BASE_PATH + troop.path + '/' + spawnedTroop.path);
      $ = cheerio.load(data);

      $('table.wikitable > tbody').each((index, table) => {
        if (index === 0) spawnedTroopData.info = infoTableIterator(table, spawnedTroop.info);
        else if (index === 1) spawnedTroopData.stats = statTableIterator(table, spawnedTroop.stats);
      });

      troopData.spawnedTroop = spawnedTroopData;
    }
    
    try {
      TROOP_MODEL.updateOne({name: troopData.name}, troopData, {upsert: true}, (err) => {
        if (err) console.log(err);
        else console.log(troopData.name + ' has been saved');
      });
    } catch (err) {
      console.log(err);
    }
  });
};

exports.getTroopData = getTroopData;