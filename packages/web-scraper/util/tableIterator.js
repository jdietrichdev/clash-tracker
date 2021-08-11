const cheerio = require('cheerio');

const infoTableIterator = (table, labels) => {
  const info = {};
  const rowData = [];
  const $ = cheerio.load(table);

  $('tr').each((index, row) => {
    if (index === 0) return;

    $('td', row).each((index, value) => {
      rowData.push($(value).text().replace('\n',''));
    });

    labels.forEach((label, index) => {
      info[label] = rowData[index];
    });
  });

  return info;
}

const statTableIterator = (table, labels) => {
  const tableData = [];
  let rowData = [];
  let rawData = {};
  const $ = cheerio.load(table);

  $('tr').each((index, row) => {
    if (index === 0) return;

    rowData = [];
    $('td', row).each((index, value) => {
      rowData.push($(value).text().replace('\n',''));
    });

    if (rowData[0] === undefined) return;
    
    rawData = {};
    labels.forEach((label, index) => {
      rawData[label] = rowData[index];
    })
    tableData.push(rawData);
  });

  return tableData;
};

exports.infoTableIterator = infoTableIterator;
exports.statTableIterator = statTableIterator;